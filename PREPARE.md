# Preparation Plan: OTIM Cellular Inventory

> Dokumen ini adalah sumber rencana produk dan workflow bisnis. Aturan eksekusi teknis berada di [`AGENTS.md`](./AGENTS.md), termasuk batasan perubahan folder, prefix route, dan perintah validasi.

## Fokus bisnis

Fase ini menyiapkan OTIM sebagai platform multi-business. Context bisnis dipilih melalui dropdown di sisi kiri navbar dan default ke `Selular`.

```text
Purchase Order → Supplier → Receiving → Warehouse
                                      ├→ Outlet
                                      └→ Sales → Penjualan
```

Implementasi hanya frontend di `app/` dengan data dummy lokal.

- Jangan mengubah folder `src/`.
- Jangan membuat repository, service, atau handler baru.
- Jangan menghubungkan database atau API backend.
- Gunakan `public/img.png`, shadcn/ui, dan token visual OTIM.
- Context bisnis harus tersimpan selama sesi dan dapat diganti tanpa logout.
- Data dan menu business-specific mengikuti context aktif; data shared tetap dapat digunakan oleh semua business.
- Fase retail/swalayan ditambahkan tanpa menghilangkan workflow selular yang sudah ada.

## Struktur target

```text
app/
├── (auth)/login/page.tsx
├── (dashboard)/
│   ├── layout.tsx
│   ├── div_celular/dashboard/page.tsx
│   ├── div_retail/dashboard/page.tsx
│   ├── inventory/page.tsx
│   ├── inventory/purchase-orders/page.tsx
│   ├── inventory/purchase-orders/outstanding/page.tsx
│   ├── inventory/suppliers/page.tsx
│   ├── inventory/receipts/page.tsx
│   ├── inventory/warehouse/page.tsx
│   ├── inventory/distribution/page.tsx
│   ├── inventory/outlets/page.tsx
│   ├── sales/page.tsx
│   ├── reports/page.tsx
│   └── user-access/page.tsx
├── _components/
│   ├── inventory-nav.tsx
│   ├── purchase-order-form.tsx
│   ├── receiving-form.tsx
│   ├── stock-transfer-form.tsx
│   ├── stock-allocation-form.tsx
│   └── data-table.tsx
└── _data/
    └── cellular-dummy-data.ts
```

## Menu aplikasi

### Business selector

- Letakkan dropdown business di sisi kiri navbar/dashboard shell.
- Pilihan: `Selular` dan `Retail / Swalayan`.
- Default saat pertama masuk: `Selular`.
- Simpan pilihan pada state/session dummy dengan key `otim-active-business`.
- Saat business berubah, sidebar menampilkan menu khusus business tersebut.
- Context selector tidak mengubah user session, permission, atau data shared.

### Menu shared antar business

- `Home`: dashboard mengikuti business aktif, dengan widget shared jika datanya tersedia.
- `Payments`: dropdown Payment Transactions, Income, Expenses, Cashflow, Refunds, dan Reconciliation.
- `Reports`: report inventory, sales, payment, cashflow, dan business aktif; hanya menu ini yang memiliki export.
- `User Access`: user, role, ACL, role assignment, dan business scope permission.

### Menu business Selular

- `Master`: Products, Suppliers, Warehouse, Sales, dan Outlets.
- `Inventory`: Purchase Orders, Receiving, Distribution, dan Mutasi Stok.
- `Sales Order`: order penjualan dari stok Sales atau Outlet.

### Menu business Retail / Swalayan

- `Master`: Products, Categories, Brands, Units, Suppliers, Customers, Warehouses, dan Outlets.
- `Inventory`: Purchase Orders, Receiving, Stock Opname, Stock Adjustment, Transfers, dan Inventory Ledger.
- `Sales`: POS Transactions, Sales Returns, Exchange, dan Shift Closing.
- `Promotions`: Discount, Bundling, Buy X Get Y, Member Price, dan Voucher.
- `Purchasing`: Supplier Orders, Receiving, Purchase Invoice, dan Outstanding Supplier.
- `Customers`: Customer, Member, Loyalty Point, dan Customer Tier.

Menu business-specific tidak boleh muncul ketika context business lain aktif, kecuali user memiliki mode all-business yang eksplisit.

### Kondisi UI saat ini

- Sidebar Selular menampilkan menu operasional Selular serta menu shared `Payments`, `Reports`, dan `User Access`.
- Sidebar Retail untuk sementara hanya menampilkan `Retail Home` serta menu shared `Payments`, `Reports`, dan `User Access`.
- `Selular Home` menggunakan dashboard normal dari data dummy.
- `Retail Home` menggunakan halaman `Still Thinking` sampai modul Retail mulai dikerjakan.

## Dummy data

Buat `app/_data/cellular-dummy-data.ts` dengan type untuk:

- `suppliers`: supplier, PIC, kontak, status, dan alamat.
- `purchaseOrders`: nomor PO, supplier, tanggal, expected arrival, status, dan total.
- `purchaseOrderItems`: SKU, device/SIM/accessory, quantity, harga, dan serial tracking.
- `purchaseOrderSerialNumbers`: daftar SN/IMEI/ICCID yang direncanakan pada setiap PO item.
- `warehouseReceipts`: nomor penerimaan, PO, file/list SN aktual, quantity aktual, dan status pemeriksaan.
- `outstandingPurchaseOrders`: PO item yang jumlah SN diterima masih kurang dari jumlah SN yang direncanakan.
- `warehouseStock`: SKU, IMEI/serial, ICCID jika relevan, lokasi rak, dan status.
- `outlets`: kode, nama, alamat, dan status outlet.
- `stockTransfers`: warehouse, outlet, item, quantity, tanggal, dan status.
- `salesAllocations`: sales, outlet, item, quantity, dan status.
- `cellularSales`: transaksi, sales, item, customer, total, dan tanggal.

## Workflow halaman

### Purchase Orders `/inventory/purchase-orders`

- Status: Draft, Submitted, Approved, Sent, Partially Received, Completed.
- Required: supplier, tanggal PO, expected arrival, minimal satu item, quantity, dan upload daftar SN untuk item yang membutuhkan serial tracking.
- Optional: catatan, nomor referensi supplier, diskon, dan attachment placeholder.
- Upload SN harus mendukung file CSV atau input list serial number.
- Setiap SN harus unik dalam satu PO dan terhubung ke SKU/item terkait.
- Tampilkan jumlah SN yang di-upload dan validasi duplikat atau format invalid.
- Action dummy: create, submit, approve, dan cancel.

### Suppliers `/master/suppliers`

- Form tambah supplier seluler.
- Required: nama supplier, PIC, nomor kontak, dan alamat.
- Optional: email, NPWP, payment term, dan catatan.
- Sediakan search dan filter status supplier.

### Receiving `/inventory/receipts`

- Pilih PO berstatus Approved atau Sent.
- Upload kembali SN aktual yang diterima untuk PO tersebut.
- Sistem harus mencocokkan SN receiving dengan daftar SN pada PO.
- Required: nomor penerimaan, tanggal terima, item, dan file/list SN aktual.
- Optional: surat jalan, catatan pemeriksaan, dan attachment placeholder.
- Device mendukung IMEI/serial; SIM mendukung ICCID atau nomor kartu.
- SN yang tidak terdaftar di PO harus ditandai sebagai unmatched dan tidak langsung masuk stok available.
- SN duplikat, invalid, atau sudah pernah diterima harus masuk error list untuk diperbaiki.
- Jika jumlah SN receiving sama dengan jumlah SN PO dan seluruh SN cocok, status menjadi `Full Received`.
- Jika jumlah SN receiving lebih sedikit tetapi seluruh SN yang di-upload cocok, status menjadi `Partial Received`.
- Status receiving: Pending Check, Full Received, Partial Received, dan Rejected.

### Warehouse `/master/warehouse`

- Tampilkan stok yang sudah diterima dan lolos pemeriksaan.
- Search berdasarkan SKU, IMEI, serial, ICCID, dan status.
- Status stok: Available, Reserved, Damaged, In Transit, dan Sold.
- Tampilkan warehouse dan lokasi rak.
- Hanya SN yang cocok dan diterima yang boleh masuk ke stok warehouse.

### Outstanding PO di Purchase Orders `/inventory/purchase-orders`

- Tampilkan PO yang statusnya `Partial Received`.
- Tampilkan item dan daftar SN yang masih outstanding.
- Outstanding dihitung dari SN yang ada di PO tetapi belum ada di receiving yang valid.
- Sediakan action dummy untuk menerima sisa SN pada receiving berikutnya.
- PO berubah menjadi `Completed` setelah seluruh SN yang direncanakan sudah diterima dan cocok.

### Distribution `/inventory/distribution`

- Transfer stok langsung dari warehouse ke outlet atau sales.
- Required: warehouse asal, tujuan distribusi (outlet atau sales), item, quantity, dan tanggal kirim.
- Optional: dokumen pengiriman, kurir, dan catatan.
- Status: Draft, Requested, Approved, In Transit, Received, dan Cancelled.
- Stok warehouse berkurang saat transfer berstatus In Transit.

### Mutasi stok antar pemegang `/inventory/distribution/mutations`

Tambahkan alur koreksi ketika warehouse salah mengirim atau salah memilih tujuan distribusi. Mutasi hanya boleh dilakukan untuk stok yang sudah berstatus `Received` pada lokasi asal dan wajib menggunakan daftar SN/IMEI/ICCID yang aktual.

- Jenis mutasi yang didukung:
  - Sales ke Sales.
  - Sales ke Outlet.
  - Outlet ke Outlet.
- Required: lokasi asal, tipe tujuan, lokasi tujuan, minimal satu SN/IMEI/ICCID, tanggal mutasi, dan alasan mutasi.
- Optional: nomor referensi distribusi awal, dokumen serah terima, catatan, dan attachment placeholder.
- Tampilkan detail item berdasarkan SN yang dipilih: SKU, nama item, serial, lokasi saat ini, dan status stok.
- Validasi lokasi asal tidak boleh sama dengan lokasi tujuan.
- Validasi SN harus benar-benar berada di lokasi asal, tidak berstatus Sold, Damaged, atau In Transit, dan belum dipakai pada mutasi aktif.
- Untuk mutasi Sales ke Outlet, stok sales berkurang dan stok outlet bertambah setelah mutasi dikonfirmasi.
- Untuk mutasi Sales ke Sales atau Outlet ke Outlet, stok lokasi asal berkurang dan stok lokasi tujuan bertambah setelah mutasi dikonfirmasi.
- Status mutasi: Draft, Requested, Approved, In Transit, Received, Rejected, dan Cancelled.
- Saat status `In Transit`, SN berstatus `In Transit` dan tidak boleh dijual atau dimutasi kembali.
- Saat status `Received`, kepemilikan/lokasi SN berpindah ke tujuan dan histori lokasi diperbarui.
- Jika mutasi dibatalkan sebelum `Received`, SN dikembalikan ke lokasi asal.
- Jika terdapat SN yang salah, user dapat menolak penerimaan dan membuat mutasi koreksi baru; data histori mutasi sebelumnya tetap tersimpan.
- Sediakan pencarian berdasarkan nomor mutasi, SN/IMEI/ICCID, lokasi asal, lokasi tujuan, status, dan tanggal.
- Sediakan action dummy: create, submit, approve, reject, confirm received, dan cancel.

### Audit dan histori mutasi

- Setiap mutasi menyimpan nomor mutasi, referensi distribusi awal, pembuat, approver, penerima, waktu setiap perubahan status, alasan, dan daftar SN.
- Tampilkan timeline perpindahan SN dari `Warehouse -> Sales/Outlet -> Sales/Outlet`.
- Laporan mutasi hanya dapat di-preview dan di-export melalui menu Reports.

### Outlets `/master/outlets`

- Tampilkan stok per outlet, kebutuhan restock, dan transfer berjalan.
- Filter outlet, SKU, kategori, dan status stok.
- Outlet menerima stok langsung dari warehouse melalui konfirmasi transfer.
- Sediakan daftar mutasi masuk dan keluar outlet, termasuk mutasi Outlet ke Outlet.

### Sales Master `/master/sales`

- Tampilkan stok yang dialokasikan langsung dari warehouse ke sales.
- Required: sales, warehouse asal, item, quantity, dan tanggal alokasi.
- Optional: catatan dan target penjualan.
- Penjualan dummy mengubah status stok menjadi Sold.
- Detail device wajib menampilkan IMEI/serial.
- Sediakan daftar mutasi masuk dan keluar sales, termasuk mutasi Sales ke Sales dan Sales ke Outlet.

## Dashboard Home per Business

Tampilkan ringkasan PO menunggu approval, PO dalam pengiriman, receiving hari ini, stok warehouse, transfer ke outlet, transfer ke sales, dan penjualan seluler.

## Reports `/reports`

- Dropdown report type: Purchase Order, Receiving, Warehouse Stock, Outlet Stock, Sales Allocation, Stock Mutation, dan Cellular Sales.
- Setelah report dipilih, tampilkan input yang sesuai.
- Required ditandai `*`; optional diberi label `Opsional`.
- Preview menggunakan data dummy.
- Export hanya tersedia di Reports.

## Verification

- Sidebar memiliki Home, Master dropdown, Inventory dropdown, Sales Order, Reports, dan User Access.
- Alur PO → supplier → receiving → warehouse dapat ditelusuri.
- PO dapat menyimpan upload daftar SN/IMEI/ICCID.
- Receiving dapat meng-upload SN aktual dan mencocokkannya dengan SN pada PO.
- Receiving dapat menghasilkan status Full Received atau Partial Received.
- Kekurangan SN otomatis masuk ke Outstanding PO.
- SN unmatched, duplikat, invalid, atau sudah diterima tampil dalam error list.
- Warehouse dapat membagikan stok langsung ke outlet dan sales melalui dua jalur distribusi.
- Warehouse dapat memperbaiki salah distribusi melalui mutasi Sales ke Sales, Sales ke Outlet, dan Outlet ke Outlet.
- Mutasi menggunakan SN/IMEI/ICCID, memiliki status In Transit dan Received, serta menyimpan audit trail.
- SN yang sedang In Transit tidak dapat dijual atau dimutasi kembali.
- Device mendukung IMEI/serial, SIM mendukung ICCID.
- Search, filter, required field, dan optional field tampil jelas.
- Tidak ada file di `src/` yang diubah.
- Jalankan `bunx tsc --noEmit` dan `bun run lint`.

## Ditunda

- API/database inventory.
- Integrasi supplier eksternal.
- Barcode/IMEI scanner nyata.
- Approval server-side dan audit log production.
- Stock reservation real-time.
- Integrasi payment dan accounting.

## Penyesuaian menu dan Sales Order

Penyesuaian ini menggantikan struktur menu Sales sebelumnya:

- `Inventory` menjadi dropdown dengan submenu Purchase Orders, Receiving, Distribution, dan Mutasi Stok.
- `Master` menjadi dropdown dengan submenu Products, Suppliers, Warehouse, Sales, dan Outlets.
- Menu top-level `Sales` dihapus dari navigasi utama. Stok per sales tersedia di `/master/sales`.
- Tambahkan menu top-level `Sales Order` di `/sales-orders`.
- `Sales Order` digunakan untuk penjualan dari stok Sales atau Outlet, bukan untuk distribusi warehouse.

### Sales Master `/master/sales`

- Tampilkan stok aktif yang dimiliki setiap sales dan histori alokasi dari warehouse.
- Detail device wajib menampilkan IMEI/serial; SIM wajib menampilkan ICCID jika tersedia.
- Penjualan tidak dibuat dari halaman ini. Proses penjualan dilakukan melalui menu Sales Order.
- Tetap tampilkan mutasi masuk dan keluar sales, termasuk Sales ke Sales dan Sales ke Outlet.

### Sales Order `/sales-orders`

- Buat order untuk device, SIM, atau aksesori seluler.
- Required: nomor order, tanggal order, sumber stok (`Sales` atau `Outlet`), pemilik stok, customer, item, dan upload daftar SN/IMEI/ICCID.
- Optional: nomor invoice, sales representative, metode pembayaran, diskon, catatan, dan attachment placeholder.
- Upload SN mendukung CSV/TXT atau input list serial number manual.
- Setiap SN harus unik, terdaftar pada item, dan berstatus `Available` di sumber stok yang dipilih.
- Tolak SN yang tidak ditemukan, duplikat, `Sold`, `Damaged`, `In Transit`, atau berada di Sales/Outlet lain.
- Satu order tidak boleh mencampur sumber stok Sales dan Outlet tanpa pemisahan line item.
- Saat order `Confirmed`, stok sumber berkurang berdasarkan SN valid dan status SN berubah menjadi `Sold`.
- Jika hanya sebagian SN valid, order tidak boleh dikonfirmasi; tampilkan error list untuk diperbaiki.
- Status: Draft, Submitted, Confirmed, Partially Validated, Completed, Cancelled, dan Rejected.
- Sediakan preview order, validasi SN, serta action dummy create, upload, validate, submit, confirm, complete, dan cancel.
- Simpan audit trail user, waktu, sumber stok, daftar SN, dan perubahan status.

### Dummy data tambahan

- `salesOrders`: nomor order, sumber stok Sales/Outlet, customer, item, daftar SN, total, tanggal, dan status.
- `salesStock`: pemilik sales, item, daftar SN/IMEI/ICCID, quantity, dan status.
- `outletStock`: outlet, item, daftar SN/IMEI/ICCID, quantity, dan status.
- `products`: SKU, nama, kategori, tipe serial tracking, HPP aktif, dan status.
- `productCosts`: histori HPP, sumber biaya, tanggal berlaku, dan approval.
- `sellingPrices`: harga jual berdasarkan channel, outlet, sales, customer segment, periode berlaku, dan status.
- `priceRules`: aturan harga dinamis, prioritas rule, diskon, markup, dan batas margin minimum.
- `payments`: order, metode pembayaran, amount, reference, status, paid at, dan settlement status.
- `cashEntries`: pemasukan/pengeluaran, kategori, sumber, amount, tanggal, status approval, dan attachment.
- `expenseCategories`: kategori biaya, account code, budget, dan status aktif.
- `businesses`: business id, name, code (`cellular` atau `retail`), dan status aktif.
- `retailProducts`: barcode, SKU, kategori, unit, batch/expiry tracking, HPP, harga jual, dan status.
- `retailInventory`: outlet/gudang, SKU, quantity system, quantity physical, reserved, dan available.
- `retailPromotions`: tipe promo, rule, periode, outlet scope, minimum quantity, dan status.
- `posTransactions`: outlet, cashier, shift, item, quantity, price snapshot, payment, total, dan status.
- `shiftClosings`: outlet, cashier, opening cash, expected cash, actual cash, variance, dan approval status.

### Reports tambahan

- Tambahkan `Sales Order` pada dropdown report.
- Parameter required: periode tanggal. Parameter optional: sumber stok, sales/outlet, customer, SN, dan status order.
- Preview dan export tetap hanya tersedia pada menu Reports.

### Verification tambahan

- Sidebar menampilkan Home, Master dropdown, Inventory dropdown, Sales Order, Payments, Reports, dan User Access.
- Sales berada di submenu Master pada route `/master/sales`.
- Outlets berada di submenu Master pada route `/master/outlets`.
- Inventory tidak memiliki submenu Overview; halaman overview tidak ditampilkan sebagai menu.
- Payments tampil sebagai dropdown dengan submenu Payment Transactions, Income, Expenses, Cashflow, Refunds, dan Reconciliation.
- Setiap submenu Payments memakai relasi dan histori transaksi yang konsisten tanpa menghapus data sumber.
- Sales Order dapat menggunakan stok Sales maupun Outlet sebagai sumber.
- Upload SN tervalidasi sebelum order dikonfirmasi.
- SN valid mengurangi stok sumber dan berubah menjadi `Sold` setelah konfirmasi.
- SN invalid, duplikat, atau dari lokasi lain tidak mengurangi stok.

## Product, Pricing, dan Payment

### Products dan Pricing `/master/products`

- Product adalah master item yang dipakai oleh Purchase Order, Warehouse, Distribution, Sales Order, dan Reports.
- Required: SKU unik, nama produk, kategori (`Device`, `SIM`, atau `Accessory`), unit, dan status aktif/nonaktif.
- Untuk item serial tracking, required tipe identifier (`IMEI`, `Serial`, atau `ICCID`) dan aturan wajib upload serial.
- Optional: brand, model, barcode, deskripsi, supplier utama, dan attachment placeholder.
- Product yang sudah dipakai pada transaksi tidak boleh dihapus; gunakan status `Inactive`.

#### HPP

- HPP disimpan sebagai histori, bukan angka yang ditimpa.
- Required: SKU, nilai HPP, tanggal mulai berlaku, sumber biaya, dan user pembuat.
- Sumber biaya dapat berupa harga PO, freight, import, bundling, atau adjustment manual.
- HPP aktif dipilih berdasarkan tanggal transaksi dan status approval.
- HPP yang sudah dipakai transaksi tidak boleh diubah; buat versi HPP baru dengan effective date baru.
- HPP harus memiliki satuan dan mata uang yang jelas.
- Status HPP: Draft, Pending Approval, Approved, Rejected, dan Expired.
- HPP yang dipakai Sales Order disimpan sebagai snapshot untuk perhitungan margin dan audit.

#### Harga jual dinamis

- Harga jual dihitung dari price list dan rule aktif, bukan satu harga permanen.
- Faktor harga dapat meliputi SKU, channel (`Outlet`, `Sales`, atau direct), outlet, sales, customer segment, periode, promo, quantity, dan metode pembayaran.
- Setiap rule memiliki prioritas. Rule paling spesifik menang, lalu fallback ke price list default.
- Required: SKU, harga atau formula harga, channel, tanggal mulai berlaku, dan status.
- Optional: outlet/sales tertentu, customer segment, tanggal berakhir, minimum quantity, diskon, markup, dan campaign.
- Harga tidak boleh menghasilkan margin di bawah `minimum margin` kecuali user memiliki permission override.
- Perubahan harga menyimpan alasan, pembuat, waktu perubahan, approval, dan histori versi.
- Status price list/rule: Draft, Pending Approval, Active, Scheduled, Expired, dan Cancelled.
- Sebelum order dibuat, sistem menampilkan HPP aktif, harga dasar, diskon/promo, pajak jika ada, harga final, margin nominal, dan margin persentase.
- Saat Sales Order dikonfirmasi, simpan snapshot HPP, rule harga, diskon, dan harga final. Perubahan master harga tidak mengubah order lama.
- Harga dapat di-preview berdasarkan tanggal, channel, outlet/sales, customer, dan SKU.

### Payments `/payments`

- Payment terhubung ke Sales Order dan memakai total final dari snapshot order; payment tidak menghitung ulang harga.
- Modul Payment juga menjadi modul Cashflow untuk mencatat seluruh pemasukan dan pengeluaran OTIM.
- Pemasukan dapat berasal dari payment Sales Order, pelunasan piutang, refund supplier, dan income lain.
- Pengeluaran dapat berasal dari pembayaran supplier/PO, freight, import, biaya operasional outlet, biaya warehouse, komisi sales, refund customer, dan expense lain.
- Setiap pemasukan atau pengeluaran wajib memiliki tipe `Income` atau `Expense`.
- Status Sales Order dan payment dipisahkan. Order dapat `Confirmed` sementara payment masih `Pending`.
- Required: nomor order, amount, metode pembayaran, tanggal payment, dan status.
- Optional: provider, reference number, proof of payment, bank account, terminal, dan catatan.
- Metode dummy: Cash, Bank Transfer, QRIS, E-Wallet, Card, dan Credit/Tempo.
- Status payment: Pending, Authorized, Paid, Partially Paid, Failed, Expired, Refunded, dan Cancelled.
- Status settlement: Unsettled, Settled, Settlement Failed, dan Reconciled.
- Pembayaran penuh harus sama dengan outstanding amount order.
- Pembayaran partial menyimpan amount paid, remaining balance, dan histori payment attempt.
- Payment tidak mengurangi stok secara langsung. Stok berkurang ketika Sales Order memenuhi aturan konfirmasi bisnis.
- Untuk cash-before-delivery, order hanya boleh `Completed` setelah payment `Paid` atau `Settled` sesuai rule channel.
- Untuk Credit/Tempo, order dapat selesai dengan payment `Pending`, tetapi wajib membuat receivable dan due date.
- Payment gagal atau expired tidak menghapus order dan tidak mengubah snapshot harga.
- Refund penuh atau sebagian membuat record baru yang mereferensikan payment asli; histori payment asli tidak diubah.
- Refund menyimpan alasan, amount, approver, waktu, dan status refund.
- Setiap payment menyimpan audit trail perubahan status dan reference provider.

#### Struktur submenu Payments

- `Payment Transactions` `/payments/transactions`: daftar pembayaran dari Sales Order, status payment, metode, provider, reference, dan settlement.
- `Income` `/payments/income`: pencatatan pemasukan dari Sales Order, pelunasan piutang, refund supplier, dan income lain.
- `Expenses` `/payments/expenses`: pencatatan pengeluaran supplier, PO, freight, import, outlet, warehouse, komisi, dan biaya operasional.
- `Cashflow` `/payments/cashflow`: ringkasan saldo awal, pemasukan, pengeluaran, saldo akhir, dan net cashflow berdasarkan periode.
- `Refunds` `/payments/refunds`: pengajuan dan monitoring refund customer atau reversal payment.
- `Reconciliation` `/payments/reconciliation`: pencocokan payment, income, expense, settlement, account, reference, dan bukti transaksi.

Semua submenu menggunakan data dummy yang sama dan saling terhubung melalui `orderId`, `paymentId`, `reference`, `account`, dan tanggal transaksi.

#### Aturan pemisahan submenu

- `Payment Transactions` hanya menangani penerimaan pembayaran dan status settlement.
- `Income` hanya menangani arus kas masuk selain detail teknis payment provider.
- `Expenses` hanya menangani arus kas keluar, approval, vendor, kategori, dan budget.
- `Cashflow` bersifat agregasi dan tidak menjadi tempat mengedit transaksi sumber.
- `Refunds` membuat transaksi reversal/refund baru dan tidak mengubah histori payment asli.
- `Reconciliation` hanya mengubah status rekonsiliasi atau membuat adjustment/reversal; data sumber tetap immutable.
- Export seluruh data Payment hanya tersedia melalui Reports.

#### Pemasukan

- Required: tipe income, tanggal transaksi, kategori income, amount, metode penerimaan, dan account tujuan.
- Optional: nomor order, customer, sales/outlet, reference, catatan, dan attachment bukti pembayaran.
- Income dari Sales Order harus mereferensikan order, snapshot harga, customer, dan sumber stok.
- Pelunasan partial payment membuat entry pemasukan sesuai amount yang diterima, bukan total order.
- Income status: Draft, Pending Approval, Approved, Received, Reversed, dan Cancelled.

#### Pengeluaran

- Required: tipe expense, tanggal transaksi, kategori biaya, amount, account sumber, dan penerima/vendor.
- Optional: nomor PO, supplier, outlet/warehouse, reference invoice, due date, catatan, dan attachment bukti pengeluaran.
- Pengeluaran supplier dapat direferensikan ke PO dan receiving; amount actual boleh berbeda dari nilai PO dengan alasan adjustment.
- Expense mendukung kategori freight, import, warehouse, outlet, komisi, payroll placeholder, marketing, utilities, dan miscellaneous.
- Expense status: Draft, Pending Approval, Approved, Paid, Partially Paid, Rejected, Reversed, dan Cancelled.
- Pengeluaran di atas limit tertentu membutuhkan approval tambahan.
- Expense yang sudah `Paid` tidak boleh diedit; koreksi dilakukan dengan reversal atau adjustment baru.

#### Cashflow dan saldo

- Tampilkan saldo awal, total pemasukan, total pengeluaran, saldo akhir, dan net cashflow per periode.
- Filter berdasarkan periode, account, tipe Income/Expense, kategori, outlet, sales, supplier, status, dan reference.
- Tampilkan cashflow harian, mingguan, bulanan, serta per unit bisnis jika diperlukan.
- Saldo akhir dihitung: `saldo awal + pemasukan diterima - pengeluaran dibayar`.
- Payment `Pending`, expense `Pending Approval`, dan transaksi `Unsettled` tidak dihitung sebagai saldo realisasi.
- Tampilkan outstanding receivable, outstanding payable, income, expense, dan net cashflow.
- Rekonsiliasi mencocokkan account, reference, amount, tanggal, dan bukti transaksi.
- Koreksi rekonsiliasi dilakukan melalui adjustment/reversal baru dan tidak menghapus histori.

#### Rekonsiliasi payment

- Tampilkan payment yang belum settled, gagal, duplicate reference, amount tidak sesuai order, serta income/expense yang belum direkonsiliasi.
- Rekonsiliasi mencocokkan nomor order, payment reference, amount, tanggal, dan provider.
- Payment `Reconciled` tidak boleh diedit; koreksi dilakukan melalui adjustment atau reversal baru.
- Sediakan filter periode, metode, provider, status payment, status settlement, tipe Income/Expense, kategori, outlet, sales, supplier, dan customer.
- Export payment, cashflow, income, expense, dan rekonsiliasi hanya tersedia dari menu Reports.

### Penyesuaian menu terbaru

- `Master` berada di atas `Inventory` dan berisi Products, Suppliers, Warehouse, Sales, dan Outlets.
- `Inventory` hanya berisi Purchase Orders, Receiving, Distribution, dan Mutasi Stok.
- `Sales Order` tetap menjadi menu utama untuk membuat order penjualan.
- Tambahkan `Payments` sebagai dropdown menu utama dengan submenu Payment Transactions, Income, Expenses, Cashflow, Refunds, dan Reconciliation.

## Business context dan retail workflow

### Business context `/div_celular/dashboard` dan `/div_retail/dashboard`

- Navbar kiri menampilkan selector `Selular` atau `Retail / Swalayan` sebelum konten user/profile.
- Context `Selular` aktif secara default.
- Setelah memilih `Retail / Swalayan`, sidebar dan dashboard berubah ke menu retail tanpa reload penuh jika memungkinkan.
- URL, breadcrumb, title, empty state, dan data dummy harus menampilkan business aktif.
- Business context menjadi filter wajib untuk data business-specific.
- Data shared seperti User Access, Payments, dan Reports dapat membaca business aktif atau seluruh business sesuai permission.
- Jika user tidak memiliki akses ke business tertentu, pilihan tersebut disabled atau tidak ditampilkan.

### Retail Master

#### Products `/div_retail/master/products`

- Required: SKU/barcode unik, nama produk, kategori, unit, tax class, HPP, harga jual, dan status aktif.
- Product retail tidak selalu serial-tracked; dukung inventory berbasis quantity, batch, expiry, barcode, dan optionally serial.
- Simpan price list per outlet, customer tier, promo, effective date, HPP histori, dan minimum margin.

#### Suppliers `/div_retail/master/suppliers`

- Simpan supplier, PIC, lead time, payment term, kategori produk, minimum order, dan status.
- Supplier dapat digunakan oleh Purchase Order retail dan expense supplier pada Payments.

#### Outlets, Warehouses, Categories, Brands, Units

- Sediakan master outlet/toko, gudang, kategori, brand, unit, dan tax class.
- Outlet memiliki price list, stock location, operating hours, cashier scope, dan status.

### Retail Inventory dan Purchasing

#### Purchase Orders `/div_retail/purchasing/orders`

- Required: supplier, outlet/gudang tujuan, tanggal, item, quantity, harga beli, dan expected arrival.
- Optional: diskon supplier, pajak, freight, nomor invoice, payment term, dan catatan.
- Status: Draft, Submitted, Approved, Sent, Partially Received, Completed, Cancelled.

#### Receiving `/div_retail/inventory/receiving`

- Terima barang berdasarkan PO dengan quantity, batch, expiry date, barcode, dan kondisi barang.
- Partial receiving menghasilkan outstanding quantity pada PO.
- Barang expired, damaged, atau quantity mismatch masuk exception list dan tidak langsung menjadi Available.

#### Stock Opname dan Adjustment

- Stock Opname membandingkan system quantity dengan physical count per outlet/gudang.
- Selisih membutuhkan alasan dan approval sebelum menjadi adjustment.
- Adjustment positif/negatif menyimpan before quantity, after quantity, user, waktu, dan reference.

#### Transfers dan Inventory Ledger

- Transfer antar warehouse/outlet menggunakan status Draft, Requested, Approved, In Transit, Received, dan Cancelled.
- Inventory Ledger mencatat seluruh stock in, stock out, sale, return, adjustment, dan transfer.
- Stok tersedia dihitung dari ledger; transaksi historis tidak boleh dihapus.

### Retail Sales dan POS

#### POS Transactions `/div_retail/sales/transactions`

- Required: outlet, cashier, shift, product, quantity, price snapshot, discount, tax, payment, dan total.
- Mendukung barcode scan placeholder, multiple item, price override dengan permission, hold bill, dan split payment.
- Saat transaksi completed, quantity stok berkurang dan income/payment tercatat pada business retail.
- Sales order retail menyimpan snapshot HPP, harga jual, discount, tax, dan margin.

#### Returns, Exchange, dan Shift Closing

- Return wajib mereferensikan transaksi asli, item, quantity, alasan, kondisi, dan refund method.
- Exchange membuat transaksi pengganti dan menghitung selisih harga.
- Shift Closing mencatat opening cash, cash sales, non-cash sales, expense kas kecil, expected cash, actual cash, dan variance.
- Variance shift membutuhkan alasan dan approval supervisor.

### Retail Promotions dan Customers

- Promotion rule mendukung discount nominal/persen, bundling, Buy X Get Y, member price, voucher, periode, outlet, dan minimum quantity.
- Rule memiliki prioritas dan tidak boleh menurunkan margin di bawah minimum tanpa override permission.
- Customer/member menyimpan tier, point, voucher, histori transaksi, dan consent placeholder.
- Loyalty point hanya bertambah setelah payment/transaction memenuhi status completed.

### Shared Payments pada multi-business

- Setiap payment, income, expense, refund, dan cashflow wajib menyimpan `businessId` atau business scope.
- Sales Order selular dan POS retail menggunakan payment module yang sama tetapi memiliki reference dan workflow berbeda.
- Payment shared tidak boleh mencampur transaksi Selular dan Retail dalam satu ledger tanpa business dimension.
- Cashflow dapat dilihat per business atau consolidated jika user memiliki permission.
- Reports shared wajib memiliki filter business: Selular, Retail / Swalayan, atau All Business.

### Verification multi-business

- Selector business berada di kiri navbar dan default ke Selular.
- Saat memilih Retail / Swalayan, menu Selular seperti Purchase Orders selular, Distribution SN, Sales Allocation, dan Mutasi SN tidak tampil.
- Saat kembali ke Selular, menu retail seperti POS, Promotions, Stock Opname, dan Shift Closing tidak tampil.
- Payments, Reports, dan User Access tetap tersedia pada kedua business.
- Data business-specific selalu terfilter berdasarkan business context.
- Data shared dapat digunakan lintas business sesuai business scope permission.
- Tidak ada perubahan pada folder `src/`.

## Dashboard per business

- Pindahkan dashboard Selular ke `/div_celular/dashboard`.
- Pindahkan dashboard Retail / Swalayan ke `/div_retail/dashboard`.
- Seluruh route khusus Selular berada di bawah `/div_celular`: `/div_celular/master/*`, `/div_celular/inventory/*`, dan `/div_celular/sales-orders`.
- Route shared tetap berada di root: `/payments/*`, `/reports`, dan `/user-access`.
- `app/(dashboard)/layout.tsx` tetap shared untuk autentikasi, navbar, sidebar, business selector, dan responsive drawer.
- Tidak ada lagi route legacy `/dashboard`; pengguna diarahkan ke dashboard sesuai business context yang aktif.
- Sidebar Home mengarah ke dashboard sesuai business context aktif.
- Login default mengarah ke `/div_celular/dashboard`.
- Dashboard Retail menampilkan POS, stok outlet, purchasing, shift kasir, dan restock alert.
- Dashboard Selular menampilkan PO, warehouse, distribusi, Sales Order, payment, dan outstanding SN.
- Sidebar Selular hanya menggunakan link yang diawali `/div_celular`; sidebar Retail hanya menggunakan link yang diawali `/div_retail` untuk menu business-specific.

## Definition of done

- UI fokus pada workflow inventory bisnis seluler OTIM.
- Semua halaman workflow tersedia dengan data dummy.
- Status dan transisi inventory terlihat jelas.
- Master dan Inventory memiliki submenu sesuai alur operasional; Inventory tidak menampilkan Overview atau Outlets.
- Export hanya tersedia di Reports.
- UI menggunakan shadcn/ui, token OTIM, dan logo `/img.png`.
- TypeScript dan ESLint lulus.
