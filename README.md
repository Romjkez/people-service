# Сервис "Люди"
*ENGLISH VERSION OF DOC*: https://github.com/Romjkez/people-service/blob/master/README-en.md

Разработан с помощью Nest JS
## Получение списка людей
- Метод: GET
- Путь: /person
- Тело запроса (JSON): пустое
- URL параметры: 
    - `query`* - поиск по любой части имени, фамилии, отчества или email
    
    ИЛИ**
    - `firstName` - поиск по имени
    - `lastName` - поиск по фамилии
    - `middleName` - поиск по отчеству
    - `email` - поиск по email
    
\* `query` - приоритетный параметр, если он указан, то `firstName`, `lastName`, `middleName`, `email` будут проигнорированы

\** - поиск по полям `firstName`/`lastName`/`middleName`/`email` можно комбинировать; 

- Формат ответа: JSON массив с людьми ИЛИ [ошибка](#Ошибки)

Если не указан ни один URL параметр, то будут возвращены все люди из базы данных.

## Получение человека по ID
- Метод: GET
- Путь: /person/{id}
- Тело запроса (JSON): пустое
- URL параметры: отсутствуют
- Формат ответа: JSON объект (человек) ИЛИ [ошибка](#Ошибки)

## Добавление человека
- Метод: POST
- Путь: /person
- Тело запроса (JSON): 
    - `fistName`* - имя
    - `middleName`* - отчество
    - `lastName`* - фамилия
    - `email`* - эл. почта
    - `phone` - номер телефона (до 20 цифр без спец. символов и пробелов)
    - `gender` - пол (доступные значения: *male* или *female*)
    - `birthday` - дата рождения (должна соответствовать формату: ГГГГ-ММ-ДД)
- URL параметры: отсутствуют
- Формат ответа: JSON объект формата `CreateResult` ИЛИ [ошибка](#Ошибки)

Модель ответа `CreateResult`:
```js
{
    data: Person, // сама модель объекта Person
    wasFound: boolean // если true - человек существует и возвращён из БД; false - создан и сохранён в БД
}
```
Пример: 
```json
{
  "data": {
    "firstName": "Vladimir",
    "middleName": "Vladimirovich",
    "lastName": "Putin",
    "email": "example0000@mail.com",
    "birthday": "1999-06-28",
    "gender": "male",
    "phone": 88005553535,
    "updatedBy": null,
    "updatedAt": null,
    "id": 39,
    "createdAt": "2019-12-05T15:42:08.000Z"
  },
  "wasFound": false
}
```

\* - обязательные поля

## Редактирование человека
- Метод: PUT
- Путь: /person/{id}
- Тело запроса (JSON): 
    - `gender` - пол (доступные значения: *male* или *female*)
    - `birthday` - дата рождения (должна соответствовать формату: ГГГГ-ММ-ДД)
    - `phone` - номер телефона (до 20 цифр без спец. символов и пробелов)
    - *`updatedBy` - наименование сервиса, вносящего изменения
- URL параметры: отсутствуют
- Формат ответа: JSON объект (человек) ИЛИ [ошибка](#Ошибки)

\* - обязательные поля

## Удаление человека
- Метод: DELETE
- Путь: /person/{id}
- Тело запроса (JSON): пустое
- URL параметры: отсутствуют
- Формат ответа: JSON объект с полями:
    - `affectedRows` - кол-во затронутых (удалённых) записей в базе данных
    - `ok` - успешно ли удаление (*true* или *false*)
   
  ИЛИ [ошибка](#Ошибки)

## Ошибки
Представляют из себя объект с полями:
- `statusCode` - HTTP код ошибки
- `error` - соответствующий HTTP коду текст ошибки
- `message` - текст ошибки, отправленный сервисом

Например:
```json
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "Could not find any entity of type \"Person\" matching: \"31123\""
}
```
