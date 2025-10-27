import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';
import { Footer } from '../footer/footer';
import { AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard3',
  imports: [Header, Sidebar, Footer, RouterModule],
  templateUrl: './dashboard3.html',
  styleUrl: './dashboard3.css'
})
export class Dashboard3 implements AfterViewInit {

  ngAfterViewInit(): void {
    this.loadVisitorsChart();
    this.loadSalesChart();
  }

  loadVisitorsChart(): void {
    const ctx = document.getElementById('visitors-chart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'This Week',
            data: [100, 120, 150, 170, 180, 190, 200],
            borderColor: '#007bff',
            backgroundColor: 'rgba(0, 123, 255, 0.3)',
            fill: true,
            tension: 0.4
          },
          {
            label: 'Last Week',
            data: [80, 100, 130, 140, 150, 160, 170],
            borderColor: '#ced4da',
            backgroundColor: 'rgba(206, 212, 218, 0.3)',
            fill: true,
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false } },
          y: { grid: { color: '#f0f0f0' } }
        }
      }
    });
  }

  loadSalesChart(): void {
    const ctx = document.getElementById('sales-chart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
          {
            label: 'This Year',
            data: [1500, 1800, 2200, 1900, 2400, 2600, 3000],
            backgroundColor: '#007bff'
          },
          {
            label: 'Last Year',
            data: [1300, 1600, 2000, 1800, 2100, 2300, 2500],
            backgroundColor: '#ced4da'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false } },
          y: { grid: { color: '#f0f0f0' } }
        }
      }
    });
  }
}