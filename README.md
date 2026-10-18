# موربات

صفحه‌ی معرفی موربات، ربات پنل‌ساز تلگرام.

سایت کاملاً استاتیک است و در پوشه‌ی `site/` قرار دارد: `index.html`، `style.css`، `main.js` و `favicon.svg`. هیچ وابستگی یا مرحله‌ی بیلدی ندارد.

## اجرا روی سیستم خودتان

```bash
npx serve site
```

## انتشار

با هر push روی شاخه‌ی `master`، گیت‌هاب اکشن (`.github/workflows/pages.yml`) محتوای `site/` را روی GitHub Pages منتشر می‌کند.

یک بار در تنظیمات ریپو، بخش **Settings → Pages**، مقدار **Source** را روی **GitHub Actions** بگذارید.
