import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';
import { Footer } from '../footer/footer';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

declare const $: any;

@Component({
  selector: 'app-mahasiswa',
  imports: [Header, Sidebar, Footer, RouterModule],
  templateUrl: './mahasiswa.html',
  styleUrl: './mahasiswa.css',
})
export class Mahasiswa implements AfterViewInit {
  data: any;
  table1: any;

  constructor(private httpClient: HttpClient, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.renderer.removeClass(document.body, 'sidebar-open');
    this.renderer.addClass(document.body, 'sidebar-closed');
    this.renderer.addClass(document.body, 'sidebar-collapse');

    this.httpClient
      .get('https://stmikpontianak.cloud/011100862/tampilMahasiswa.php')
      .subscribe((data: any) => {
        console.table(data);
        this.table1.clear();

        data.forEach((element: any) => {
          var tempatTanggalLahir =
            element.TempatLahir + ', ' + element.TanggalLahir;

          const jenisKelaminFormatted =
            element.JenisKelamin +
            ' ' +
            ((element.JenisKelamin == 'Perempuan' ||
            element.JenisKelamin == 'perempuan'
              ? "<i class='fas fa-venus text-danger'></i>"
              : element.JenisKelamin != 'undefined'
              ? "<i class='fas fa-mars text-primary'></i>"
              : ''));

          var row = [
            element.NIM,
            element.Nama,
            jenisKelaminFormatted,
            tempatTanggalLahir,
            element.JP,
            element.Alamat,
            element.StatusNikah,
            element.TahunMasuk,
          ];
          this.table1.row.add(row);
        });
        this.table1.draw(false);
      });

    $('#table1').DataTable();
    this.table1 = $('#table1').DataTable();
  }

  // ====================================================
  //                METHOD DIPINDAHKAN KE SINI
  // ====================================================

  bindMahasiswa(): void {
    // isi sesuai kebutuhan nanti
  }

  showTambahModal(): void {
    $('#tambahModal').modal();
  }
  

 postRecord(): void {
  var alamat = $("#alamatText").val();
  var jenisKelamin = $("#jenisKelaminSelect").val();
  var jp = $("#jpSelect").val();
  var nama = $("#namaText").val();
  var nim = $("#nimText").val();
  var statusNikah = $("#statusNikahSelect").val();
  var tahunMasuk = $("#tahunMasukText").val();
  var tanggalLahir = $("#tanggalLahirText").val();
  var tempatLahir = $("#tempatLahirText").val();

  if (nim.length == 0) {
    alert("NIM belum diisi");
    return;
  }

  if (nama.length == 0) {
    alert("Nama belum diisi");
    return;
  }

  if (tempatLahir.length == 0) {
    alert("Tempat lahir belum diisi");
    return;
  }

  if (tanggalLahir.length == 0) {
    alert("Tanggal lahir belum diisi");
    return;
  }

  if (alamat.length == 0) {
    alert("Alamat belum diisi");
    return;
  }

  if (tahunMasuk.length == 0) {
    alert("Tahun Masuk belum diisi");
    return;
  }

  alamat = encodeURIComponent(alamat);
  jenisKelamin = encodeURIComponent(jenisKelamin);
  jp = encodeURIComponent(jp);
  nama = encodeURIComponent(nama);
  nim = encodeURIComponent(nim);
  statusNikah = encodeURIComponent(statusNikah);
  tahunMasuk = encodeURIComponent(tahunMasuk);
  tanggalLahir = encodeURIComponent(tanggalLahir);
  tempatLahir = encodeURIComponent(tempatLahir);

  var url = "https://stmikpontianak.cloud/011100862/tambahMahasiswa.php" +
    "?alamat=" + alamat +
    "&jenisKelamin=" + jenisKelamin +
    "&jp=" + jp +
    "&nama=" + nama +
    "&nim=" + nim +
    "&statusPernikahan=" + statusNikah +
    "&tahunMasuk=" + tahunMasuk +
    "&tanggalLahir=" + tanggalLahir +
    "&tempatLahir=" + tempatLahir;

  this.httpClient.get(url)
  .subscribe((data: any) => {
    console.log(data);
    alert(data.status + " --> " + data.message);

    this.bindMahasiswa();
    $("#tambahModal").modal("hide");
  });
 }
}
