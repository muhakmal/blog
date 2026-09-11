---
title: Slide Kuliah Network Security - BINUS
tags:
  - slide kuliah
  - binus
  - network security
categories:
  - Network Security
date: 2015-09-08T11:49:39.000Z
draft: false
---
Postingan ini merupakan slide dari mata kuliah T2354 - Keamanan Jaringan (Network Security) Tahun 2015. Slide ini Berisi

1. Session 1 - Fundamentals of Network Security
2. Session 2 - Vulnerability and Threat Assessment
3. Session 3 - Malware Attacks
4. Session 4 - Classical Cryptography
5. Session 5 - Modern Block Symmetrical Encryption
6. Session 6 - Public Key Cryptography
7. Session 7 - Hash, MAC, and Digital Signature
8. Session 8 - Key Management and Distribution
9. Session 9 - Access Control and Auth
10. Session 10 - Network and Transport Layer Security
11. Session 11 - GSLC
12. Session 12 - Digital Certificates, PKI, and e-Mail Security
13. Session 13 - Network Intrusion Pervention System

Semua bisa di Download [Disini](https://drive.google.com/open?id=0B8Aag2QvOdwqWTlXZ2VQYWtXYW8)

Semoga bermanfaat untuk Internet 😊

Postingan ini merupakan slide dari mata kuliah T2354 - Keamanan Jaringan (Network Security) Tahun 2015. Slide ini Berisi materi dasar tentang konsep keamanan jaringan komputer, ancaman yang biasa dihadapi, serta mekanisme pertahanan dasar.

### Konsep Dasar Keamanan Jaringan

Dalam dunia *network security*, kita mengenal apa yang disebut sebagai *CIA Triad*. Ini adalah tiga prinsip fundamental yang menjadi pilar utama dalam merancang sistem yang aman:

1. **Confidentiality (Kerahasiaan)**
   Memastikan bahwa informasi hanya dapat diakses oleh pihak yang memiliki otoritas (hak akses). Dalam jaringan, hal ini biasanya diimplementasikan melalui mekanisme *encryption* (enkripsi) data, baik saat data tersebut disimpan (data at rest) maupun saat data ditransmisikan melalui jaringan (data in transit).

2. **Integrity (Integritas)**
   Memastikan bahwa informasi tidak diubah, dimodifikasi, atau dirusak oleh pihak yang tidak bertanggung jawab selama proses penyimpanan atau transmisi. Mekanisme yang sering digunakan untuk menjaga integritas adalah *hashing* dan *digital signature*.

3. **Availability (Ketersediaan)**
   Memastikan bahwa sistem jaringan, aplikasi, dan data selalu tersedia dan dapat diakses oleh pengguna yang sah kapan pun dibutuhkan. Serangan yang paling umum menargetkan prinsip ini adalah *Denial of Service (DoS)* atau *Distributed Denial of Service (DDoS)*.

### Ancaman Jaringan yang Umum (Common Threats)

Sebuah jaringan komputer tidak pernah benar-benar aman dari ancaman. Beberapa ancaman yang paling sering ditemui antara lain:
- **Malware**: Perangkat lunak berbahaya seperti virus, worm, trojan, dan ransomware yang dirancang untuk menyusup atau merusak sistem komputer.
- **Phishing**: Teknik *social engineering* di mana penyerang memanipulasi korban untuk memberikan informasi sensitif (seperti password atau informasi kartu kredit) dengan menyamar sebagai entitas terpercaya.
- **Man-in-the-Middle (MitM) Attack**: Penyerang menyusup di antara komunikasi dua pihak untuk menguping, mencegat, atau mengubah data yang sedang ditransmisikan.

### Pertahanan Dasar (Basic Defenses)

Untuk melindungi jaringan dari ancaman-ancaman tersebut, dibutuhkan pertahanan berlapis (*defense in depth*):
- **Firewall**: Garis pertahanan pertama yang memfilter lalu lintas jaringan (masuk dan keluar) berdasarkan aturan keamanan yang telah ditetapkan.
- **Intrusion Detection/Prevention Systems (IDS/IPS)**: Sistem yang memonitor jaringan untuk aktivitas mencurigakan dan dapat mengambil tindakan pencegahan jika mendeteksi anomali.
- **Access Control List (ACL)**: Mekanisme kontrol untuk membatasi siapa yang dapat mengakses sumber daya tertentu di dalam jaringan.
- **Virtual Private Network (VPN)**: Membuat terowongan (tunnel) terenkripsi melalui jaringan publik (internet) agar komunikasi data tetap aman dan rahasia.

Pemahaman yang kuat mengenai konsep-konsep dasar ini merupakan langkah awal yang krusial sebelum mendalami topik keamanan siber (*cybersecurity*) yang lebih kompleks.
