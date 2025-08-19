# Turkcell Roaming Asistanı

Kullanıcının seyahat planına göre en ekonomik roaming çözümünü öneren, maliyet simülasyonu yapan ve uyarılar üreten web uygulaması.

## 🚀 Özellikler

- **Kullanıcı & Seyahat Girişi**: Kullanıcı seçimi, çoklu ülke seyahat planı, özelleştirilebilir kullanım profili
- **Maliyet Simülasyonu**: Gerçek zamanlı paket karşılaştırması ve en ekonomik seçenek önerisi
- **Akıllı Uyarılar**: Paket geçerliliği, kapsama ve aşım uyarıları
- **İşlem Akışı**: Mock paket aktivasyonu ve top-up hesaplaması
- **Responsive Tasarım**: Mobil ve masaüstü uyumlu modern arayüz

## 📋 Gereksinimler

- Node.js (v18 veya üzeri)
- npm veya yarn

## 🛠️ Kurulum

1. **Projeyi klonlayın veya indirin**
   ```bash
   # Eğer git kullanıyorsanız
   git clone <repository-url>
   cd turkcell-roaming-assistant
   ```

2. **Bağımlılıkları yükleyin**
   ```bash
   npm install
   ```

3. **Development server'ı başlatın**
   ```bash
   npm run dev
   ```

4. **Tarayıcınızda açın**
   ```
   http://localhost:5173
   ```

## 📦 Kullanılabilir Komutlar

- `npm run dev` - Development server başlatır
- `npm run build` - Production build oluşturur
- `npm run preview` - Build'i önizleme modunda çalıştırır
- `npm run lint` - ESLint ile kod kontrolü yapar

## 🏗️ Proje Yapısı

```
src/
├── components/          # React bileşenleri
│   ├── AlertsPanel.tsx
│   ├── CostSimulationResults.tsx
│   ├── PackageCard.tsx
│   ├── ProcessFlow.tsx
│   ├── TopUpCalculator.tsx
│   ├── TravelPlanForm.tsx
│   ├── UsageProfileForm.tsx
│   └── UserSelection.tsx
├── data/               # Mock veriler
│   └── mockData.ts
├── types/              # TypeScript tip tanımları
│   └── index.ts
├── utils/              # Yardımcı fonksiyonlar
│   └── costCalculator.ts
├── App.tsx             # Ana uygulama bileşeni
├── main.tsx           # Uygulama giriş noktası
└── index.css          # Global stiller
```

## 🎨 Teknolojiler

- **React 18** - UI framework
- **TypeScript** - Tip güvenliği
- **Tailwind CSS** - Styling
- **Vite** - Build tool ve dev server
- **Lucide React** - İkonlar

## 📱 Kullanım

1. **Kullanıcı Seçimi**: Dropdown'dan bir kullanıcı seçin
2. **Seyahat Planı**: Gideceğiniz ülkeleri ve tarihleri belirleyin
3. **Kullanım Profili**: Günlük data, arama ve SMS kullanımınızı ayarlayın
4. **Sonuçları İnceleyin**: En ekonomik paket önerilerini görün
5. **Paket Seçin**: İstediğiniz paketi seçip mock aktivasyon yapın

## 🔧 Özelleştirme

### Yeni Ülke Ekleme
`src/data/mockData.ts` dosyasındaki `countries` array'ine yeni ülke ekleyin:

```typescript
{
  code: 'XX',
  name: 'Ülke Adı',
  region: 'Bölge',
  flag: '🏳️'
}
```

### Yeni Paket Ekleme
`src/data/mockData.ts` dosyasındaki `roamingPackages` array'ine yeni paket ekleyin:

```typescript
{
  id: 'unique-id',
  name: 'Paket Adı',
  type: 'regional' | 'country' | 'global',
  regions: ['Bölge'],
  countries: ['XX'],
  data: 5, // GB
  voice: 100, // dakika
  sms: 50, // adet
  price: 149, // TL
  validity: 7, // gün
  description: 'Paket açıklaması',
  features: ['Özellik 1', 'Özellik 2']
}
```

## 🐛 Sorun Giderme

### Port zaten kullanımda hatası
```bash
# Farklı port kullanın
npm run dev -- --port 3000
```

### Node modules hatası
```bash
# Node modules'ü temizleyin ve yeniden yükleyin
rm -rf node_modules package-lock.json
npm install
```

### Build hatası
```bash
# TypeScript hatalarını kontrol edin
npm run lint
```

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📞 Destek

Herhangi bir sorun yaşarsanız:
- GitHub Issues kullanın
- Dokümantasyonu kontrol edin
- README dosyasını inceleyin