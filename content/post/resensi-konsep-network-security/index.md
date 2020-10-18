---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/
aliases: "/blog/resensi-konsep-network-security"

title: "Resensi Konsep Network Security"
subtitle: ""
summary: ""
authors: [Muhamad Akmal]
tags: [slide kuliah, binus]
categories: [Network Security]
date: 2016-03-21T18:49:41+07:00
lastmod: 2016-03-22T18:49:41+07:00
featured: false
draft: false
aliases: "/post/resensi-konsep-network-security"

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
# Focal points: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight.
image:
  caption: ""
  focal_point: ""
  preview_only: false

# Projects (optional).
#   Associate this post with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `projects = ["internal-project"]` references `content/project/deep-learning/index.md`.
#   Otherwise, set `projects = []`.
projects: []
---

Network security adalah keamanan jaringan. Dari arti di situ saya hanya bisa mengetahui sedikit ialah bagaimana mengamankan jaringan agar tidak mudah di bobol oleh orang. Caranya yang saya tau mungkin dengan memberikan password yang memberikan kombinasi digit, upper case latter, non-alphanumeric untuk meminimal kemungkinan perkiraan password yang di buat user tersebut.

##### System Security

System Security merupakan istilah komputer yang berarti proses pengumpulan dan mekanisme kerja dimana informasi yang bersifat sensitif dan berharga yang dilindungi dari umum.syarat dari information security

> **Information security = confidentiality + integrity + availability**

***Confidentiality*** adalah kerahasiaan , Confidentiality berkaitan erat dengan masalah otentikasi (authentication) terhadap pemilik informasi

***Integrity*** adalah keutuhan data / informasi agar tidak terjadi modifikasi terhadap sumber daya seperti informasi

***Availability*** adalah ketersediaan dari data tersebut.

##### Security Threats

Security Threats adalah ancaman terhadap elemen-elemen dari information security yang jika terjadi maka akan menimbulkan kerugian. Serangan terdiri dari 4 elemen yaitu :

***Interception*** adalah situasi dimana pihak yang tidak berwenang dapat mengakses untuk jaringan atau informasi yang tidak ditujukan untuknya

***Interruption*** adalah situasi dimana service atau data tidak tersedia, tidak dapat digunakan, rusak, dll.

***Modification*** adalah perubahan data atau service yang dilakukan oleh pihak yang tidak berhak sehingga data yang ada bukan data asli lagi

***Fabrication*** adalah situasi dimana data atau aktifitas tambahan dihasilkan yang normalnya tidak pernah ada. 

##### Offensive Security dan Defensive Security

***Offensive Security*** berfokus pada pencarian pelaku yang masuk ke dalam system

***Defensive Security*** merupakan pendekatan konvensional yang mengutamakan keamanan dari serangan yang lebih bersifat preventif dan reaktif. Preventif adalah untuk mencegah sistem pada kerusakan yang ditimbulkan dari luar seperti menggunakan firewall dan accesss control. Reaktif adalah untuk menanggulangi jika sistem telah ditembus oleh pihak luar dengan melakukan pengecekan system seperti menggunakan antivirus. Atau menggunakan IDS (Intruder Detection System).

 

##### Definisi Hacker dan Cracker

***Hacker*** merupakan seseorang yang ahli dalam ilmu komputer atau IT, mereka yang memberikan sumbangan yang bermanfaat kepada jaringan komputer, membuat program kecil dan memberikannya dengan orang-orang diinternet

***Cracker*** adalah sebutan untuk mereka yang masuk ke sistem orang lain dan cracker lebih bersifat destruktif, biasanya di jaringan komputer, mem-bypass password atau lisensi program computer

***Keylogger*** merupakan suatu perangkat lunak ataupun perangkat keras yang digunakan untuk memantau penekanan tombol keyboard. Pencegahan terhadap keylogger adalah dengan software Anti- keylogger atau dengan menggunakan virtual keyboard.

***Brute Force*** merupakan suatu cara untuk pengambilan password pada sistem seseorang. Pencegahan terhadap bruteforce adalah memberikan batasan login terhadap sistem tersebut misalnya memberikan percobaan login sebanyak 5 kali, capcha pada sistem tersebut, dll.



### FOOT PRINTING

Biasa disebut sebagai **Target Profiling** merupakan fase dimana mengumpulkan segala informasi yang di perlukan untuk melakukan penyerangan terhadap suatu system/target.

Ada 2 tahap

1. Passive —> mencari di koran, majalah, berita mengenai target.
2. Active —> langsung di lokasi target, direct attack

***Internet Information Queries*** Dalam pengumpulan informasi dengan mengunakan media internet, salah satunya adalah dengan menggunakan website yang sudah tersedia. Alat yang digunakan adalah konseksi internet dan browser. Berikut cara mengumpulkan datanya

- Dengan mendapatkan informasi dari lowongan pekerjaan dari suatu perusahaan.
- Dumspter Diving.
- Menganalisis baris kode pada website.
- Menggunakan teknik “Google Hacking”

***Packet Sniffers*** adalah aplikasi perangkat lunak yang menggunakan network adapter card dalam mode promiscuous untuk menangkap semua jaringan packet. Pencegahan packet sniffers:

- Otentikasi
- Cryptography
- Antisniffer Tools
- Switched

***Port scanning*** adalah salah satu teknik yang paling populer penyerang gunakan untuk menemukan layanan yang mereka dapat masuk ke dalam. Dengan menggunakan port scans kita dapat mengetahui :

- Semua services
- Semua hosts dan device
- Operating sistem yang dipakai
- Vulnerabilities

Pencegahan terhadap port scans —> Port scans tidak bisa dicegah tanpa mengorbankan kemampuan jaringan. Selain itu kerusakan dapat dikurangi dengan menggunakan sistem pencegahan penyusupan pada tingkat jaringan dan host.

***Ping Sweeps*** juga dikenal dengan ICMP sweep adalah sebuah teknik dasar scanning dalam jaringan yang digunakan untuk menentukan dari kisaran alamat IP dalam suatu jaringan host.

***Traceroute*** adalah perintah komputer untuk mendiagnosis transmisi paket dari IP sumber ke IP tujuan dengan men-display jalur yang dilewati paket tersebut untuk mencapai tujuannya. Tracert adalah command console di windows untuk melakukan traceroute dimana akan dilakukan pencatatan rute yang dilewati paket untuk mencapai tujuan.

 

### MALWARE & SPYWARE

***Malicious Software (Malware)*** adalah software yang bertujuan mengganggu operasi computer, mengambil informasi & mendapat akses ke computer pribadi

***Trojan Horse*** adalah sebuah potongan kode yang bersembunyi didalam program dan menyamar sebagai fungsi yang sama dengan program yang asli. Contoh: 

- Keylogger
- Password stealing Trojan

 **Cara menghindari Trojan Horse:**

- Tidak semua trojan akan terdeteksi sebagai virus, diusahakan untuk meng-update antivirus anda secara berkala
- Jangan pernah mau menerima file dari orang yang tidak dikenal memalui sistem chat messenger.
- Jangan pernah men-download apapun yang ditemukan dari website yang tidak dikenal. Kemungkinan program tersebut sudah ditanamkan trojan.

***Virus*** merupakan program parasite yang tidak (mandiri) , dan program ini dapat menyebarkan diri jika di aktifkan programnya dan Virus memerlukan ‘Host’.

***Worm*** merupakan kebalikan dari virus, worm (mandiri) karena dirancang untuk menyebar pada system yang terinfeksi dan mencari system lain melalui jaringan yang ada.

***Botnet*** (robot internet) adalah program berbahaya (salah satu malware) yang bisa menjadikan komputer target sebagai bot yang melakukan tugas-tugas otomatis melalui internet tanpa disadari target.

***Hydra*** sejatinya adalah botnet tapi hydra memiliki konsep yang sedikit berbeda dengan botnet sehingga bisa dikatakan lebih *advance*. Ketika hidra dibasmi tapi tidak sampai tuntas maka dapat berkembang dan meyerang dengan skala yang lebih besar walaupun dengan komponen yang tidak utuh.

***Spyware*** adalah istilah khusus untuk mendefinisikan software yang melakukan tindakan tertentu tanpa persetujuan dari pengguna computer, seperti:

- Periklanan
- Mengumpulkan informasi pribadi
- Mengubah konfigurasi komputer

Spyware sering dikaitkan dengan software yang menampilkan iklan (disebut adware).

***Antivirus*** adalah jenis software yang digunakan untuk mencegah, mendeteksi, dan menghilangkan program-program berbahaya.

***Zombie*** merupakan program yang mengambil alih computer jaringan lain kemudian menggunakannya untuk tidak baik



### Denial of Service dan DDOS

***Denial of Service*** merupakan jenis serangan terhadap sebuah computer / server dengan tujuan mencegah pengguna lain mendapatkan akses. DoS dilakukan dengan cara menghabiskan sumber (resource) yang di miliki computer.

**Karakteristik dari DDoS attack adalah :**

1. Serangan DDoS merupakan serangan besar-besaran dan terkoordinasi pada ketersediaan pelayanan sistem korban
2. Layanan yang diserang mereka dinamakan ”Primary Victim”, sementara sistem kompromise digunakan untuk meluncurkan serangan sering disebut “Secondary Victim”.
3. Serangan berasal dari beberapa IP address.
4. Jika satu IP address digunakan untuk menyerang suatu perusahaan, maka IP tersebut dapat diblok dengan menggunakan firewall. Jika IP tersebut 30000 maka ini sangatlah sulit.
5. Pelaku mampu melipatgandakan efektivitas dari Denial of Service secara signifikan dengan memanfaatkan sumber daya dari beberapa komputer tanpa disadari beberapa user yang menggunakan komputer yang berfungsi sebagai serangan platform.

***Honeypot*** adalah suatu system computer yang fleksibel dan dikustomasi menjadi alat keamanan dan di-set up untuk menyerang dan “menjebak” orang yang berusaha melakukan hacking.

Teknik yang sering digunakan di DDoS dan DoS :

- ***Pings of Death***—> Jenis serangan pada [komputer](https://id.wikipedia.org/wiki/Komputer) yang melibatkan pengiriman [ping](https://id.wikipedia.org/wiki/Ping) yang salah atau berbahaya ke komputer target
- ***Ping Flood*** —> Jenis serangan dengan mengirimkan banyak paket ICMP echo request(ping) yang memiliki bandwith lebih banyak dari pada target.
- ***Tear Drop*** —> Serangan yang memanfaatkan fitur yang ada di TCP/IP yaitu pemecahan paket
- **S*YN Attack —> Serangan yang mengirimkan banyak SYN(synchronize) ke server dan tidak membalas ACK (acknowledgement)
- **Smurf Attack** —> Serangan  DDoS yang yang mengirimkan pesan ping ICMP reply dalam jumlah yang besar kebanyak komputer 
- **NetCat/NetCut** —> Sebuah utility tool yang digunakan para hacker yang berkaitan dengan protocol TCP atau UDP

 

### Sniffing

**Sniffing** adalah aktivitas menyadap yang dilakukan dalam jaringan yang sangat sulti untuk di cegah.

- Sniffer —>alat yang digunakan untuk menangkap informasi dalam sebuah jaringan melalui paket-paket  data yang lewat.
- Spoofing —> Teknik yang digunakan untuk memperoleh akses yang tidak sah ke suatu komputer

Snifing dalam peletakan posisinya dibagi 2 yaitu:

**Passive sniffing** adalah suatu kegiatan penyadapan tanpa merubah data atau paket apapun pada jaringan

**Active sniffing** adalah kegiatan sniffing yang dapat melakukan perubahan paket data dalam jaringan agar bisa melakukan sniffing. Metode active sniffing yang paling umum dilakukan adalah :

- **ARP Spoofing Attack** —> Penyerangan Local Area Network
- **Mac Flooding** —> Penyerangan packet data ke Switch
- **Port Mirrorring** —> Cara sniffing dengan menggunakan switch. Dalam hal ini, penyerang harus dapat mengakses      command-line interface dari switch dan switch juga harus mendukung port-mirroring. 

**Cara untuk mendeteksi Sniffing:**

1. Lakukan pengecekan terhadap mesin mana yang sedang berjalan dalam keadaan yang tidak stabil.
2. Jalankan ARPWATCH dan antisipasi jika MAC Address dalam komputer tersebut berubah.
3. Jalankan network tool seperti HP OpenView dan IBM Tivoli network health check tool untuk memonitor jaringan dengan pengiriman packet yang aneh.

**Penanggulangan:**

1. Pembatasan akses fisik ke media jaringan untuk memastikan bahwa sniffer paket tidak dapat diinstal.
2. Cara terbaik untuk mengamankan sniffing adalah dengan menggunakan encryption. Hal ini tidak akan mencegah snif tetapi cara tersebut dapat mencegah sniffer tidak dapat mendapatkan informasi tersebut. 



### Encryption

**Enkripsi** meruapkan proses mengamankan suatu informasi(*chiper*) dengan membuat informasi tersebut tidak dapat dibaca tanpa pengetahuan khusus.

- ***One-way Encryption*** —> Pengubahan data ke bentuk lainnya secara satu arah, artinya data yang sudah berubah tidak bisa dikembalikan ke datanya semula
- **Two-way Encryption** —> Pengubahan data ke bentuk lainnya secara dua arah, artinya data yang sudah berubah bisa dikembalikan ke data aslinya. 

**Dekripsi** merupakan proses mengembalikan ciphertext menjadi plaintext.

**Hashing** merupakan proses trasnformasi digital dari ukuran aslinya menjatu ukuran tertentu terlepas dari beberapa besar ukuran aslinya yang sama seperti aslinya

**Hash Function** merupakan fungsi yang melakukan *Hashing* tersebut

**Cryptographic hash function** digunakan untuk memverifikasi apakah input data cocok dengan hash value yang disimpan sehingga umum digunakan untuk keperluan keamanan pada teknologi informasi. Proses ini biasa dikenal (Message Digest),

Sifat dari Cryptographic Hash Function adalah tidak mungkin untuk menghasilkan pesan asli dari   *hash value-nya.*

1. **Enkripsi Konvensional (Symmetric Encryption)**

Informasi asal yang dapat di mengerti di simbolkan oleh Plain teks, yang kemudian oleh algoritma Enkripsi diterjemahkan menjadi informasi yang tidak dapat untuk dimengerti yang disimbolkan dengan cipher teks.

Keamanan dari enkripsi konvensional bergantung pada beberapa faktor. Pertama algoritma enkripsi harus cukup kuat sehingga menjadikan sangat sulit untuk mendekripsi cipher teks dengan dasar cipher teks tersebut. Lebih jauh dari itu keamanan dari algoritma enkripsi konvensional bergantung pada kerahasian dari kuncinya bukan algoritmanya.

**Manfaat Algoritma Enkripsi Konvensional:** Kemudahan dalam penggunaan secara luas

**Contoh Enkripsi Konvensional (Symmetric Encryption)**

1. Caesar Cipher (Shift Cipher)

   Enkripsi ini adalah jenis yang paling banyak diketahui dan paling mudah. Tiap karakter pada plain text digantikan oleh karakter lain dari kumpulan karakter yang sudah ditentukan (*char sequence*), yang posisinya digeser (*shifted*) beberapa kali ke kanan atau kekiri 

2. Simple Substitution Cipher

   Pada simple substitution, tiap karakter di plaintext dengan karakter A sampai Z yang urutannya sudah diubah sesuai keyword tertentu.

3. Route Cipher

   Dalam route cipher, untuk menjaga kerahasiaan data dilakukan penulisan data dalam grid dan merubah posisi tiap karakter dalam grid tersebut.

   -----

   

1. **Enkripsi Public key**. Enkripsi ini berbeda dengan konvensional yang memerlukan satu kunci saja dalam membuka dan menutup data tersebut,sedangkan dalam public key pembuat mengunakan public key sedangkan pembuka data mengunakan privat key. Berikut akan ditampilkan berbagai aspek penting dari enkripsi konvensional dan public key.

**Enkripsi Konvensional**

Yang dibutuhkan oleh enkripsi konvensional :

1. Algoritma yang sama dengan kunci yang sama dapat digunakan untuk proses dekripsi–enkripsi.
2. Pengirim dan penerima harus membagi algoritma dan kunci yang sama. 

**Enkripsi Public Key**

Yang dibutuhkan oleh enkripsi public key :

1. Algoritma yang digunakan untuk enkripsi dan dekripsi dengan sepasang kunci, satu untuk enkripsi satu untuk dekripsi.
2. Pengirim dan penerima harus mempunyai sepasang kunci yang cocok.

Yang dibutuhkan untuk keamanan enkripsi public key dan konvensional:

1. Key harus dirahasiakan
2. Tidak mungkin atau sangat tidak praktis untuk menerjemahkan informasi yang telah dienkripsi.
3. Pengetahuan tentang algoritma dan sample dari kata yang terenkripsi tidak mencukupi untuk menentukan kunci.