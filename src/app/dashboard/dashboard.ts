import { Component, Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-dashboard',
  imports: [Header, Sidebar, Footer, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
  export class Dashboard {
  constructor(private renderer: Renderer2) {
    this.renderer.addClass(document.body, "dashboard-page");

    this.renderer.removeClass(document.body, "sidebar-mini");
    this.renderer.removeClass(document.body, "layout-fixed");

    this.renderer.setAttribute(document.body, "style", "mini-height: 464px;");
  }


}
