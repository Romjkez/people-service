# People Service
Service for saving and getting people data. Developed with NestJS

## Get people list
- Method: GET
- Path: /person
- Body (JSON): empty
- Query params:
  - `query`* - search by any part of first name, last name, middle name or email

  OR**
  - `firstName` - search by first name
  - `lastName` - search by last name
  - `middleName` - search by middle name
  - `email` - search by email

\* `query` is priotirized param, if `query` and  `firstName`, `lastName`, `middleName`, `email` provided, only `query` will be applied

\** - search by fields: `firstName`/`lastName`/`middleName`/`email` can be combined;

- Response format: JSON array with people OR [error](#Errors)

If no query params provided, then all the people will be returned.

## Get person by ID
- Method: GET
- Path: /person/{id}
- Body (JSON): empty
- Query params: empty
- Response format: JSON object (Person) OR [error](#Errors)

## Add a person
- Method: POST
- Path: /person
- Body (JSON):
  - `fistName`* - first name
  - `middleName`* - middle name
  - `lastName`* - last name
  - `email`* - email
  - `phone` - phone number (up to 20 digits without special chars and spaces)
  - `gender` - gender (available values: *male* или *female*)
  - `birthday` - birthday (required format: YYYY-MM-DD)
- Query params: empty
- Response format: JSON object `CreateResult` OR [error](#Errors)

Response model `CreateResult`:
```js
{
    data: Person, // Person object
    wasFound: boolean // if true - person is already existing and was found in database; false - created and saved
}
```
Example:
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

\* - required fields

## Редактирование человека
- Method: PUT
- Path: /person/{id}
- Body (JSON):
  - `gender` - gender (available values: *male* или *female*)
  - `birthday` - birthday (required format: YYYY-MM-DD)
  - `phone` - phone number (up to 20 digits without special chars and spaces)
  - *`updatedBy` - name of issuer (for external services)
- Query params: empty
- Response format: JSON object (Person) OR [error](#Errors)

\* - required fields

## Delete person
- Method: DELETE
- Path: /person/{id}
- Body (JSON): empty
- Query params: empty
- Response format: JSON object with fields:
  - `affectedRows` - number of touched (deleted) rows in database
  - `ok` - if deletion was successfull (*true* or *false*)

  OR [error](#Errors)

## Errors
Object with fields:
- `statusCode` - HTTP error code;
- `error` - associated HTTP error code text;
- `message` - text of error generated by service.

Example:
```json
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "Could not find any entity of type \"Person\" matching: \"31123\""
}
```
