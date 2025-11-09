import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';
import { Footer } from '../footer/footer';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-flot',
  imports: [Header, Sidebar, Footer, RouterModule],
  templateUrl: './flot.html',
  styleUrl: './flot.css',
})
export class Flot {

}
