import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';
import { Footer } from '../footer/footer';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-chart-js',
  imports: [Header, Sidebar, Footer, RouterModule],
  templateUrl: './chart-js.html',
  styleUrl: './chart-js.css',
})
export class ChartJS {

}
