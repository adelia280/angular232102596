import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar implements OnInit {

  @Input() moduleName: string = '';
  username: string = '';

  constructor(private cookieService: CookieService) {}

  ngOnInit(): void {
    this.username = this.cookieService.get('userId');

    const theme = localStorage.getItem('adminlte-theme');
    this.applyTheme(theme === 'dark');
  }

  toggleTheme(): void {
    const isDark = document.body.classList.contains('dark-mode');
    this.applyTheme(!isDark);
    localStorage.setItem('adminlte-theme', isDark ? 'light' : 'dark');
  }

  // =================================================
  // 🔥 THEME HANDLER (RAPI & AMAN)
  // =================================================
  private applyTheme(dark: boolean): void {
    const body = document.body;
    const navbar = document.querySelector('.main-header') as HTMLElement;
    const sidebar = document.querySelector('.main-sidebar') as HTMLElement;
    const contentWrapper = document.querySelector('.content-wrapper') as HTMLElement;

    const cards = document.querySelectorAll('.card');
    const tables = document.querySelectorAll('.table');

    // 🔥 SEMUA TEKS (HUMIDITY, WIND, API, DLL)
    const textElements = document.querySelectorAll(
      'p, span, small, label, h1, h2, h3, h4, h5, h6, td, th'
    );

    if (dark) {
      // ================= DARK MODE =================
      body.classList.add('dark-mode');

      // Navbar
      navbar?.classList.remove('navbar-white', 'navbar-light');
      navbar?.classList.add('navbar-dark');

      // Sidebar
      sidebar?.classList.remove('sidebar-light-primary');
      sidebar?.classList.add('sidebar-dark-primary');

      // Content
      contentWrapper?.classList.add('bg-dark');

      cards.forEach(c => c.classList.add('bg-dark'));
      tables.forEach(t => t.classList.add('table-dark'));

      // 🔥 PAKSA TEKS TERLIHAT
      textElements.forEach(el => {
        el.classList.remove(
          'text-dark',
          'text-body',
          'text-secondary',
          'text-muted'
        );
        el.classList.add('text-light');
      });

    } else {
      // ================= LIGHT MODE =================
      body.classList.remove('dark-mode');

      // Navbar
      navbar?.classList.remove('navbar-dark');
      navbar?.classList.add('navbar-white', 'navbar-light');

      // Sidebar
      sidebar?.classList.remove('sidebar-dark-primary');
      sidebar?.classList.add('sidebar-light-primary');

      // Content
      contentWrapper?.classList.remove('bg-dark');

      cards.forEach(c => c.classList.remove('bg-dark'));
      tables.forEach(t => t.classList.remove('table-dark'));

      // 🔥 BALIK NORMAL
      textElements.forEach(el => {
        el.classList.remove('text-light');
      });
    }
  }
}
