# Bomi Korean (PWA)
Статический сайт без сборки (HTML/CSS/JS). Node и npm не нужны.

## Деплой на Vercel
**Способ 1 — через GitHub (рекомендую):**
1. Создай репозиторий на github.com и загрузи в него все файлы из этой папки (Add file → Upload files).
2. На vercel.com: Add New → Project → выбери репозиторий.
3. Framework Preset: **Other**. Build Command и Output Directory оставь пустыми. Нажми Deploy.

**Способ 2 — через CLI:**
```
npm i -g vercel
cd bomi-korean
vercel --prod
```

## Установка как приложение
Открой сайт на телефоне → «Поделиться» → «На экран Домой» (iOS) или «Установить» (Android/Chrome).

## ИИ (учитель Bomi и медведь Комдори)
1. Ключ API: console.anthropic.com → API Keys (это отдельная оплата, не подписка Claude). Поставь лимит расходов в Billing.
2. Vercel → Project → Settings → Environment Variables → `ANTHROPIC_API_KEY` = твой ключ (Production). Затем Deployments → Redeploy.
3. Функция лежит в `api/chat.js`; модель по умолчанию `claude-haiku-5-5` (меняется переменной `CLAUDE_MODEL`).
Без ключа приложение работает, ИИ отвечает простым поиском по словарю.

## Картинки
Положи файлы в папку `img/` с именами из `img/FILENAMES.txt` (например `apple.png`). Если файла нет, показывается эмодзи.
