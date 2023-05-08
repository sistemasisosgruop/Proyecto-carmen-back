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






