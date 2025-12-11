# BAB IV – PERANCANGAN SISTEM

## 4.1 Arsitektur Aplikasi Front-End

### 4.1.1 Arsitektur Komponen React

Aplikasi GamerZone menggunakan arsitektur berbasis komponen React dengan pendekatan modular dan reusable. Setiap bagian dari antarmuka pengguna dipecah menjadi komponen-komponen kecil yang independen, sehingga memudahkan pengembangan, testing, dan maintenance.

### 4.1.2 Struktur Folder Proyek

```
gamerzone/
├── public/
│   ├── gamezone.png          # Logo aplikasi (untuk hero section)
│   └── vite.svg              # Icon Vite
├── src/
│   ├── assets/               # Gambar dan aset statis
│   │   └── react.svg
│   ├── components/           # Komponen reusable
│   │   ├── Footer.jsx        # Komponen footer dengan info kontak & kategori
│   │   ├── LoadingScreen.jsx # Layar loading dengan animasi gaming
│   │   ├── Navbar.jsx        # Navigasi utama dengan burger menu
│   │   ├── ProductCard.jsx   # Kartu produk untuk grid view
│   │   └── QrisQRCode.jsx    # Generator QR Code QRIS
│   ├── context/              # State management global
│   │   ├── CartContext.jsx   # Context untuk keranjang belanja
│   │   ├── ThemeContext.jsx  # Context untuk dark/light mode
│   │   ├── cartContextStore.js
│   │   ├── useCart.js        # Custom hook untuk cart
│   │   └── useTheme.js       # Custom hook untuk theme
│   ├── data/                 # Data statis
│   │   └── products.json     # Database produk (25 produk)
│   ├── pages/                # Halaman utama aplikasi
│   │   ├── Cart.jsx          # Halaman keranjang belanja
│   │   ├── Checkout.jsx      # Halaman checkout dengan form
│   │   ├── Home.jsx          # Halaman beranda
│   │   ├── ProductDetail.jsx # Detail produk individual
│   │   └── Products.jsx      # Daftar semua produk
│   ├── styles/               # File CSS modular
│   │   ├── dropdown-bubbles.css  # Styling dropdown & animasi bubble
│   │   ├── global.css        # Styling global & tema
│   │   ├── loading.css       # Animasi loading screen
│   │   └── product-detail.css # Styling halaman detail produk
│   ├── utils/                # Fungsi utility
│   │   ├── exportToExcel.js  # Export data ke Excel
│   │   └── exportToPDF.js    # Export data ke PDF
│   ├── App.css               # Styling komponen App
│   ├── App.jsx               # Komponen root dengan routing
│   ├── index.css             # CSS entry point
│   └── main.jsx              # Entry point aplikasi
├── .gitignore
├── eslint.config.js          # Konfigurasi ESLint
├── index.html                # HTML template
├── package.json              # Dependencies & scripts
├── README.md
└── vite.config.js            # Konfigurasi Vite & base path
```

### 4.1.3 Pembagian Tanggung Jawab

#### A. Components (Komponen Reusable)

- **Navbar.jsx**: Navigasi responsif dengan burger menu (mobile), kategori quick access, theme toggle, dan cart badge
- **Footer.jsx**: Informasi kontak dengan Font Awesome icons, navigasi, kategori produk, dan payment method tooltips
- **ProductCard.jsx**: Kartu produk dengan gambar, nama, harga, badge (Best Seller/New/Premium), dan tombol "Tambah ke Keranjang"
- **QrisQRCode.jsx**: Generator QR Code untuk pembayaran QRIS menggunakan library `qrcode.react`
- **LoadingScreen.jsx**: Layar loading bertema gaming dengan:
  - Particle effects (20 partikel animasi)
  - Hexagon logo dengan pulse animation
  - Progress bar (0-100%)
  - Gaming tips rotating
  - Ring expansion effects

#### B. Pages (Halaman Utama)

- **Home.jsx**: Landing page dengan hero section, banner slider (4 slides auto-rotate), statistik, dan floating icons
- **Products.jsx**: Daftar produk dengan:
  - Custom dropdown kategori (icon-based)
  - Search bar
  - Price range filter (min/max)
  - Animated bubbles background (15 bubbles)
  - Export to Excel button
  - Responsive grid layout
- **ProductDetail.jsx**: Detail lengkap produk (gambar, deskripsi, spesifikasi, stok, rating, reviews)
- **Cart.jsx**: Keranjang belanja dengan:
  - Tabel item (gambar, nama, harga, quantity adjuster)
  - Empty state dengan ilustrasi
  - Total price calculation
  - Export to PDF button
  - Checkout button
- **Checkout.jsx**: Form checkout dengan:
  - Input data pembeli (nama, email, telepon, alamat)
  - Pilihan metode pembayaran (Credit Card, Bank Transfer, E-Wallet, COD)
  - QRIS payment display
  - Order summary

#### C. Context (State Management)

- **CartContext.jsx**: Menyediakan state global untuk:
  - `cartItems`: Array item di keranjang
  - `addToCart(product)`: Tambah produk
  - `removeFromCart(id)`: Hapus produk
  - `updateQuantity(id, quantity)`: Update jumlah
  - `clearCart()`: Kosongkan keranjang
  - `getCartTotal()`: Hitung total harga
- **ThemeContext.jsx**: Dark/Light mode toggle dengan:
  - `theme`: "dark" atau "light"
  - `toggleTheme()`: Switch tema
  - Persist ke localStorage

#### D. Data (products.json)

Struktur data produk:

```json
{
  "id": 1,
  "name": "Mechanical Keyboard RGB",
  "price": 850000,
  "category": "Keyboard",
  "image": "URL_gambar",
  "description": "Deskripsi lengkap produk",
  "stock": 25,
  "label": "Best Seller",
  "rating": 4.8,
  "reviews": 120
}
```

**Field Justification:**

- `id`: Unique identifier untuk routing `/products/:id`
- `name`: Nama produk untuk display dan search
- `price`: Harga untuk kalkulasi total dan filter
- `category`: Untuk filtering dan kategorisasi (7 kategori: Keyboard, Mouse, Headset, Monitor, Kursi, Mousepad, Aksesoris)
- `image`: URL gambar produk (dari Unsplash)
- `description`: Deskripsi lengkap untuk halaman detail
- `stock`: Informasi ketersediaan
- `label`: Badge display (Best Seller, New, Premium, RGB, Wireless, Limited)
- `rating`: Rating produk (1-5)
- `reviews`: Jumlah ulasan

#### E. Utils (Utility Functions)

- **exportToExcel.js**:
  - Library: `xlsx`, `file-saver`
  - Function: `exportProductsToExcel(data, filename)`
  - Membuat worksheet dari data produk
  - Download sebagai `.xlsx`
- **exportToPDF.js**:
  - Library: `jspdf`, `jspdf-autotable`
  - Function: `exportCartToPDF(cartItems)`
  - Generate PDF invoice/receipt
  - Includes header, table, dan total

#### F. Styles (Modular CSS)

- **global.css** (2464 lines):
  - CSS variables untuk tema (dark/light)
  - Navbar, footer, buttons, cards
  - Responsive media queries
  - Font imports (Orbitron, Rajdhana, Electrolize)
- **loading.css** (300+ lines):
  - Keyframe animations (hexagonPulse, gamepadSpin, particleFloat, ringExpand)
  - Gradient effects
- **dropdown-bubbles.css**:
  - Custom dropdown styling dengan icon per kategori
  - Bubble animation (`bubbleRise` - translateY -110vh over 10-20s)
  - Responsive adjustments (desktop: dropdown above, mobile: below)
- **product-detail.css**:
  - Layout detail produk (grid 2 kolom)
  - Image gallery
  - Specifications table

### 4.1.4 Fitur Tambahan yang Telah Diimplementasikan

1. **Loading Screen Bertema Gaming**

   - Animasi partikel 3D
   - Progress bar dengan tips gaming
   - Auto-complete setelah 3 detik
   - Hexagon logo dengan glow effect

2. **Custom Dropdown dengan Icon**

   - Icon unik per kategori (Font Awesome)
   - Kategori: Keyboard (fa-keyboard), Mouse (fa-computer-mouse), Headset (fa-headphones), Monitor (fa-desktop), Kursi (fa-chair), Mousepad (fa-table-cells), Aksesoris (fa-box)
   - Click-outside handler untuk UX
   - Smooth slide animation

3. **Animated Bubbles Background**

   - 15 bubbles dengan random size, position, delay
   - Glass morphism effect
   - Rising animation dengan opacity fade

4. **Footer dengan Payment Tooltips**

   - Font Awesome icons untuk semua section
   - Hover tooltips pada payment methods
   - Social media links

5. **Dark/Light Mode Theme**

   - Toggle di Navbar
   - CSS custom properties
   - LocalStorage persistence

6. **Responsive Mobile Optimization**

   - Transform-based sidebar (tidak bisa di-scroll horizontal)
   - Media queries untuk semua breakpoints
   - Touch-friendly buttons dan spacing

7. **GitHub Pages Deployment**
   - Vite base path: `/APK_GAMEZONE/`
   - BrowserRouter basename configuration
   - gh-pages automated deployment

---

## 4.2 Perancangan Navigasi (Routing)

### 4.2.1 Konfigurasi React Router

Aplikasi menggunakan React Router v7.10.1 dengan `BrowserRouter` dan konfigurasi `basename` untuk deployment di GitHub Pages.

**File: `src/main.jsx`**

```jsx
<BrowserRouter basename="/APK_GAMEZONE">
  <App />
</BrowserRouter>
```

### 4.2.2 Mapping URL ke Halaman

| URL Path                      | Komponen            | Deskripsi                           |
| ----------------------------- | ------------------- | ----------------------------------- |
| `/`                           | `Home.jsx`          | Halaman beranda dengan hero section |
| `/products`                   | `Products.jsx`      | Daftar semua produk dengan filter   |
| `/products?category=Keyboard` | `Products.jsx`      | Filter produk berdasarkan kategori  |
| `/products/:id`               | `ProductDetail.jsx` | Detail produk individual            |
| `/cart`                       | `Cart.jsx`          | Keranjang belanja                   |
| `/checkout`                   | `Checkout.jsx`      | Form checkout dan pembayaran        |

### 4.2.3 Routing Implementation

**File: `src/App.jsx`**

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/products" element={<Products />} />
  <Route path="/products/:id" element={<ProductDetail />} />
  <Route path="/cart" element={<Cart />} />
  <Route path="/checkout" element={<Checkout />} />
</Routes>
```

### 4.2.4 Navigasi Programatik

#### A. useParams (Dynamic URL Parameters)

Digunakan di `ProductDetail.jsx` untuk mendapatkan ID produk dari URL:

```jsx
const { id } = useParams();
const product = productsData.find((p) => p.id === parseInt(id));
```

#### B. useSearchParams (Query Parameters)

Digunakan di `Products.jsx` untuk filtering kategori:

```jsx
const [searchParams, setSearchParams] = useSearchParams();
const category = searchParams.get("category") || "all";
```

#### C. useNavigate (Programmatic Navigation)

Digunakan untuk navigasi setelah aksi (contoh di `Navbar.jsx`):

```jsx
const navigate = useNavigate();
const handleCategoryClick = (category) => {
  navigate(`/products?category=${category}`);
};
```

### 4.2.5 Diagram Alur Navigasi

```
┌─────────────────────────────────────────────────────────────────┐
│                          NAVBAR                                  │
│  [Logo] [Home] [Produk] [Cart(n)] [Keyboard] [Mouse] [Theme]   │
└─────────────────────────────────────────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
    ┌───────┐        ┌──────────┐       ┌──────────┐
    │ HOME  │        │ PRODUCTS │       │   CART   │
    └───────┘        └──────────┘       └──────────┘
        │                  │                  │
        │                  │                  │
    [Lihat]            [Card]            [Checkout]
   [Produk]            [Click]               │
        │                  │                  │
        └──────────────────┼──────────────────┘
                           ▼
                    ┌─────────────┐
                    │   PRODUCT   │
                    │   DETAIL    │
                    └─────────────┘
                           │
                      [Add to Cart]
                           │
                           ▼
                      ┌─────────┐
                      │  CART   │
                      └─────────┘
                           │
                      [Checkout]
                           ▼
                      ┌──────────┐
                      │ CHECKOUT │
                      └──────────┘
```

### 4.2.6 Navigasi Footer

Footer menyediakan quick links ke:

- **Navigasi**: Home, Produk, Keranjang, Checkout
- **Kategori**: Keyboard, Mouse, Headset, Monitor (dengan query params)
- **Info**: Kontak, Alamat, Email, Jam Operasional

---

## 4.3 Perancangan Antarmuka (UI/UX)

### 4.3.1 Prinsip Desain

1. **Konsistensi Visual**: Semua halaman menggunakan tema gaming dengan warna primary (#00d9ff), accent (#ff3d71), dan dark background
2. **Responsiveness**: Mobile-first approach dengan breakpoint 768px dan 900px
3. **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation support
4. **Performance**: Lazy loading, optimized animations, minimal re-renders

### 4.3.2 Tema & Color Palette

**Dark Mode (default):**

- Background: `#0a0e1a` (dark navy)
- Card: `#1a1f35`
- Primary: `#00d9ff` (cyan)
- Accent: `#ff3d71` (pink)
- Text: `#e8edf5` (light gray)

**Light Mode:**

- Background: `#f5f7fa`
- Card: `#ffffff`
- Primary: `#0070f3` (blue)
- Accent: `#ff3d71`
- Text: `#1a202c` (dark)

### 4.3.3 Typography

- **Headings (h1-h6)**: Font Orbitron (futuristic gaming font)
- **Body Text**: Font Rajdhana (clean, readable)
- **Buttons**: Font Electrolize (tech-style)

### 4.3.4 Perancangan Per Halaman

#### A. Home Page (`Home.jsx`)

**Elemen Utama:**

1. **Loading Screen** (3 detik pertama):

   - Hexagon logo dengan pulse animation
   - 20 floating particles
   - Progress bar (0-100%)
   - Gaming tips carousel
   - 3 expanding rings

2. **Hero Section**:

   - **Kiri**:
     - Badge: "Ready Stock • Fast Delivery"
     - Heading: "Setup Gaming Impianmu"
     - Description paragraph
     - 2 CTA buttons: "Jelajahi Produk", "Best Seller"
     - Statistics: 500+ Produk, 10K+ Gamers, 4.9 Rating
   - **Kanan**:
     - Logo GamerZone (gamezone.png)
     - Glow effect
     - 4 floating icons (gamepad, keyboard, mouse, headphones)

3. **Banner Slider**:

   - 4 slides auto-rotate setiap 5 detik
   - Gradient backgrounds
   - CTA links ke Products
   - Dot indicators

4. **Features Section**:
   - Icon + Title + Description untuk 4 fitur utama

**Wireframe Deskripsi:**

```
┌────────────────────────────────────────────────┐
│ [NAVBAR]                                       │
├────────────────────────────────────────────────┤
│                                                │
│  Ready Stock • Fast Delivery                   │
│                                                │
│  Setup Gaming IMPIANMU                         │
│  ━━━━━━━━━━━━━                                │
│                                                │
│  [Perlengkapan gaming premium...]              │
│                                                │
│  [🎮 Jelajahi] [⭐ Best Seller]                │
│                                                │
│  500+ Produk | 10K+ Gamers | 4.9 Rating        │
│                                                │
├────────────────────────────────────────────────┤
│  🔥 DISKON HINGGA 50% UNTUK KEYBOARD!         │
│                    ● ○ ○ ○                     │
├────────────────────────────────────────────────┤
│ [FOOTER]                                       │
└────────────────────────────────────────────────┘
```

#### B. Products Page (`Products.jsx`)

**Elemen Utama:**

1. **Animated Bubbles Background**: 15 glass-morphism bubbles rising
2. **Banner Promo**: 4 rotating banners dengan gradient
3. **Header**: Title + Product count + Export Excel button
4. **Filters**:
   - Search input (🔍)
   - **Custom Dropdown Kategori** dengan icon per kategori
   - Price range (min/max)
5. **Product Grid**: Responsive grid (4 cols → 3 → 2 → 1)

**Custom Dropdown Features:**

- Icon mapping per kategori (Font Awesome)
- Active state dengan checkmark
- Hover effect dengan indent
- Click-outside to close
- Desktop: muncul di atas
- Mobile: muncul di bawah

**Product Card Layout:**

```
┌──────────────────┐
│                  │
│   [IMAGE]        │  [BADGE: Best Seller]
│                  │
├──────────────────┤
│ Nama Produk      │
│ Rp 850.000       │
│ ⭐⭐⭐⭐⭐ (120)   │
│                  │
│ [+ Keranjang]    │
└──────────────────┘
```

**Wireframe:**

```
┌────────────────────────────────────────────────┐
│ [NAVBAR]                                       │
├────────────────────────────────────────────────┤
│  🔥 GRATIS ONGKIR MIN 500K!      ● ○ ○ ○      │
├────────────────────────────────────────────────┤
│ 🎮 Perlengkapan Gaming    [📊 Export Excel]   │
│ 25 produk tersedia                             │
├────────────────────────────────────────────────┤
│ [🔍 Cari...]  [▼ Kategori]  [💰 Min] [💰 Max]│
├────────────────────────────────────────────────┤
│ ┌────┐ ┌────┐ ┌────┐ ┌────┐                  │
│ │ P1 │ │ P2 │ │ P3 │ │ P4 │                  │
│ └────┘ └────┘ └────┘ └────┘                  │
│ ┌────┐ ┌────┐ ┌────┐ ┌────┐                  │
│ │ P5 │ │ P6 │ │ P7 │ │ P8 │                  │
│ └────┘ └────┘ └────┘ └────┘                  │
├────────────────────────────────────────────────┤
│ [FOOTER]                                       │
└────────────────────────────────────────────────┘
```

#### C. Product Detail Page (`ProductDetail.jsx`)

**Layout Grid (2 kolom):**

**Kolom Kiri:**

- Gambar produk besar
- Badge (Best Seller/New/Premium)
- Image gallery thumbnails (jika ada)

**Kolom Kanan:**

- Breadcrumb: Home > Products > [Nama]
- Product name (h1)
- Rating + Reviews count
- Price (large, bold)
- Stock status
- Description paragraph
- Specifications table
- Quantity selector (+/-)
- Add to Cart button (full width)
- Share buttons (sosial media)

**Wireframe:**

```
┌─────────────────────────────────────────────────────┐
│ [NAVBAR]                                            │
├─────────────────────────────────────────────────────┤
│ Home > Products > Mechanical Keyboard RGB           │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌────────────────┐   Mechanical Keyboard RGB      │
│  │                │   ⭐⭐⭐⭐⭐ (120 ulasan)       │
│  │   [IMAGE]      │   Rp 850.000                   │
│  │                │   Stock: 25 unit               │
│  │                │                                 │
│  └────────────────┘   Keyboard gaming mechanical   │
│                       dengan RGB lighting...        │
│                                                     │
│                       Spesifikasi:                  │
│                       • Switch: Cherry MX Blue      │
│                       • Backlight: RGB              │
│                       • Connection: USB-C           │
│                                                     │
│                       [ - ] 1 [ + ]                 │
│                       [🛒 Tambah ke Keranjang]     │
│                                                     │
├─────────────────────────────────────────────────────┤
│ [FOOTER]                                            │
└─────────────────────────────────────────────────────┘
```

#### D. Cart Page (`Cart.jsx`)

**State: Empty Cart**

- Icon keranjang kosong
- Message: "Keranjang belanja Anda kosong"
- Button: "Mulai Belanja"

**State: Filled Cart**

- Table dengan kolom:
  - Gambar
  - Nama Produk
  - Harga Satuan
  - Quantity (dengan +/- adjuster)
  - Subtotal
  - Aksi (hapus)
- Total Harga (bold, large)
- 2 Buttons: "📄 Export PDF", "✅ Checkout"

**Features:**

- Real-time total calculation
- Quantity update (min: 1, max: stock)
- Remove item with confirmation
- Export cart to PDF (invoice format)
- Empty state illustration

**Wireframe:**

```
┌────────────────────────────────────────────────┐
│ [NAVBAR]                                       │
├────────────────────────────────────────────────┤
│ 🛒 Keranjang Belanja                           │
├────────────────────────────────────────────────┤
│ ┌──────┬──────────┬──────┬─────┬────────┬───┐│
│ │ Img  │ Produk   │ Harga│ Qty │ Subtot │ X ││
│ ├──────┼──────────┼──────┼─────┼────────┼───┤│
│ │ [🖼] │ Keyboard │ 850K │[1]  │ 850K   │[×]││
│ │ [🖼] │ Mouse    │ 250K │[2]  │ 500K   │[×]││
│ └──────┴──────────┴──────┴─────┴────────┴───┘│
│                                                │
│                    Total: Rp 1.350.000         │
│                                                │
│         [📄 Export PDF]  [✅ Checkout]        │
│                                                │
├────────────────────────────────────────────────┤
│ [FOOTER]                                       │
└────────────────────────────────────────────────┘
```

#### E. Checkout Page (`Checkout.jsx`)

**Layout (2 kolom di desktop, 1 kolom di mobile):**

**Kolom Kiri: Form Data Pembeli**

- Nama Lengkap (required)
- Email (required, validated)
- Nomor Telepon (required)
- Alamat Lengkap (textarea, required)

**Kolom Kanan: Order Summary & Payment**

1. **Ringkasan Pesanan**:

   - List item (nama + qty + harga)
   - Total harga

2. **Metode Pembayaran** (radio buttons):

   - 💳 Credit Card
   - 🏦 Transfer Bank
   - 📱 E-Wallet (QRIS)
   - 💵 Cash on Delivery (COD)

3. **QRIS Payment Display** (jika E-Wallet dipilih):

   - QR Code generated dari total harga
   - Instruksi scan

4. **Tombol Konfirmasi**:
   - "Konfirmasi Pembayaran" (disabled jika form invalid)

**Form Validation:**

- Email format check
- Phone number format (10-13 digit)
- Semua field required
- Real-time error messages

**Wireframe:**

```
┌─────────────────────────────────────────────────────┐
│ [NAVBAR]                                            │
├─────────────────────────────────────────────────────┤
│ 💳 Checkout                                         │
├─────────────────────────────────────────────────────┤
│  Data Pembeli              Ringkasan Pesanan        │
│  ┌──────────────┐          ┌──────────────────┐    │
│  │ Nama:        │          │ • Keyboard x1    │    │
│  │ [________]   │          │   Rp 850.000     │    │
│  │              │          │ • Mouse x2       │    │
│  │ Email:       │          │   Rp 500.000     │    │
│  │ [________]   │          │                  │    │
│  │              │          │ Total: 1.350.000 │    │
│  │ Telepon:     │          └──────────────────┘    │
│  │ [________]   │                                   │
│  │              │          Metode Pembayaran:       │
│  │ Alamat:      │          ○ Credit Card            │
│  │ [________]   │          ○ Transfer Bank          │
│  │ [________]   │          ● E-Wallet (QRIS)        │
│  │              │          ○ COD                    │
│  └──────────────┘                                   │
│                             ┌──────────────┐        │
│                             │   [QR CODE]  │        │
│                             │              │        │
│                             └──────────────┘        │
│                             Scan untuk bayar        │
│                                                     │
│                    [Konfirmasi Pembayaran]          │
│                                                     │
├─────────────────────────────────────────────────────┤
│ [FOOTER]                                            │
└─────────────────────────────────────────────────────┘
```

### 4.3.5 Responsive Breakpoints

| Breakpoint                 | Layout Changes                                    |
| -------------------------- | ------------------------------------------------- |
| **> 900px** (Desktop)      | Navbar horizontal, dropdown di atas, grid 4 kolom |
| **768px - 900px** (Tablet) | Grid 3 kolom, navbar burger menu                  |
| **< 768px** (Mobile)       | Grid 2 kolom, dropdown di bawah, full-width forms |
| **< 480px** (Small Mobile) | Grid 1 kolom, compact spacing                     |

### 4.3.6 Animasi & Interaksi

1. **Loading Screen**:

   - Particle float: random positions, 10-20s duration
   - Hexagon pulse: scale 1 → 1.05 → 1 (2s)
   - Progress bar: 0-100% dalam 3s
   - Ring expand: scale 1 → 2.5 dengan fade (2s)

2. **Bubbles**:

   - Rise animation: translateY 0 → -110vh (10-20s)
   - Opacity: 0 → 0.6 → 0.8 → 0
   - Random horizontal movement (±50px)

3. **Dropdown**:

   - Slide in: opacity 0 → 1, translateY ±10px → 0 (0.3s)
   - Hover: padding-left shift

4. **Cards**:

   - Hover: translateY -5px, box-shadow increase
   - Image zoom on hover

5. **Buttons**:
   - Glow effect on hover (box-shadow)
   - Scale 1 → 1.05 on active

---

## 4.4 Perancangan Data

### 4.4.1 Struktur Data Produk

**File: `src/data/products.json`**

Aplikasi menyimpan data 25 produk dalam format JSON dengan struktur sebagai berikut:

```json
{
  "id": 1,
  "name": "Mechanical Keyboard RGB TKL",
  "price": 850000,
  "category": "Keyboard",
  "image": "https://images.unsplash.com/photo-...",
  "description": "Keyboard gaming mechanical dengan Cherry MX Blue switches...",
  "stock": 25,
  "label": "Best Seller",
  "rating": 4.8,
  "reviews": 120
}
```

### 4.4.2 Justifikasi Field Data

| Field         | Tipe Data      | Kegunaan                                            | Contoh                            |
| ------------- | -------------- | --------------------------------------------------- | --------------------------------- |
| `id`          | Number         | Unique identifier untuk routing dan cart operations | 1, 2, 3                           |
| `name`        | String         | Nama produk untuk display dan search                | "Mechanical Keyboard RGB"         |
| `price`       | Number         | Harga dalam Rupiah untuk kalkulasi dan filter       | 850000                            |
| `category`    | String         | Kategorisasi untuk filtering dan grouping           | "Keyboard", "Mouse"               |
| `image`       | String (URL)   | URL gambar produk dari Unsplash                     | "https://images.unsplash.com/..." |
| `description` | String         | Deskripsi lengkap untuk halaman detail              | "Keyboard gaming mechanical..."   |
| `stock`       | Number         | Ketersediaan produk, max quantity di cart           | 25                                |
| `label`       | String         | Badge display di card produk                        | "Best Seller", "New", "Premium"   |
| `rating`      | Number (float) | Rating produk (1-5) untuk display                   | 4.8                               |
| `reviews`     | Number         | Jumlah ulasan untuk kredibilitas                    | 120                               |

### 4.4.3 Kategori Produk

Aplikasi memiliki 7 kategori produk:

1. **Keyboard** (8 produk)

   - Icon: `fa-solid fa-keyboard`
   - Contoh: Mechanical Keyboard RGB, Wireless Gaming Keyboard

2. **Mouse** (6 produk)

   - Icon: `fa-solid fa-computer-mouse`
   - Contoh: Gaming Mouse RGB, Wireless Mouse

3. **Headset** (4 produk)

   - Icon: `fa-solid fa-headphones`
   - Contoh: Gaming Headset 7.1, Wireless Headset

4. **Monitor** (3 produk)

   - Icon: `fa-solid fa-desktop`
   - Contoh: Gaming Monitor 144Hz, Curved Monitor

5. **Kursi** (2 produk)

   - Icon: `fa-solid fa-chair`
   - Contoh: Gaming Chair Ergonomic, Racing Chair

6. **Mousepad** (1 produk)

   - Icon: `fa-solid fa-table-cells`
   - Contoh: Extended Gaming Mousepad

7. **Aksesoris** (1 produk)
   - Icon: `fa-solid fa-box`
   - Contoh: Cable Management Kit

### 4.4.4 Label Produk

Badge/label yang digunakan:

- **Best Seller**: Produk paling laris (10 produk)
- **New**: Produk baru (7 produk)
- **Premium**: Produk kelas atas (3 produk)
- **RGB**: Produk dengan lighting RGB (4 produk)
- **Wireless**: Produk tanpa kabel (3 produk)
- **Limited**: Stok terbatas (2 produk)

### 4.4.5 Data Flow & Operations

#### A. Read Operations

```jsx
// Import data
import productsData from "../data/products.json";

// Get all products
const products = productsData;

// Filter by category
const filtered = productsData.filter((p) => p.category === "Keyboard");

// Search by name
const searched = productsData.filter((p) =>
  p.name.toLowerCase().includes(searchTerm.toLowerCase())
);

// Get by ID
const product = productsData.find((p) => p.id === parseInt(id));
```

#### B. Price Range Filtering

```jsx
const filtered = productsData.filter((product) => {
  const matchMinPrice = minPrice ? product.price >= Number(minPrice) : true;
  const matchMaxPrice = maxPrice ? product.price <= Number(maxPrice) : true;
  return matchMinPrice && matchMaxPrice;
});
```

#### C. Categories Extraction

```jsx
const categories = ["all", ...new Set(productsData.map((p) => p.category))];
// Result: ["all", "Keyboard", "Mouse", "Headset", "Monitor", "Kursi", "Mousepad", "Aksesoris"]
```

---

## 4.5 Perancangan Keranjang (Cart Flow)

### 4.5.1 State Management dengan Context API

**File: `src/context/CartContext.jsx`**

Keranjang belanja menggunakan React Context API untuk state global yang dapat diakses dari komponen mana pun.

#### A. Cart State Structure

```jsx
const [cartItems, setCartItems] = useState([
  {
    id: 1,
    name: "Mechanical Keyboard RGB",
    price: 850000,
    image: "URL",
    quantity: 2,
  },
]);
```

#### B. Cart Operations

**1. Add to Cart**

```jsx
const addToCart = (product) => {
  const existingItem = cartItems.find((item) => item.id === product.id);

  if (existingItem) {
    // Update quantity if already in cart
    setCartItems(
      cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  } else {
    // Add new item
    setCartItems([...cartItems, { ...product, quantity: 1 }]);
  }
};
```

**2. Remove from Cart**

```jsx
const removeFromCart = (productId) => {
  setCartItems(cartItems.filter((item) => item.id !== productId));
};
```

**3. Update Quantity**

```jsx
const updateQuantity = (productId, newQuantity) => {
  if (newQuantity < 1) return; // Minimum 1

  setCartItems(
    cartItems.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    )
  );
};
```

**4. Clear Cart**

```jsx
const clearCart = () => {
  setCartItems([]);
};
```

**5. Get Total Price**

```jsx
const getCartTotal = () => {
  return cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};
```

**6. Get Total Items**

```jsx
const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
```

### 4.5.2 Cart Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                   CART FLOW                             │
└─────────────────────────────────────────────────────────┘

Step 1: ADD TO CART
┌──────────────┐
│ Products     │
│ Page         │  User clicks "Tambah ke Keranjang"
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ ProductCard  │  Calls: addToCart(product)
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ CartContext  │  Updates cartItems state
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Navbar       │  Badge updates: Cart(n)
└──────────────┘


Step 2: VIEW CART
┌──────────────┐
│ User clicks  │
│ "Cart" in    │
│ Navbar       │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Cart.jsx     │  Reads cartItems from Context
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Display      │  - Table with items
│ Cart Items   │  - Quantity adjusters
│              │  - Remove buttons
│              │  - Total calculation
└──────────────┘


Step 3: UPDATE QUANTITY
┌──────────────┐
│ User clicks  │
│ [+] or [-]   │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ updateQuantity│ Updates specific item quantity
│ (id, qty)    │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ CartContext  │  Re-renders all consumers
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Cart.jsx     │  Shows updated quantity & total
└──────────────┘


Step 4: REMOVE ITEM
┌──────────────┐
│ User clicks  │
│ [×] button   │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ removeFromCart│ Filters out item by ID
│ (id)         │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ CartContext  │  Updates cartItems array
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Cart.jsx     │  Item disappears, total updates
└──────────────┘


Step 5: EXPORT PDF
┌──────────────┐
│ User clicks  │
│ "Export PDF" │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ exportCartToPDF│ Uses jspdf + jspdf-autotable
│ (cartItems)  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Generate PDF │  - Header "INVOICE"
│              │  - Table (Produk, Qty, Harga, Subtotal)
│              │  - Footer (Total)
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Download     │  gamerzone-invoice.pdf
└──────────────┘


Step 6: CHECKOUT
┌──────────────┐
│ User clicks  │
│ "Checkout"   │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Navigate to  │  useNavigate("/checkout")
│ /checkout    │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Checkout.jsx │  Reads cartItems for order summary
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Display      │  - Form pembeli
│ Checkout     │  - Order summary
│ Form         │  - Payment method selection
│              │  - QRIS QR Code (if E-Wallet)
└──────────────┘


Step 7: CONFIRM PAYMENT
┌──────────────┐
│ User fills   │
│ form & clicks│
│ "Konfirmasi" │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Validation   │  Check required fields
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Success      │  Show alert/modal
│ Message      │  "Pesanan berhasil!"
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ clearCart()  │  Empty cart after successful order
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Navigate to  │  Redirect to Home or Thank You page
│ /            │
└──────────────┘
```

### 4.5.3 LocalStorage Persistence (Optional Enhancement)

Untuk menyimpan keranjang meskipun halaman di-refresh:

```jsx
// Save to localStorage
useEffect(() => {
  localStorage.setItem("gamerzone-cart", JSON.stringify(cartItems));
}, [cartItems]);

// Load from localStorage on mount
useEffect(() => {
  const savedCart = localStorage.getItem("gamerzone-cart");
  if (savedCart) {
    setCartItems(JSON.parse(savedCart));
  }
}, []);
```

### 4.5.4 Cart Validation Rules

1. **Minimum Quantity**: 1 (tidak boleh kurang)
2. **Maximum Quantity**: Sesuai stock produk
3. **Price Calculation**:
   - Subtotal = price × quantity
   - Total = Σ(subtotal semua item)
4. **Empty Cart State**:
   - Tampilkan ilustrasi kosong
   - Disable tombol Checkout & Export
   - Show "Mulai Belanja" button

### 4.5.5 Integration Points

**Cart Context digunakan di:**

1. **Navbar.jsx**: Badge "Cart(n)" - menampilkan total items
2. **ProductCard.jsx**: Button "Tambah ke Keranjang" - addToCart()
3. **ProductDetail.jsx**: Button "Tambah ke Keranjang" - addToCart()
4. **Cart.jsx**:
   - Display cartItems
   - updateQuantity()
   - removeFromCart()
   - getCartTotal()
   - exportCartToPDF()
5. **Checkout.jsx**:
   - Display order summary
   - Calculate total payment
   - clearCart() setelah konfirmasi

---

## 4.6 Fitur-Fitur Tambahan yang Diimplementasikan

### 4.6.1 Loading Screen Bertema Gaming

**Komponen: `LoadingScreen.jsx`**

Fitur loading screen ditampilkan saat aplikasi pertama kali dibuka (3 detik) dengan elemen:

1. **Particle System**: 20 partikel dengan randomized:

   - Position (x: 0-100%, y: 0-100%)
   - Size (2-6px)
   - Animation duration (10-20s)
   - Float animation dengan opacity fade

2. **Hexagon Logo**:

   - Pulse animation (scale 1 → 1.05 → 1)
   - Glow effect dengan box-shadow

3. **Progress Bar**:

   - 0-100% dalam 3 detik
   - Animated fill dengan gradient
   - Glowing bar effect

4. **Gaming Tips Carousel**:

   - 5 tips berganti secara random
   - Fade in/out animation

5. **Expanding Rings**:
   - 3 rings dengan staggered delay
   - Scale 1 → 2.5 dengan opacity fade

**Implementation:**

```jsx
// useState with lazy initializer for particles
const [particles] = useState(() =>
  Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 10 + 10,
  }))
);

// Progress bar animation
useEffect(() => {
  const interval = setInterval(() => {
    setProgress((prev) => {
      if (prev >= 100) {
        clearInterval(interval);
        setTimeout(() => onLoadComplete(), 500);
        return 100;
      }
      return prev + 2;
    });
  }, 60);
  return () => clearInterval(interval);
}, []);
```

### 4.6.2 Custom Dropdown dengan Icon per Kategori

**File: `dropdown-bubbles.css`**

Fitur dropdown kategori di halaman Products dengan:

1. **Icon Mapping**:

```jsx
const getCategoryIcon = (category) => {
  const iconMap = {
    Keyboard: "fa-solid fa-keyboard",
    Mouse: "fa-solid fa-computer-mouse",
    Headset: "fa-solid fa-headphones",
    Monitor: "fa-solid fa-desktop",
    Kursi: "fa-solid fa-chair",
    Mousepad: "fa-solid fa-table-cells",
    Aksesoris: "fa-solid fa-box",
  };
  return iconMap[category] || "fa-solid fa-tag";
};
```

2. **Features**:

   - Active state dengan checkmark (✓)
   - Hover effect dengan padding shift
   - Click-outside handler (useRef + useEffect)
   - Responsive positioning:
     - **Desktop (≥769px)**: Dropdown muncul **di atas** button
     - **Mobile (≤768px)**: Dropdown muncul **di bawah** button

3. **Animation**:
   - Slide in dengan opacity fade
   - 0.3s ease transition

### 4.6.3 Animated Bubbles Background

**File: `Products.jsx` + `dropdown-bubbles.css`**

15 bubbles dengan glass-morphism effect:

```jsx
const [bubbles] = useState(() =>
  Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 80 + 40, // 40-120px
    left: Math.random() * 100, // 0-100%
    delay: Math.random() * 5, // 0-5s
    duration: Math.random() * 10 + 10, // 10-20s
  }))
);
```

**Animation:**

- **0%**: Bottom -100px, opacity 0
- **10%**: Opacity 0.6
- **50%**: Middle viewport, opacity 0.8, translateX +50px
- **100%**: Top -110vh, opacity 0, translateX -30px

**Styling:**

- Radial gradient (cyan to blue)
- Backdrop filter blur
- Box-shadow dengan glow
- Pseudo-element ::before untuk highlight

### 4.6.4 Dark/Light Mode Theme Toggle

**Files: `ThemeContext.jsx`, `useTheme.js`, `Navbar.jsx`**

Fitur toggle tema dengan:

1. **State Management**:

```jsx
const [theme, setTheme] = useState(() => {
  return localStorage.getItem("gamerzone-theme") || "dark";
});

const toggleTheme = () => {
  setTheme((prev) => {
    const newTheme = prev === "dark" ? "light" : "dark";
    localStorage.setItem("gamerzone-theme", newTheme);
    return newTheme;
  });
};
```

2. **CSS Variables**:

   - Dark mode: `#0a0e1a` background, `#00d9ff` primary
   - Light mode: `#f5f7fa` background, `#0070f3` primary

3. **Apply to document**:

```jsx
useEffect(() => {
  document.documentElement.setAttribute("data-theme", theme);
}, [theme]);
```

4. **Toggle Button** (Navbar):
   - Icon: fa-sun (dark mode) / fa-moon (light mode)
   - Smooth transition pada semua warna (0.3s ease)

### 4.6.5 Footer dengan Payment Method Tooltips

**File: `Footer.jsx`**

Footer sections:

1. **Kontak**: Alamat, email, telepon, jam operasional (dengan Font Awesome icons)
2. **Navigasi**: Links ke Home, Produk, Keranjang, Checkout
3. **Kategori**: Links dengan query params (`/products?category=Keyboard`)
4. **Payment Methods** dengan tooltips:
   - Credit Card → "Kartu Kredit/Debit"
   - Bank Transfer → "Transfer Bank"
   - E-Wallet → "QRIS & E-Wallet"
   - COD → "Bayar di Tempat"

**Tooltip Implementation** (CSS):

```css
.payment-icon::before {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 100%;
  /* ... styling ... */
  opacity: 0;
  transition: opacity 0.3s;
}

.payment-icon:hover::before {
  opacity: 1;
}
```

### 4.6.6 Responsive Mobile Optimization

**Fixes implemented:**

1. **Sidebar Navigation**:

   - Transform-based animation (`translateX(100%)` → `translateX(0)`)
   - No horizontal scroll (prevented by `overflow-x: hidden` on html/body)
   - z-index 999 untuk overlay
   - Click burger → sidebar slides in from right

2. **Dropdown Position**:

   - Media query untuk desktop vs mobile
   - Desktop: `bottom: calc(100% + 0.5rem)` (above)
   - Mobile: `top: calc(100% + 0.5rem)` (below)

3. **Grid Responsiveness**:

   - 4 columns (desktop) → 3 (tablet) → 2 (mobile) → 1 (small mobile)
   - Media queries: 1200px, 900px, 768px, 480px

4. **Touch-Friendly**:
   - Button min-height 44px (iOS guideline)
   - Adequate spacing between interactive elements
   - No hover-only interactions (semua bisa di-tap)

### 4.6.7 GitHub Pages Deployment

**Configuration:**

1. **Vite Config** (`vite.config.js`):

```js
export default defineConfig({
  plugins: [react()],
  base: "/APK_GAMEZONE/", // Base path for GitHub Pages
});
```

2. **React Router** (`main.jsx`):

```jsx
<BrowserRouter basename="/APK_GAMEZONE">
  <App />
</BrowserRouter>
```

3. **Package.json**:

```json
{
  "homepage": "https://yoichifauzy.github.io/APK_GAMEZONE/",
  "scripts": {
    "deploy": "gh-pages -d dist"
  }
}
```

4. **Deployment Process**:

```bash
npm run build     # Build production files to dist/
npm run deploy    # Deploy dist/ to gh-pages branch
```

**Live URL**: https://yoichifauzy.github.io/APK_GAMEZONE/

### 4.6.8 Export Features

#### A. Export to Excel

**File: `exportToExcel.js`**

```jsx
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportProductsToExcel = (products, filename) => {
  // Create worksheet from data
  const ws = XLSX.utils.json_to_sheet(products);

  // Create workbook
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Products");

  // Generate buffer
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

  // Save file
  const data = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(data, filename);
};
```

**Usage** (Products.jsx):

```jsx
<button
  onClick={() => exportProductsToExcel(filtered, "produk-gamerzone.xlsx")}
>
  📊 Export Excel
</button>
```

#### B. Export to PDF

**File: `exportToPDF.js`**

```jsx
import jsPDF from "jspdf";
import "jspdf-autotable";

export const exportCartToPDF = (cartItems) => {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(18);
  doc.text("INVOICE - GamerZone", 14, 20);

  // Table
  const tableData = cartItems.map((item) => [
    item.name,
    item.quantity,
    `Rp ${item.price.toLocaleString()}`,
    `Rp ${(item.price * item.quantity).toLocaleString()}`,
  ]);

  doc.autoTable({
    startY: 30,
    head: [["Produk", "Qty", "Harga", "Subtotal"]],
    body: tableData,
  });

  // Total
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  doc.text(
    `Total: Rp ${total.toLocaleString()}`,
    14,
    doc.lastAutoTable.finalY + 10
  );

  // Save
  doc.save("gamerzone-invoice.pdf");
};
```

**Usage** (Cart.jsx):

```jsx
<button onClick={() => exportCartToPDF(cartItems)}>📄 Export PDF</button>
```

### 4.6.9 QRIS QR Code Generator

**File: `QrisQRCode.jsx`**

```jsx
import { QRCodeSVG } from "qrcode.react";

export default function QrisQRCode({ amount }) {
  // Generate QRIS string (simplified)
  const qrisData = `QRIS.GAMERZONE.${amount}.${Date.now()}`;

  return (
    <div className="qris-container">
      <QRCodeSVG value={qrisData} size={200} level="H" includeMargin={true} />
      <p>Scan QR Code untuk bayar Rp {amount.toLocaleString()}</p>
    </div>
  );
}
```

**Usage** (Checkout.jsx):

```jsx
{
  paymentMethod === "E-Wallet" && <QrisQRCode amount={getCartTotal()} />;
}
```

---

## 4.7 Technology Stack Summary

| Layer            | Technology        | Version | Purpose                   |
| ---------------- | ----------------- | ------- | ------------------------- |
| **Framework**    | React             | 19.2.0  | UI component library      |
| **Build Tool**   | Vite              | 7.2.4   | Fast dev server & bundler |
| **Routing**      | React Router DOM  | 7.10.1  | Client-side routing       |
| **Icons**        | Font Awesome Free | 7.1.0   | Icon library              |
| **PDF Export**   | jsPDF             | 3.0.4   | PDF generation            |
|                  | jsPDF-AutoTable   | 5.0.2   | Table in PDF              |
| **Excel Export** | XLSX              | 0.18.5  | Excel file generation     |
|                  | File-Saver        | 2.0.5   | File download helper      |
| **QR Code**      | qrcode.react      | 4.2.0   | QR Code generation        |
| **Deployment**   | gh-pages          | 6.3.0   | GitHub Pages deploy       |
| **Linting**      | ESLint            | 9.39.1  | Code quality              |

---

## 4.8 Diagram Arsitektur Sistem (High-Level)

```
┌─────────────────────────────────────────────────────────────────┐
│                     USER INTERFACE (Browser)                    │
└────────────────────────────┬────────────────────────────────────┘
                             │
                ┌────────────┴────────────┐
                │                         │
        ┌───────▼────────┐       ┌────────▼────────┐
        │   COMPONENTS   │       │     PAGES       │
        │                │       │                 │
        │ - Navbar       │       │ - Home          │
        │ - Footer       │       │ - Products      │
        │ - ProductCard  │       │ - ProductDetail │
        │ - LoadingScreen│       │ - Cart          │
        │ - QrisQRCode   │       │ - Checkout      │
        └───────┬────────┘       └────────┬────────┘
                │                         │
                └────────────┬────────────┘
                             │
                ┌────────────▼────────────┐
                │   CONTEXT / STATE       │
                │                         │
                │ - CartContext           │
                │ - ThemeContext          │
                └────────────┬────────────┘
                             │
                ┌────────────▼────────────┐
                │   DATA & UTILS          │
                │                         │
                │ - products.json         │
                │ - exportToExcel         │
                │ - exportToPDF           │
                └────────────┬────────────┘
                             │
                ┌────────────▼────────────┐
                │   EXTERNAL LIBRARIES    │
                │                         │
                │ - React Router          │
                │ - jsPDF / XLSX          │
                │ - QRCode.react          │
                │ - Font Awesome          │
                └─────────────────────────┘
```

---

## 4.9 Kesimpulan BAB IV

Perancangan sistem aplikasi GamerZone mencakup:

1. **Arsitektur Modular**: Pembagian folder yang jelas (components, pages, context, data, utils, styles)
2. **Routing Lengkap**: 6 halaman dengan parameter dinamis dan query string
3. **UI/UX Responsif**: Design konsisten untuk desktop, tablet, dan mobile
4. **State Management**: Context API untuk cart dan theme
5. **Data Structure**: JSON dengan 10 field untuk 25 produk, 7 kategori
6. **Cart Flow**: CRUD operations dengan validation dan total calculation
7. **Fitur Tambahan**: Loading screen, dropdown icon, bubbles, theme toggle, export PDF/Excel, QRIS
8. **Deployment**: GitHub Pages dengan basename configuration

Semua komponen dirancang untuk bekerja secara terintegrasi dan memberikan pengalaman pengguna yang optimal.

---

**END OF BAB IV**
