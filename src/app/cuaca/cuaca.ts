import {
  AfterViewInit,
  Component,
  Renderer2,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';
import { Footer } from '../footer/footer';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

declare const $: any;
declare const moment: any;
declare const L: any;

@Component({
  selector: 'app-cuaca',
  standalone: true,
  imports: [
    CommonModule,
    DecimalPipe,
    HttpClientModule,
    RouterModule,
    Header,
    Sidebar,
    Footer
  ],
  templateUrl: './cuaca.html',
  styleUrls: ['./cuaca.css'],
})
export class Cuaca implements AfterViewInit {

  table1: any;
  map: any;

  cityData: any = null;
  currentWeather: any = null;
  todayDate = '';

  constructor(
    private renderer: Renderer2,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {
    this.renderer.removeClass(document.body, 'sidebar-open');
    this.renderer.addClass(document.body, 'sidebar-closed');
  }

  ngAfterViewInit(): void {
    this.initTable();
  }

  // =========================
  // 🔥 DATA TABLE
  // =========================
  initTable(): void {
    this.table1 = $('#table1').DataTable({
      destroy: true,
      responsive: true,
      pageLength: 10,
      lengthChange: true,
      searching: true,
      dom:
        '<"row mb-2"' +
          '<"col-sm-6"l>' +
          '<"col-sm-6 d-flex justify-content-end"f>' +
        '>' +
        'rt' +
        '<"row mt-2"' +
          '<"col-sm-5"i>' +
          '<"col-sm-7 d-flex justify-content-end"p>' +
        '>',
      language: {
        lengthMenu: 'Show _MENU_ entries',
        info: 'Showing _START_ to _END_ of _TOTAL_ entries',
        infoEmpty: 'Showing 0 to 0 of 0 entries',
        search: 'Search:',
        paginate: {
          previous: 'Previous',
          next: 'Next'
        }
      },
      columnDefs: [
        {
          targets: 0,
          render: (data: string) => {
            const waktu = moment(data + ' UTC');
            return `
              ${waktu.local().format('YYYY-MM-DD')}<br>
              ${waktu.local().format('HH:mm')} WIB
            `;
          }
        },
        {
          targets: 1,
          orderable: false,
          render: (data: string) =>
            `<img src="${data}" width="45">`
        },
        {
          targets: 2,
          render: (data: string) => {
            const [cuaca, desc] = data.split('||');
            return `<strong>${cuaca}</strong><br>${desc}`;
          }
        }
      ]
    });
  }

  handleEnter(event: Event): void {
    const input = event.target as HTMLInputElement;
    const city = input.value.trim();
    if (!city) return;
    this.getData(city);
  }

  // =========================
  // 🔥 AMBIL DATA API
  // =========================
  getData(city: string): void {
    this.http.get<any>(
      `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
        city
      )}&appid=87d3e1cd7b3cad09477aa21ce1c4dfba`
    ).subscribe({
      next: (data) => {
        this.cityData = data.city;
        this.currentWeather = data.list[0];

        this.todayDate = moment(this.currentWeather.dt_txt + ' UTC')
          .local()
          .format('MMM DD, HH:mm');

        // 🔥 PAKSA ANGULAR RENDER DULU
        this.cdr.detectChanges();

        // 🔥 SINKRONKAN DARK/LIGHT SETELAH DATA MUNCUL
        setTimeout(() => this.syncThemeText(), 0);

        this.fillTable(data.list);

        setTimeout(() => {
          this.renderMap(
            this.cityData.coord.lat,
            this.cityData.coord.lon
          );
        }, 300);
      },
      error: () => alert('Kota tidak ditemukan')
    });
  }

  // =========================
  // 🔥 SINKRON TEKS DARK/LIGHT
  // =========================
  private syncThemeText(): void {
    const isDark = document.body.classList.contains('dark-mode');

    const textElements = document.querySelectorAll(
      '.content-wrapper p, .content-wrapper span, .content-wrapper small, ' +
      '.content-wrapper label, ' +
      '.content-wrapper h1, .content-wrapper h2, .content-wrapper h3, ' +
      '.content-wrapper h4, .content-wrapper h5, .content-wrapper h6'
    );

    textElements.forEach(el => {
      if (isDark) {
        el.classList.remove(
          'text-dark',
          'text-muted',
          'text-secondary',
          'text-body'
        );
        el.classList.add('text-light');
      } else {
        el.classList.remove('text-light');
      }
    });
  }

  // =========================
  // 🔥 TABLE DATA
  // =========================
  fillTable(list: any[]): void {
    this.table1.clear();
    list.forEach(item => {
      const w = item.weather[0];
      this.table1.row.add([
        item.dt_txt,
        this.getWeatherIconUrl(w.icon),
        `${w.main}||${w.description}`,
        `${this.kelvinToCelcius(item.main.temp_min)}°C - ${this.kelvinToCelcius(item.main.temp_max)}°C`
      ]);
    });
    this.table1.draw(false);
  }

  // =========================
  // 🔥 MAP
  // =========================
  renderMap(lat: number, lon: number): void {
    const mapEl = document.getElementById('map-container');
    if (!mapEl) return;

    if (this.map) this.map.remove();

    this.map = L.map(mapEl).setView([lat, lon], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    L.marker([lat, lon])
      .addTo(this.map)
      .bindPopup(this.cityData.name)
      .openPopup();

    setTimeout(() => this.map.invalidateSize(), 200);
  }

  kelvinToCelcius(k: number): number {
    return Math.round((k - 273.15) * 100) / 100;
  }

  getWeatherIconUrl(icon: string): string {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }

  getWindDirection(deg: number): string {
    if (deg >= 337.5 || deg < 22.5) return 'Utara';
    if (deg < 67.5) return 'Timur Laut';
    if (deg < 112.5) return 'Timur';
    if (deg < 157.5) return 'Tenggara';
    if (deg < 202.5) return 'Selatan';
    if (deg < 247.5) return 'Barat Daya';
    if (deg < 292.5) return 'Barat';
    return 'Barat Laut';
  }
}
