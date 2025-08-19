# Turkcell Roaming Asistanı - Kurulum Rehberi

## 🚀 Hızlı Başlangıç

### 1. Projeyi İndirin
Bu projeyi bilgisayarınıza indirin ve bir klasöre çıkarın.

### 2. Terminal/Komut İstemi Açın
- **Windows**: `Win + R` → `cmd` yazın → Enter
- **Mac**: `Cmd + Space` → `terminal` yazın → Enter
- **Linux**: `Ctrl + Alt + T`

### 3. Proje Klasörüne Gidin
```bash
cd path/to/turkcell-roaming-assistant
```

### 4. Node.js Kontrolü
Node.js yüklü olup olmadığını kontrol edin:
```bash
node --version
npm --version
```

**Node.js yüklü değilse:**
- [nodejs.org](https://nodejs.org) adresinden LTS sürümünü indirin
- Kurulum tamamlandıktan sonra terminali yeniden açın

### 5. Bağımlılıkları Yükleyin
```bash
npm install
```

Bu komut gerekli tüm paketleri yükleyecek (yaklaşık 2-3 dakika sürer).

### 6. Uygulamayı Başlatın
```bash
npm run dev
```

### 7. Tarayıcıda Açın
Terminal'de gösterilen adresi (genellikle `http://localhost:5173`) tarayıcınızda açın.

## 🔧 Alternatif Kurulum Yöntemleri

### Yarn Kullanarak
```bash
# Yarn yüklü ise
yarn install
yarn dev
```

### Farklı Port Kullanma
```bash
npm run dev -- --port 3000
```

## ❗ Yaygın Sorunlar ve Çözümleri

### Problem: "npm: command not found"
**Çözüm**: Node.js'i yeniden yükleyin ve sistem PATH'ine eklendiğinden emin olun.

### Problem: "Port 5173 already in use"
**Çözüm**: 
```bash
npm run dev -- --port 3000
```

### Problem: "Permission denied" (Mac/Linux)
**Çözüm**:
```bash
sudo npm install
```

### Problem: Paketler yüklenmiyor
**Çözüm**:
```bash
# Cache temizle
npm cache clean --force
# Node modules sil ve yeniden yükle
rm -rf node_modules package-lock.json
npm install
```

### Problem: Build hatası
**Çözüm**:
```bash
# TypeScript hatalarını kontrol et
npm run lint
# Build'i temizle
rm -rf dist
npm run build
```

## 📁 Proje Dosya Yapısı

```
turkcell-roaming-assistant/
├── public/                 # Statik dosyalar
├── src/                   # Kaynak kodlar
│   ├── components/        # React bileşenleri
│   ├── data/             # Mock veriler
│   ├── types/            # TypeScript tipleri
│   ├── utils/            # Yardımcı fonksiyonlar
│   ├── App.tsx           # Ana uygulama
│   ├── main.tsx          # Giriş noktası
│   └── index.css         # Global stiller
├── package.json          # Proje ayarları
├── vite.config.ts        # Vite konfigürasyonu
├── tailwind.config.js    # Tailwind CSS ayarları
├── tsconfig.json         # TypeScript ayarları
└── README.md             # Proje dokümantasyonu
```

## 🎯 Geliştirme İpuçları

### Hot Reload
Kod değişiklikleriniz otomatik olarak tarayıcıda görünür.

### TypeScript Desteği
VS Code kullanıyorsanız, otomatik tip kontrolü ve IntelliSense desteği alırsınız.

### Tailwind CSS
Utility-first CSS framework kullanılıyor. [Tailwind dokümantasyonu](https://tailwindcss.com/docs) referans alabilirsiniz.

### Debugging
- Tarayıcı Developer Tools (F12)
- React Developer Tools eklentisi önerilir

## 📦 Production Build

Canlı ortam için build almak:
```bash
npm run build
```

Build dosyaları `dist/` klasöründe oluşur.

Preview için:
```bash
npm run preview
```

## 🆘 Yardım

Sorun yaşıyorsanız:
1. Bu dosyayı tekrar okuyun
2. Terminal'deki hata mesajlarını kontrol edin
3. Node.js ve npm sürümlerinizi kontrol edin
4. İnternet bağlantınızı kontrol edin
5. Antivirus yazılımınızın npm'i engellemediğinden emin olun

**Sistem Gereksinimleri:**
- Node.js 18+ 
- npm 8+
- Modern tarayıcı (Chrome, Firefox, Safari, Edge)
- En az 2GB RAM
- En az 500MB disk alanı