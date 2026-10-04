# OTIM Retail Platform UI Skills

Dokumen ini menjadi panduan implementasi untuk login page dan dashboard platform OTIM.

## Product context

- Perusahaan: OTIM.
- Bidang usaha: retail, seluler, dan FnB.
- Produk: platform operasional dan Point of Sales OTIM.
- Frontend: Next.js App Router di `app/`.
- Backend/module logic: `src/`.
- Logo utama: `public/img.png`.
- Styling: Tailwind CSS melalui `app/tailwind.css`.
- UI components: shadcn/ui versi terbaru (`shadcn@latest`).

## OTIM design system

Gunakan visual yang profesional, hangat, dan mudah dipahami oleh operator retail, outlet seluler, maupun outlet FnB. Logo `public/img.png` menjadi sumber arah visual: emblem lingkaran merah, bidang gold, dan simbol sirkulasi putih.

### Color tokens

Gunakan token berikut sebagai baseline Tailwind/shadcn. Nilai dapat disimpan sebagai CSS variables di `app/tailwind.css`.

| Token | Hex | Penggunaan |
| --- | --- | --- |
| `otim-red` | `#E51C2A` | CTA utama, active navigation, link penting |
| `otim-red-dark` | `#B5121F` | hover, pressed state, heading aksen |
| `otim-gold` | `#C6A447` | highlight, premium badge, insight positif |
| `otim-gold-soft` | `#F8F1D9` | background highlight dan warning ringan |
| `otim-ink` | `#3B1114` | heading dan teks utama |
| `otim-muted` | `#766A6D` | deskripsi, metadata, placeholder |
| `otim-surface` | `#FFFDFC` | page background dan surface hangat |
| `otim-border` | `#EADBDD` | border card, input, divider |
| `white` | `#FFFFFF` | card dan area kontras |

- Merah adalah warna aksi; jangan gunakan untuk seluruh background halaman.
- Gold digunakan sebagai aksen, bukan teks panjang atau body text.
- Gunakan `otim-ink` di atas surface terang untuk keterbacaan.
- Status sukses boleh menggunakan green semantic standar, tetapi bukan warna brand utama.
- Status error gunakan red yang lebih gelap dengan background merah sangat muda.
- Jangan memakai gradient pada elemen UI utama; gradient hanya boleh muncul sebagai dekorasi yang sangat halus.

### Typography

- Gunakan Geist yang sudah tersedia dari `next/font` sebagai font utama.
- Heading halaman: bold atau semibold, tracking sedikit negatif, warna `otim-ink`.
- Body: regular, ukuran 14–16px, line-height minimal 1.5.
- Label dan metadata: medium/semibold, ukuran 12–14px, warna `otim-muted`.
- Angka statistik: bold, ukuran 24–32px, gunakan `otim-ink` atau `otim-red-dark`.
- Hindari uppercase untuk kalimat panjang; gunakan uppercase hanya untuk eyebrow atau label pendek.

### Layout, spacing, and shape

- Gunakan background `otim-surface` untuk halaman dan white untuk card.
- Card memakai `rounded-2xl` dengan border tipis dan shadow lembut.
- Input, select, badge, dan button memakai `rounded-lg` atau `rounded-xl` secara konsisten.
- Gunakan spacing Tailwind berbasis 4px; section utama memakai jarak 24–32px.
- Dashboard desktop memakai sidebar dan content area; mobile memakai layout satu kolom.
- Hindari border/shadow berlebihan dan jangan menggunakan glassmorphism.
- Sediakan whitespace yang cukup di sekitar emblem agar logo tidak terlihat sesak.

### Logo usage

- Gunakan `/img.png` dengan `object-contain`, bukan `object-cover`.
- Jangan crop, stretch, rotate, recolor, atau memberi filter pada logo.
- Gunakan background putih atau surface terang saat menampilkan logo penuh.
- Pada sidebar gelap, berikan container putih kecil jika emblem tidak terbaca dengan baik.
- Ukuran minimum emblem untuk UI utama adalah 32px; gunakan ukuran lebih besar untuk login/brand header.

### Component states

- Default: surface putih, border `otim-border`, teks `otim-ink`.
- Hover: border atau background bergerak menuju `otim-red` secara halus.
- Focus: gunakan ring merah dengan opacity rendah dan tetap terlihat keyboard.
- Active: background `otim-red`, teks putih.
- Disabled: opacity rendah, cursor not-allowed, tanpa perubahan layout.
- Loading: gunakan skeleton atau spinner shadcn, bukan teks yang melompat-lompat.
- Empty/error/success state harus memiliki pesan yang jelas dan action berikutnya.

## Frontend rules

- Gunakan Server Components secara default.
- Gunakan Client Components hanya untuk form, interaksi, dan state browser.
- Semua halaman frontend berada di `app/`.
- Gunakan logo dari `/img.png` dengan `object-contain` dan ruang aman di sekelilingnya.
- API route tetap tipis di `app/api/route.ts`.
- Logika bisnis tidak boleh ditulis di page atau route; letakkan di `src/modules/`.
- Gunakan semantic HTML, label form yang jelas, dan focus state yang terlihat.
- Sediakan loading, error, empty, dan success state.
- Layout harus responsive mulai dari mobile sampai desktop.
- Jangan menambahkan library UI baru sebelum benar-benar diperlukan.
- Gunakan shadcn/ui sebagai sumber komponen UI utama.
- Tambahkan komponen menggunakan CLI terbaru, misalnya `bunx shadcn@latest add button card table input dialog select tabs badge`.
- Komponen hasil generate diletakkan di `app/_components/ui` atau lokasi yang ditetapkan konfigurasi shadcn.
- Komponen shadcn boleh dikustomisasi agar mengikuti identitas OTIM, tetapi tetap mempertahankan aksesibilitas dan API yang konsisten.
- Gunakan komponen shadcn untuk button, card, input, select, tabs, table, badge, dialog, dropdown, dan toast sebelum membuat primitive sendiri.
- Jangan mencampur komponen UI library lain tanpa alasan teknis yang jelas.

## Login page requirements

- Tampilkan logo dan nama aplikasi.
- Field email/username dan password.
- Tombol login dengan state loading.
- Pesan error yang mudah dipahami.
- Link lupa password dapat berupa placeholder untuk tahap berikutnya.
- Jangan menyimpan password atau token di localStorage.

## Navigation requirements

Sidebar atau top navigation OTIM memiliki menu berikut:

- `Home` untuk ringkasan operasional OTIM.
- `Point of Sale` untuk membuat transaksi retail, seluler, dan FnB.
- `Transaksi` untuk memantau transaksi dan refund.
- `Produk` untuk mengelola katalog barang, menu, dan layanan.
- `Inventori` untuk memantau stok barang serta bahan baku.
- `Pelanggan` untuk mengelola customer dan membership.
- `Laporan` untuk melihat performa berdasarkan unit bisnis.
- `User Access` untuk pengelolaan user, role, dan ACL.

## Home requirements

- Ringkasan penjualan hari ini.
- Jumlah transaksi.
- Produk terlaris.
- Stok menipis.
- Aktivitas transaksi terbaru.
- Ringkasan dapat dibedakan berdasarkan retail, seluler, dan FnB.

## Business module requirements

- Point of Sale harus mendukung konteks retail, seluler, dan FnB.
- Produk harus dapat merepresentasikan barang fisik, menu FnB, dan layanan atau paket seluler.
- Inventori harus mendukung stok barang retail dan bahan baku FnB.
- Laporan harus dapat dikelompokkan berdasarkan unit bisnis.
- Data awal menggunakan mock data dengan bentuk yang siap diganti API.

## User Access requirements

- Sediakan tampilan `Add User`.
- Sediakan tampilan `Add Role`.
- Sediakan tampilan untuk mengatur ACL pada role.
- Sediakan tampilan untuk menetapkan role pada user.
- Gunakan tab, segmented navigation, atau sub-navigation yang jelas.
- Tampilkan state empty, loading, success, dan error pada setiap form.
- ACL harus divisualisasikan sebagai daftar permission yang dapat dipilih per role.
- Role pada user harus divisualisasikan sebagai daftar user dan role yang dimilikinya.
- Data user, role, permission, dan assignment masih menggunakan mock data lokal.

## Quality bar

- `bunx tsc --noEmit` harus berhasil.
- `bun run lint` harus berhasil.
- Tidak ada horizontal overflow pada mobile.
- Keyboard navigation dan contrast harus layak digunakan.
- Komponen reusable diletakkan di `app/_components` atau `src/shared` sesuai tanggung jawabnya.
