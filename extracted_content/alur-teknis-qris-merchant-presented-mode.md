---
title: Alur Teknis QRIS Merchant Presented Mode
date: 2020-10-29T15:15:39.768Z
draft: false
tags:
  - qris
  - qrcode
  - payment
  - fintech
  - astrapay
  - dana
  - gojek
  - ovo
  - product development
categories:
  - Jurnal
  - Product Development
image:
  filename: featured
  focal_point: Smart
  preview_only: false
---
![QRIS Merchant Presented Mode](image-20200722-031548.png "QRIS Merchant Presented Mode")

Perlu diketahui QR Code yang digunakan di Indonesia yang dinamakan dengan [QR Code](https://muhamadakmal.id/post/apa-itu-qris/) merujuk kepada sepsifikasi [QR EMVCo](https://www.emvco.com/emv-technologies/qrcodes/), EMVCo merupakan perusahaan gabungan dari Europay Mastercard dan Visa yang bertujuan untuk mendukung interopabilitas teknologi finansial secara worldwide.

Berdasarkan spek QR yang dirilis EMVCo QR Payment Acceptance terbagi atas 2, 

1. **Merchant Presented Mode** -> Merchant/pedagang menunjukkan QR, customer memindai QR code merchant

2. **Customer Presented Mode** -> Customer yang menujukkan QR, merchant/pedagang memindai QR code customer

Gambar diatas merupakan gambar teknis alur dari QRIS merchant presented mode.

### Mengapa QRIS Penting?

Sebelum adanya QRIS, setiap penyedia layanan pembayaran digital (seperti GoPay, OVO, Dana, LinkAja) memiliki standar QR Code mereka sendiri. Bayangkan jika seorang pedagang (merchant) ingin menerima pembayaran dari 5 dompet digital yang berbeda, mereka harus memajang 5 stiker QR Code di kasir mereka. Ini tentu membingungkan bagi kasir dan pelanggan.

QRIS hadir sebagai solusi *interoperability*. Dengan satu QRIS, merchant bisa menerima pembayaran dari aplikasi apa pun yang sudah mendukung standar QRIS. Hal ini sangat mendorong inklusi keuangan di Indonesia, terutama bagi UMKM yang sebelumnya belum tersentuh layanan perbankan digital.

### MPM vs CPM

Seperti yang disebutkan sebelumnya, ada dua mode utama dalam implementasi QRIS:

1. **Merchant Presented Mode (MPM)**
   Mode ini adalah yang paling umum kita temui. Terdapat dua jenis MPM:
   - **Static MPM**: QR Code dicetak pada stiker atau akrilik dan dipajang di kasir. Pelanggan memindai QR Code tersebut, lalu memasukkan nominal pembayaran secara manual di aplikasi mereka.
   - **Dynamic MPM**: QR Code dihasilkan secara dinamis melalui mesin EDC atau layar monitor kasir. Nominal pembayaran sudah tertanam di dalam QR Code tersebut, sehingga pelanggan hanya perlu memindai dan mengonfirmasi pembayaran dengan PIN.

2. **Customer Presented Mode (CPM)**
   Mode ini merupakan kebalikan dari MPM. Alih-alih merchant yang menampilkan QR Code, di sini pelangganlah yang membuka aplikasi pembayaran mereka, memunculkan QR Code di layar ponsel, lalu kasir yang akan memindainya menggunakan *scanner* barcode/QR genggam. Mode ini umumnya digunakan di minimarket atau jaringan ritel modern yang membutuhkan kecepatan transaksi tinggi di meja kasir.

### Alur Teknis di Balik Layar

Ketika seorang pelanggan memindai QRIS (MPM) menggunakan aplikasi dompet digitalnya, aplikasi tersebut akan membaca sekumpulan data *string* yang tertanam dalam gambar QR tersebut. String ini mengikuti standar EMVCo yang berisi informasi penting seperti:
- ID Merchant (National Merchant ID / NMID)
- Kategori Bisnis Merchant (MCC)
- Mata Uang (IDR)
- Kode Akuisisi (Acquirer ID)

Data ini kemudian dikirimkan oleh aplikasi pelanggan ke server penyedia dompet digital (Issuer). Server Issuer akan mengecek saldo pelanggan, lalu meneruskan pesan transaksi ke lembaga *switching* nasional (seperti PTEN, Artajasa, Rintis, atau Alto). Lembaga switching inilah yang bertugas meneruskan dana dari Issuer ke server penyedia layanan QRIS merchant (Acquirer).

Setelah Acquirer menerima konfirmasi bahwa dana tersedia dan berhasil ditransfer, Acquirer akan mengirimkan notifikasi sukses ke sistem kasir merchant, dan Issuer akan mengirimkan notifikasi sukses ke ponsel pelanggan. Semua proses kompleks ini terjadi dalam hitungan detik.

Dengan ekosistem pembayaran yang terstandarisasi seperti ini, inovasi di bidang *fintech* dapat terus berkembang tanpa terhalang oleh tembok monopoli infrastruktur.
