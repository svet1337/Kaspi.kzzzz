
# Vercel + PlanetScale — приватный сайт (логин вручную)

## Что в этом архиве
- index.html — страница входа
- protected.html — приватная страница
- api/login.js — Vercel Serverless function (Node.js) для проверки логина
- config.js — подключение к базе (использует переменные окружения)
- schema.sql — SQL схема таблицы users
- package.json — зависимости (mysql2)
- README.md — инструкция

## Шаги деплоя (кратко)
1. Создай базу в PlanetScale и подключи её (Console -> Database -> Create).
2. Выполни `schema.sql` в PlanetScale Console -> Query, чтобы создать таблицу `users`.
3. Добавь пользователей вручную:
   INSERT INTO users (username, password) VALUES ('admin', '12345');
4. Создай репозиторий на GitHub и закинь этот проект в него.
5. На Vercel создай новый проект, привяжи репозиторий.
6. В Vercel -> Settings -> Environment Variables добавь:
   DB_HOST, DB_USER, DB_PASS, DB_NAME
7. Деплой.

Примечание: пароли в этой версии хранятся в открытом виде — при желании можно заменить на bcrypt.
