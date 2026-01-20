import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';
import { Footer } from '../footer/footer';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ecommers',
  imports: [Header, Sidebar, Footer, RouterModule],
  templateUrl: './ecommers.html',
  styleUrl: './ecommers.css',
})
export class Ecommers {

}
