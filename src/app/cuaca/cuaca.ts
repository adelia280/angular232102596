import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';
import { Footer } from '../footer/footer';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

declare const $: any;
declare const moment: any;
declare const L: any;

@Component({
  selector: 'app-cuaca',
  standalone: true,
  imports: [Header, Sidebar, Footer, RouterModule],
  templateUrl: './cuaca.html',
  styleUrl: './cuaca.css',
})
export class Cuaca implements AfterViewInit {

  private table1: any;
  private map: any;

  cityData: any;
  currentWeather: any;
  todayDate: string = '';

  constructor(
    private renderer: Renderer2,
    private http: HttpClient
  ) {
    this.renderer.removeClass(document.body, 'sidebar-open');
    this.renderer.addClass(document.body, 'sidebar-closed');
  }

  ngAfterViewInit(): void {
    this.table1 = $('#table1').DataTable({
      columnDefs: [
        {
          targets: 0,
          render: (data: string) => {
            const waktu = moment(data + ' UTC');
            return (
              waktu.local().format('YYYY-MM-DD') +
              '<br />' +
              waktu.local().format('HH:mm') +
              ' WIB'
            );
          },
        },
        {
          targets: 1,
          render: (data: string) => {
            return `<img src="${data}" style="filter: drop-shadow(5px 5px 10px rgba(0,0,0,0.7));" />`;
          },
        },
        {
          targets: 2,
          render: (data: string) => {
            const [cuaca, description] = data.split('||');
            return `<strong>${cuaca}</strong><br />${description}`;
          },
        },
      ],
    });
  }

  getData(city: string): void {
    if (!city) return;

    city = encodeURIComponent(city);

    this.http
      .get<any>(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=87d3e1cd7b3cad09477aa21ce1c4dfba`
      )
      .subscribe(
        (data) => {
          this.cityData = data.city;

          if (data.list.length > 0) {
            this.currentWeather = data.list[0];
            this.todayDate = moment(this.currentWeather.dt_txt + ' UTC')
              .local()
              .format('MMM DD, hh:mma');

            setTimeout(() => {
              this.initMap(
                this.cityData.coord.lat,
                this.cityData.coord.lon
              );
            }, 100);
          }

          this.table1.clear();

          data.list.forEach((element: any) => {
            const weather = element.weather[0];
            const iconUrl =
              'https://openweathermap.org/img/wn/' +
              weather.icon +
              '@2x.png';

            const cuacaDeskripsi =
              weather.main + '||' + weather.description;

            const tempMin = this.kelvinToCelcius(element.main.temp_min);
            const tempMax = this.kelvinToCelcius(element.main.temp_max);
            const temp = `${tempMin}°C - ${tempMax}°C`;

            this.table1.row.add([
              element.dt_txt,
              iconUrl,
              cuacaDeskripsi,
              temp,
            ]);
          });

          this.table1.draw(false);
        },
        (error) => {
          alert(error.error.message);
          this.table1.clear().draw(false);
        }
      );
  }

  private initMap(lat: number, lon: number): void {
    if (this.map) {
      this.map.remove();
    }

    this.map = L.map('map-container').setView([lat, lon], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    L.marker([lat, lon])
      .addTo(this.map)
      .bindPopup(this.cityData.name)
      .openPopup();
  }

  kelvinToCelcius(kelvin: number): number {
    return Math.round((kelvin - 273.15) * 100) / 100;
  }

  handleEnter(event: any): void {
    const cityName = event.target.value;

    if (!cityName) {
      this.table1.clear().draw(false);
      return;
    }

    this.getData(cityName);
  }
}
