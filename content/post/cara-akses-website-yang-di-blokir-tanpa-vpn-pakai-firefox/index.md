---
aliases: "/blog/cara-akses-website-yang-di-blokir-tanpa-vpn-pakai-firefox"

title: "Cara Akses Website yang di Blokir Tanpa VPN Pakai Firefox"
subtitle: ""
summary: "DNS over HTTPS adalah fitur yang relatif baru yang dirancang untuk meningkatkan privasi, keamanan, dan keandalan koneksi."
authors: [Muhamad Akmal]
tags: [dns over https, firefox, vpn]
categories: [Jurnal]
date: 2020-05-20T21:53:00+07:00
date: 2020-05-20T21:53:00+07:00
featured: true
draft: false
image:
  caption: ""
  focal_point: ""
  preview_only: false
---
#### Cara Akses Website yang di Blokir Tanpa VPN Pakai Firefox

DNS over HTTPS adalah fitur yang relatif baru yang dirancang untuk meningkatkan privasi, keamanan, dan keandalan koneksi; 

*In a nutshell*, dengan DNS Over HTTPS ini kita bisa akses situs yang di blokir sama ISP. Tergantung kemampuan DNS Resolvernya juga sebetulnya.

#### Cara Setting DNS Over HTTPS di Firefox

1. Buka ```about:config``` di Browser Firefox. Firefox harus diatas versi 60.x.

   ![dns over https firefox 1](https://i.loli.net/2020/05/20/psmCYMNfzTRoVIX.png)

2. Confirm warning page yang di tampilkan

   ![dns over https firefox 2](https://i.loli.net/2020/05/20/kAnLxXP6gTbaQV1.png)

3. Cari network.trr.mode pada config

   - Set value pada network.trr.mode menjadi 2 untuk menjadikan DNS over HTTPS pilihan pertama dalam request payload website
   - Set value 3 untuk hanya jadikan DNS over HTTPS satu-satunya pilihan request
   - Set value 0 untuk non-aktifkan DNS Over HTTP

4. Cari network.trr.uri dan masukkan DNS yang di provide. dari mozilla secara default menyediakan ``https://mozilla.cloudflare-dns.com/dns-query`` atau bisa di cek list DNS yang bisa dipakai di [halaman GitHub ini](https://github.com/curl/curl/wiki/DNS-over-HTTPS)



Sumber : 

1. https://www.ghacks.net/2018/04/02/configure-dns-over-https-in-firefox/

2. https://github.com/curl/curl/wiki/DNS-over-HTTPS