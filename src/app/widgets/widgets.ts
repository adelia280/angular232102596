import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-widgets',
  imports: [Header, Sidebar, Footer, RouterModule],
  templateUrl: './widgets.html',
  styleUrl: './widgets.css',
})
export class Widgets {

}
