# Cara Install Cookpedia di PC Baru

Panduan cepat untuk menjalankan Cookpedia (API + aplikasi) di komputer lain, misalnya PC lab saat UTS.
Penjelasan lengkap tentang API, database, dan arsitektur ada di [README.md](README.md).

---

## 1. Cek Node.js

Buka terminal (Command Prompt / PowerShell / Git Bash), lalu jalankan:

```bash
node -v
```

| Hasil | Artinya |
|---|---|
| `v22.13.0` atau lebih baru | Aman, lanjut ke langkah 2 |
| Versi lebih lama (misal `v18`, `v20`) | API **tidak bisa jalan**, karena butuh `node:sqlite`. Lihat [Node.js terlalu lama](#nodejs-terlalu-lama-atau-belum-terinstall) |
| `'node' is not recognized` | Node.js belum terinstall. Lihat bagian yang sama |

---

## 2. Download project

**Cara A: pakai Git**

```bash
git clone https://github.com/ernestjavier/UTS-MobileFW.git
cd UTS-MobileFW
```

**Cara B: tanpa Git**

1. Buka halaman repo di GitHub.
2. Klik tombol hijau **Code → Download ZIP**.
3. Extract ZIP, lalu buka folder hasil extract di terminal.

---

## 3. Install dependency

Frontend dan backend punya `package.json` masing-masing, jadi install dua kali:

```bash
# Dari folder utama project (frontend)
npm install

# Backend (API)
cd server
npm install
cd ..
```

---

## 4. Jalankan API

```bash
cd server
npm start
```

Berhasil jika muncul:

```
Cookpedia API running at http://localhost:3000
```

Database dan data awal (resep + akun demo) dibuat otomatis saat pertama kali jalan.

Cek di browser: buka **http://localhost:3000/api/recipes**. Harus muncul data resep dalam bentuk JSON.

> Biarkan terminal ini tetap terbuka. Kalau ditutup, API ikut mati.

---

## 5. Jalankan aplikasi (frontend)

Buka **terminal kedua**, dari folder utama project:

```bash
npm run dev
```

Buka alamat yang muncul, biasanya **http://localhost:5173**.

Login dengan akun demo:

| Email | Password |
|---|---|
| `ernest@mail.com` | `password123` |

---

## 6. (Opsional) Akses dari HP atau emulator

Salin `.env.example` menjadi `.env` di folder utama, lalu isi `VITE_API_URL`:

| Menjalankan di | Isi `VITE_API_URL` |
|---|---|
| Browser di PC yang sama | `http://localhost:3000/api` |
| Emulator Android | `http://10.0.2.2:3000/api` |
| HP asli (satu Wi-Fi dengan PC) | `http://<IP-PC>:3000/api` |

IP PC bisa dilihat dengan perintah `ipconfig` (cari **IPv4 Address**).
Setelah mengubah `.env`, hentikan frontend (`Ctrl + C`) lalu jalankan lagi `npm run dev`.

---

## Ringkasan perintah

```bash
git clone https://github.com/ernestjavier/UTS-MobileFW.git
cd UTS-MobileFW
npm install
cd server && npm install && npm start      # terminal 1
npm run dev                                # terminal 2, dari folder utama
```

---

## Kalau ada masalah

### Node.js terlalu lama atau belum terinstall

- **Punya akses admin:** install versi LTS terbaru dari https://nodejs.org.
- **Tidak punya akses admin (PC lab dikunci):** pakai Node.js versi portable.
  1. Buka https://nodejs.org/en/download, pilih **Windows → Standalone Binary (.zip)**.
  2. Extract, misalnya ke `D:\node`.
  3. Di terminal, sebelum menjalankan perintah lain:

     ```powershell
     # PowerShell
     $env:Path = "D:\node;" + $env:Path
     ```

     ```cmd
     :: Command Prompt
     set PATH=D:\node;%PATH%
     ```

  4. Cek lagi dengan `node -v`. Ini hanya berlaku untuk terminal itu saja, jadi ulangi di terminal kedua.

### `Error: Cannot find module 'node:sqlite'` / `No such built-in module: node:sqlite`

Versi Node.js terlalu lama. Lihat bagian di atas.

### `EADDRINUSE: address already in use :::3000`

Port 3000 sedang dipakai program lain. Jalankan API di port lain:

```powershell
# PowerShell
$env:PORT=3001; npm start
```

```cmd
:: Command Prompt
set PORT=3001 && npm start
```

Lalu sesuaikan `VITE_API_URL` di `.env` menjadi `http://localhost:3001/api`.

### Aplikasi tampil tapi data tidak muncul / gagal login

- Pastikan terminal API masih berjalan.
- Cek http://localhost:3000/api/recipes di browser.
- Kalau memakai `.env`, pastikan alamatnya benar dan frontend sudah dijalankan ulang.

### HP tidak bisa mengakses API

- HP dan PC harus di jaringan Wi-Fi yang sama.
- Windows Firewall mungkin memblokir. Saat muncul popup firewall pertama kali menjalankan Node, pilih **Allow access**.

### Ingin mengembalikan data ke kondisi awal

Hentikan API, hapus file `server/data/cookpedia.db`, lalu jalankan `npm start` lagi.
