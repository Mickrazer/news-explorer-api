# news-explorer-api

Команда npm run start запускает сервер на localhost:3000;

Команда npm run dev запускает сервер на localhost:3000 с хот релоудом;

Публичный IP: 84.201.164.115

Адрес  API: api.mestoekbmik.site

Возможные запросы:

- GET .site/users/me - возвращает информацию о пользователе(email и имя);

- GET .site/articles - все сохраненные статьи;

- POST .site/articles - создает статью с переданными в теле данными;

- DELETE .site/articles/articleId - удаляет сохраненую статью по Id;

- POST .site/signin - возвращает JWT, если в теле запроса переданы правильные почта и пароль;

- POST .site/signup - создает пользователя с переданными в теле данными;
