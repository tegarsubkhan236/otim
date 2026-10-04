<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# OTIM project instructions

`PREPARE.md` adalah sumber rencana fitur, workflow bisnis, struktur menu, dan target route proyek OTIM. Baca dokumen tersebut sebelum mengubah halaman atau menu yang berkaitan dengan business context.

Aturan implementasi proyek:

- Implementasi frontend dilakukan di `app/` menggunakan data dummy lokal.
- Jangan mengubah `src/`, membuat repository/service/handler baru, atau menghubungkan database/API tanpa permintaan eksplisit.
- Gunakan shadcn/ui, Tailwind, token visual OTIM, dan asset pada `public/`.
- Business context default adalah Selular dan disimpan pada session dummy dengan key `otim-active-business`.
- Route business Selular menggunakan prefix `/div_celular`; route business Retail menggunakan prefix `/div_retail`.
- Route shared menggunakan root `/payments/*`, `/reports`, dan `/user-access`.
- Sidebar Retail saat ini hanya menampilkan `Retail Home`, `Payments`, `Reports`, dan `User Access`. Sidebar Selular tetap menampilkan menu operasional Selular.
- Dashboard Selular menggunakan tampilan dashboard normal. Dashboard Retail menggunakan halaman `Still Thinking` sampai fitur Retail dikerjakan.
- Setelah perubahan, jalankan `bunx next typegen`, `bunx tsc --noEmit`, dan `bun run lint`.

Jika instruksi teknis di file ini berbeda dengan rencana fitur di `PREPARE.md`, pertahankan instruksi keselamatan dan framework dari `AGENTS.md`, lalu sesuaikan implementasi dengan bagian terbaru yang relevan di `PREPARE.md`.
