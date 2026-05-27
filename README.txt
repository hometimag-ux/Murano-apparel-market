murano-site/
├── index.html              # Главная страница (сборщик виджетов)
├── admin.html              # Админ-панель для настройки виджетов
├── css/
│   ├── site.css            # Стили сайта
│   └── admin.css           # Стили админки
├── js/
│   ├── site-core.js        # Ядро: загрузка виджетов, Liquid-подобный движок
│   ├── admin.js            # Логика админки (drag & drop, настройки)
│   └── widgets.js          # Регистрация всех виджетов
├── widgets/                # Папка с виджетами
│   ├── promo-slider/
│   │   ├── widget.html
│   │   ├── widget.css
│   │   └── settings.json
│   ├── product-grid/
│   │   ├── widget.html
│   │   ├── widget.css
│   │   └── settings.json
│   ├── header-banner/
│   │   ├── widget.html
│   │   ├── widget.css
│   │   └── settings.json
│   ├── category-list/
│   │   ├── widget.html
│   │   ├── widget.css
│   │   └── settings.json
│   └── footer-subscribe/
│       ├── widget.html
│       ├── widget.css
│       └── settings.json
├── data/
│   └── store-data.json     # Товары, категории, настройки (копия из CRM)
└── assets/
    └── images/             # Изображения товаров
