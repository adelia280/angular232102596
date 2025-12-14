import { Component, signal, AfterViewInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  protected readonly title = signal('angular232102596');

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    const body = document.body;
    const toggleButton = document.querySelector('[data-widget="pushmenu"]');
    const sidebarLinks = document.querySelectorAll('.main-sidebar a.nav-link');

    // Toggle sidebar (AdminLTE mobile-safe)
    if (toggleButton) {
      toggleButton.addEventListener('click', (event) => {
        event.preventDefault();

        if (body.classList.contains('sidebar-open')) {
          body.classList.remove('sidebar-open');
          body.classList.add('sidebar-collapse');
        } else {
          body.classList.add('sidebar-open');
          body.classList.remove('sidebar-collapse');
        }
      });
    }

    // Tutup sidebar setelah klik menu (mobile)
    sidebarLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 991) {
          body.classList.remove('sidebar-open');
          body.classList.add('sidebar-collapse');
        }
      });
    });

    // Tutup sidebar setiap ganti halaman (mobile)
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && window.innerWidth <= 991) {
        body.classList.remove('sidebar-open');
        body.classList.add('sidebar-collapse');
      }
    });
  }
}
