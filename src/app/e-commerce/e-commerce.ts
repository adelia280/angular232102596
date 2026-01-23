import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';
import { Footer } from '../footer/footer';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-e-commerce',
  imports: [Header, Sidebar, Footer, RouterModule],
  templateUrl: './e-commerce.html',
  styleUrl: './e-commerce.css',
})
export class ECommerce {

}
