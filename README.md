# Carmen Travel and Tourism Agency API Documentation

This documentation describes the Carmen Travel and Tourism Agency API, which allows interaction with various user-related resources.

## Requirements

- Node.js 18.16
- npm (Node Package Manager)

## Installation

1. Clone the Carmen Travel and Tourism Agency API repository.
```
git clone https://github.com/Nicccccolas/api-carmentravel
```
2. Navigate to the root directory of the project.
```
cd proyectoAgenciaCarmen
```
3. Install all project dependencies.
```
npm install
```
4. Perform Sequelize migrations to set up the database.
```
npx sequelize-cli db:migrate
```

## Endpoints

### Create a User

Create a new user in the database.

- URL: `https://localhost:3000/api/v1/users`
- Method: POST
- Content Type: application/json

#### Parameters

| Name          | Type     | Description                                       |
|---------------|----------|---------------------------------------------------|
| id            | UUID     | Unique identifier of the user (automatically generated). |
| first_name    | String   | User's first name.                                |
| last_name     | String   | User's last name.                                 |
| genre         | String   | User's gender.                                    |
| document_type | String   | User's document type.                             |
| number_id     | Number   | User's document number.                           |
| email         | String   | User's email address.                             |
| password      | String   | User's password.                                  |
| birthday      | Date     | User's date of birth.                             |
| student       | Boolean  | Indicator if the user is a student or not.        |
| country_id    | Number   | ID of the user's country.                         |
| role_id       | String   | ID of the user's role.                            |

#### Example Request

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "genre": "Male",
  "document_type": "Passport",
  "number_id": 123456789,
  "email": "john.doe@example.com",
  "password": "password123",
  "birthday": "1990-01-01",
  "student": true,
  "country_id": 1,
  "role_id": "user"
}
``` 

### Successful Response

Status Code: 201 Created

```json
{
  "id": "c2baf2c8-6f55-4e78-9a13-ec8e14f380e3",
  "first_name": "John",
  "last_name": "Doe",
  "genre": "Male",
  "document_type": "Passport",
  "number_id": 123456789,
  "email": "john.doe@example.com",
  "birthday": "1990-01-01",
  "student": true,
  "country_id": 1,
  "role_id": "user",
  "createdAt": "2023-05-07T12:00:00.000Z",
  "updatedAt": "2023-05-07T12:00:00.000Z"
}
``` 
### Get All Users

Retrieve a paginated list of all created users in the database.

- URL: `https://localhost:3000/api/v1/users`
- Method: GET
- Content Type: application/json

#### Parameters

No parameters are required for this request.

#### Successful Response

Status Code: 200 OK

```json
{
  "results": {
    "count": 2,
    "totalPages": 1,
    "currentPage": 1,
    "results": [
      {
        "id": "e364fdf9-40fc-4b4b-b1e0-767a3cfea541",
        "first_name": "Nicolas",
        "last_name": "Cortez",
        "genre": "Male",
        "document_type": "Passport",
        "number_id": 123455,
        "email": "nicolas@mail.com",
        "password": "1234",
        "birthday": "01-01-1993",
        "student": false,
        "country_id": 2,
        "role_id": "USER",
        "created_at": "2023-05-08T00:09:08.093Z",
        "updated_at": "2023-05-08T00:09:08.093Z"
      },
      {
        "id": "e365dD66-40fc-4b4b-d5t2-767a3cfea875",
        "first_name": "John",
        "last_name": "Douglas",
        "genre": "Male",
        "document_type": "ID",
        "number_id": "9874566",
        "email": "john@mail.com",
        "password": "1234",
        "birthday": "02-02-1944",
        "student": false,
        "country_id": 1,
        "role_id": "ADMIN",
        "created_at": "2023-05-08T00:09:08.093Z",
        "updated_at": "2023-05-08T00:09:08.093Z"
      }
    ]
  }
}
```

### Update User Data

Update the data of a user, excluding email and password.

- URL: `https://localhost:3000/api/v1/users`
- Method: PUT
- Content Type: application/json

#### Parameters

The request body should include the following parameters:

| Name          | Type     | Description                            |
|---------------|----------|----------------------------------------|
| first_name    | String   | Updated first name of the user.         |
| last_name     | String   | Updated last name of the user.          |
| genre         | String   | Updated gender of the user.             |
| document_type | String   | Updated document type of the user.      |
| number_id     | Number   | Updated document number of the user.    |
| birthday      | Date     | Updated date of birth of the user.      |
| student       | Boolean  | Updated student status of the user.     |
| country_id    | Number   | Updated ID of the user's country.       |


#### Example Request

```json
{
  "first_name": "John",
  "last_name": "Smith",
  "genre": "Male",
  "document_type": "Passport",
  "number_id": 987654321,
  "birthday": "1990-05-20",
  "student": true,
  "country_id": 1,
}
```


### User Login

Authenticate a user by providing their email and password.

- URL: `https://localhost:3000/api/v1/auth/login`
- Method: POST
- Content Type: application/json

#### Parameters

The request body should include the following parameters:

| Name     | Type   | Description                 |
|----------|--------|-----------------------------|
| email    | String | User's email address.       |
| password | String | User's password.            |

#### Example Request

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```
