---
title: Beradaptasi Dengan Teknologi Baru
date: 2020-10-18T16:18:07.262Z
draft: false
tags:
  - netlifycms
  - headless blog
  - hugo
  - netlify
categories:
  - Jurnal
  - Programming
image:
  filename: post-netlifycms-1200x630.jpg
  focal_point: Smart
  preview_only: false
---

<!-- 
![netlifycms](post-netlifycms-1200x630.jpg "netlifycms") -->

Karena ada update major dengan framework headless blog hugo dan theme academic yang digunakan oleh blog ini, saya harus melakukan migrasi yang lumayan menyita hari minggu. Tapi dengan teknologi baru dan saya bisa menggunakan NetlifyCMS, hal ini sangat memudahkan saya dalam mengupdate post baru.

Jadi untuk update post baru tidak perlu menggunakan Visual Studio Code, dan postingan ini dibuat di NetlifyCMS 😁

### Mengapa Netlify CMS?

Sebelumnya, saya menggunakan kombinasi Hugo dan Visual Studio Code untuk menulis blog. Meski efisien bagi seorang developer, alur kerja ini terasa kaku jika saya hanya ingin sekadar menulis jurnal harian. Setiap kali ada ide, saya harus membuka laptop, menarik repo terbaru, membuat file markdown baru, mengisi frontmatter secara manual, lalu melakukan commit dan push.

Dengan hadirnya Netlify CMS (yang kini bertransformasi menjadi Decap CMS), proses ini menjadi jauh lebih manusiawi. Netlify CMS menyediakan antarmuka visual yang berjalan langsung di atas repository Git kita. 

Beberapa keuntungan yang saya rasakan:
1. **Bisa Menulis di Mana Saja**: Saya bisa mengakses halaman admin dari browser mana pun, bahkan dari tablet, tanpa perlu menginstal Git atau text editor.
2. **Visual Interface**: Frontmatter yang tadinya berupa kode YAML kini menjadi form input yang ramah pengguna.
3. **Media Management**: Mengunggah gambar tidak lagi membutuhkan proses manual copy-paste ke folder statis, semuanya diurus oleh CMS.

### Tantangan Beradaptasi

Tentu saja, perpindahan ini bukan tanpa hambatan. Mengonfigurasi `config.yml` untuk menyesuaikan dengan struktur direktori Hugo yang sudah ada membutuhkan sedikit *trial and error*. Selain itu, ada beberapa field khusus tema Academic yang harus dipetakan ulang agar kompatibel dengan CMS.

Namun, mengutip kalimat Stephen Hawking di awal tulisan ini, kemampuan beradaptasi adalah kunci. Teknologi akan terus berkembang dengan cepat. Jika kita terlalu nyaman dengan satu alat dan enggan mempelajari yang baru, kita akan tertinggal. 

Bagi saya, meluangkan satu hari libur untuk mengatur sistem ini adalah sebuah investasi yang sangat berharga. Kini, penghalang antara "ide di kepala" dan "tulisan di blog" menjadi semakin tipis. Saya bisa kembali fokus pada hal yang paling penting: **menulis**.
