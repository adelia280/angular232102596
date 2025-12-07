import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';
import { HttpClient } from '@angular/common/http';
import { formatCurrency } from '@angular/common';

declare const $ : any;

@Component({
  selector: 'app-forex',
  standalone: true,
  imports: [ Footer, Header, Sidebar],
  templateUrl: './forex.html',
  styleUrl: './forex.css',
})
export class Forex implements AfterViewInit {
  private _table1 : any;

  constructor(private renderer: Renderer2, private httpClient: HttpClient) {}

  ngAfterViewInit(): void {
    this.renderer.removeClass(document.body, "sidebar-open");
    this.renderer.removeClass(document.body, "sidebar-closed");
    this.renderer.removeClass(document.body, "sidebar-collapsed");

    this. _table1 =$("#table1").DataTable({
      "columnDefs": [
        {
          "targets" : 3,
          "className" : "text-right"
        }
      ]
    });

    this.bindTable1();
  }

 bindTable1(): void {
  console.log("bindTable1()");

  const ratesUrl = "https://api.exchangerate-api.com/v4/latest/USD"; // Data kurs lengkap (tanpa API KEY)
  const currenciesUrl = "https://openexchangerates.org/api/currencies.json"; // Nama mata uang

  // Ambil daftar nama mata uang dulu
  this.httpClient.get(currenciesUrl).subscribe((currencies: any) => {

    this.httpClient.get(ratesUrl).subscribe((data: any) => {
      const rates = data.rates;
      let index = 1;

      this._table1.clear(); // reset table dulu

      // Loop semua mata uang
      for (const code in rates) {
        const currencyName = currencies[code] ?? "(Nama Tidak Ditemukan)";
        const rate = rates[code];

        const formattedRate = formatCurrency(rate, "en-US", "$", code);

        this._table1.row.add([
          index++,
          code,
          currencyName,
          formattedRate
        ]);
      }

      this._table1.draw(false);
    });
  });
}
}
