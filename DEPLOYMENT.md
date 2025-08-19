# Deployment Rehberi

## 🌐 Canlı Ortama Alma Seçenekleri

### 1. Netlify (Önerilen)

**Adım 1**: [netlify.com](https://netlify.com) hesabı oluşturun

**Adım 2**: Build alın
```bash
npm run build
```

**Adım 3**: `dist` klasörünü Netlify'a sürükle-bırak yapın

**Adım 4**: Otomatik deployment tamamlanır

### 2. Vercel

**Adım 1**: [vercel.com](https://vercel.com) hesabı oluşturun

**Adım 2**: Vercel CLI yükleyin
```bash
npm i -g vercel
```

**Adım 3**: Deploy edin
```bash
vercel --prod
```

### 3. GitHub Pages

**Adım 1**: GitHub repository oluşturun

**Adım 2**: `vite.config.ts` dosyasını güncelleyin:
```typescript
export default defineConfig({
  plugins: [react()],
  base: '/repository-name/',
  build: {
    outDir: 'dist'
  }
});
```

**Adım 3**: Build script ekleyin `package.json`'a:
```json
{
  "scripts": {
    "deploy": "npm run build && npx gh-pages -d dist"
  }
}
```

**Adım 4**: gh-pages yükleyin ve deploy edin:
```bash
npm install --save-dev gh-pages
npm run deploy
```

### 4. Firebase Hosting

**Adım 1**: Firebase CLI yükleyin
```bash
npm install -g firebase-tools
```

**Adım 2**: Firebase'e login olun
```bash
firebase login
```

**Adım 3**: Projeyi initialize edin
```bash
firebase init hosting
```

**Adım 4**: Build alın ve deploy edin
```bash
npm run build
firebase deploy
```

## 🔧 Build Optimizasyonu

### Bundle Analizi
```bash
npm run build
npx vite-bundle-analyzer dist
```

### Environment Variables
Production için `.env.production` dosyası oluşturun:
```
VITE_APP_TITLE=Turkcell Roaming Asistanı
VITE_API_URL=https://api.turkcell.com.tr
```

### Performance Optimizasyonu
- Lazy loading kullanın
- Image optimization yapın
- Bundle size'ı kontrol edin
- Caching stratejileri uygulayın

## 📊 Monitoring

### Analytics Ekleme
Google Analytics veya benzeri servisler için `index.html`'e script ekleyin.

### Error Tracking
Sentry veya benzeri error tracking servisleri entegre edin.

### Performance Monitoring
Web Vitals metrikleri takip edin.

## 🔒 Güvenlik

### HTTPS
Tüm deployment platformları otomatik HTTPS sağlar.

### CSP Headers
Content Security Policy headers ekleyin.

### Environment Variables
Hassas bilgileri environment variables'da saklayın.

## 🚀 CI/CD Pipeline

### GitHub Actions Örneği
`.github/workflows/deploy.yml`:
```yaml
name: Deploy to Netlify
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v1.2
        with:
          publish-dir: './dist'
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## 📋 Deployment Checklist

- [ ] Build başarılı
- [ ] Tüm sayfalar çalışıyor
- [ ] Responsive tasarım test edildi
- [ ] Performance test edildi
- [ ] SEO optimizasyonu yapıldı
- [ ] Analytics eklendi
- [ ] Error tracking eklendi
- [ ] HTTPS aktif
- [ ] Custom domain ayarlandı (opsiyonel)
- [ ] Backup stratejisi belirlendi