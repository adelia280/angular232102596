import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AfterViewInit } from '@angular/core';
import { Router, NavigationEnd  } from '@angular/router';

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

    // Klik tombol buka/tutup sidebar
    if (toggleButton) {
      toggleButton.addEventListener('click', (event) => {
        event.preventDefault();
        body.classList.toggle('sidebar-open');
      });
    }

    // Tutup otomatis jika user klik menu di mobile
    sidebarLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 991 && body.classList.contains('sidebar-open')) {
          body.classList.remove('sidebar-open');
        }
      });
    });

    // Tutup otomatis setiap kali ganti halaman (navigasi router)
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && window.innerWidth <= 991) {
        body.classList.remove('sidebar-open');
      }
    });
  }
}