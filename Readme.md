# Личный проект «Шесть городов»

* Студент: [Евгений Харитонов](https://up.htmlacademy.ru/nodejs-api/2/user/1931709).
* Наставник: [Олег Зубов](https://up.htmlacademy.ru/nodejs-api/2/user/1931709).

---

_Не удаляйте и не изменяйте папки и файлы:_
_`.editorconfig`, `.gitattributes`, `.gitignore`._

---

## Памятка

### 1. Зарегистрируйтесь на Гитхабе

Если у вас ещё нет аккаунта на [github.com](https://github.com/join), скорее зарегистрируйтесь.

### 2. Создайте форк

Откройте репозиторий и нажмите кнопку «Fork» в правом верхнем углу. Репозиторий из Академии будет скопирован в ваш аккаунт.

<img width="769" alt="Press 'Fork'" src="https://cloud.githubusercontent.com/assets/259739/20264045/a1ddbf40-aa7a-11e6-9a1a-724a1c0123c8.png">

Получится вот так:

<img width="769" alt="Forked" src="https://cloud.githubusercontent.com/assets/259739/20264122/f63219a6-aa7a-11e6-945a-89818fc7c014.png">

### 3. Клонируйте репозиторий на свой компьютер

Будьте внимательны: нужно клонировать свой репозиторий (форк), а не репозиторий Академии. Также обратите внимание, что клонировать репозиторий нужно через SSH, а не через HTTPS. Нажмите зелёную кнопку в правой части экрана, чтобы скопировать SSH-адрес вашего репозитория:

<img width="769" alt="SSH" src="https://cloud.githubusercontent.com/assets/259739/20264180/42704126-aa7b-11e6-9ab4-73372b812a53.png">

Клонировать репозиторий можно так:

```
git clone SSH-адрес_вашего_форка
```

Команда клонирует репозиторий на ваш компьютер и подготовит всё необходимое для старта работы.

### 4. Начинайте обучение!

---

<a href="https://htmlacademy.ru/profession/fullstack"><img align="left" width="50" height="50" title="HTML Academy" src="https://up.htmlacademy.ru/static/img/intensive/nodejs/logo-for-github-2.png"></a>

Репозиторий создан для обучения на профессиональном онлайн‑курсе «[Node.js. Профессиональная разработка REST API](https://htmlacademy.ru/profession/fullstack)» от [HTML Academy](https://htmlacademy.ru).


### 5. Список переменных окружения

DB_USER=admin - Логин для входа в базу данных.
---
DB_PASSWORD=test - Пароль для входу в базу данных.
---
DB_HOST=127.0.0.1 - Локальный хостинг базы данных.
---
DB_NAME=1931709-six-cities-2 - Название базы данных.
---
SALT=secret - Соль для кодировки пароля.
---
UPLOAD_DIRECTORY=./upload - Директория для загрузки изображений.
---
JWT_SECRET=secret - JSON Web Token.
---
STATIC_DIRECTORY_PATH=static - Папка со статичными изображениями. Необходимо для подстановки маршрута.

### 6. Запуск приложения.

Для запуска приложения необходимо поключиться к базе данных Mongo DB.
Используя докер или иным способом.
---

Подключение при помощи docker: 

docker-compose up -d

Файл с настройками docker в корне проекта docker-compose.yml
---
Запуск сервера осущеcтвляется командой:

npm run start:dev

При запуске выводятся все необходимые для дальнейшей работы сообщения.
---

Cli команды:

        --version:                     # выводит номер версии
        --help:                        # выводит помощь
        --import <path>:               # выводит импорт из TSV
        --generator <n> <path> <url>:  # генерирует произвольное количество текстовых данных


В корне проекта файл с примерами запросов:

queries.http

### 7. Сценарии.

npm run start - Запуск сервера.
---
npm run start:dev - Запуск приложения при помощи nodemon.
---
npm run mock:server - Запуск мокового json сервера.
---
npm run ts - Запуск компилятора typeScript.