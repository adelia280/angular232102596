import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';
import { Footer } from '../footer/footer';
import { AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';
declare var $: any;

@Component({
  selector: 'app-dashboard2',
  imports: [Header, Sidebar, Footer, RouterModule],
  templateUrl: './dashboard2.html',
  styleUrl: './dashboard2.css'
})
export class Dashboard2 implements AfterViewInit {

 ngAfterViewInit(): void {
    this.loadExternalScripts().then(() => {
      this.loadSalesChart();
      this.loadWorldMap();
      this.loadBrowserChart();
    });
  }

  // === [0] Load script eksternal tanpa angular.json ===
  private loadExternalScripts(): Promise<void> {
    return new Promise<void>((resolve) => {
      const jqueryScript = 'https://code.jquery.com/jquery-3.6.0.min.js';
      const vmapScript = 'https://cdn.jsdelivr.net/npm/jqvmap@1.5.1/dist/jquery.vmap.min.js';
      const vmapWorld = 'https://cdn.jsdelivr.net/npm/jqvmap@1.5.1/dist/maps/jquery.vmap.world.js';
      const vmapCss = 'https://cdn.jsdelivr.net/npm/jqvmap@1.5.1/dist/jqvmap.min.css';

      const addScript = (src: string) => {
        return new Promise<void>((res) => {
          const s = document.createElement('script');
          s.src = src;
          s.onload = () => res();
          document.body.appendChild(s);
        });
      };

      const addStyle = (href: string) => {
        if (!document.querySelector(`link[href="${href}"]`)) {
          const l = document.createElement('link');
          l.rel = 'stylesheet';
          l.href = href;
          document.head.appendChild(l);
        }
      };

      addStyle(vmapCss);

      // Load secara berurutan
      addScript(jqueryScript)
        .then(() => addScript(vmapScript))
        .then(() => addScript(vmapWorld))
        .then(() => setTimeout(() => resolve(), 300));
    });
  }

  // === [1] Grafik Penjualan Bulanan ===
  private loadSalesChart() {
    const ctx = document.getElementById('salesChart') as HTMLCanvasElement;
    if (!ctx) return;

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Digital Goods',
            data: [28, 48, 40, 19, 86, 27, 90],
            borderColor: '#007bff',
            backgroundColor: 'rgba(0, 123, 255, 0.3)',
            fill: true,
            tension: 0.4
          },
          {
            label: 'Electronics',
            data: [65, 59, 80, 81, 56, 55, 40],
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

  // === [2] Peta Dunia ===
  private loadWorldMap() {
    const mapElem = $('#world-map-markers');
    if (!mapElem.length) return;

    mapElem.vectorMap({
      map: 'world_en',
      backgroundColor: 'transparent',
      regionStyle: {
        initial: { fill: '#e4e4e4' }
      },
      markerStyle: {
        initial: {
          fill: '#007bff',
          stroke: '#383f47'
        }
      },
      markers: [
        { latLng: [41.9, 12.45], name: 'Vatican City' },
        { latLng: [48.8566, 2.3522], name: 'Paris' },
        { latLng: [35.6895, 139.6917], name: 'Tokyo' },
        { latLng: [-6.2, 106.816666], name: 'Jakarta' },
        { latLng: [51.5074, -0.1278], name: 'London' }
      ]
    });
  }

  // === [3] Diagram Lingkaran Browser Usage ===
 private loadBrowserChart() {
  // Coba 10x (setiap 300ms) untuk memastikan elemen canvas sudah ada
  let tries = 0;
  const interval = setInterval(() => {
    const ctx = document.getElementById('browserUsage') as HTMLCanvasElement;
    if (ctx) {
      clearInterval(interval);
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Chrome', 'IE', 'Firefox', 'Safari', 'Opera', 'Navigator'],
          datasets: [{
            data: [700, 500, 400, 600, 300, 100],
            backgroundColor: [
              '#f56954',
              '#00a65a',
              '#f39c12',
              '#00c0ef',
              '#3c8dbc',
              '#d2d6de'
            ],
            hoverOffset: 8
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '60%', // agar bentuknya persis seperti di AdminLTE
          plugins: {
            legend: {
              position: 'right',
              labels: { boxWidth: 15 }
            }
          }
        }
      });
    }

    if (++tries > 10) clearInterval(interval); // berhenti setelah 3 detik
  }, 300);
}
}