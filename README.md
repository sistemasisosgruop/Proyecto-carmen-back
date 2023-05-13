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

| Name           | Type     | Description                                       |
|----------------|----------|---------------------------------------------------|
| id             | UUID     | Unique identifier of the user (automatically generated). |
| first_name     | String   | User's first name.                                |
| last_name      | String   | User's last name.                                 |
| email          | String   | User's email address.                             |
| password       | String   | User's password.                                  |
| genre          | String   | User's gender.                                    |
| phone_number   | BigInt   | User's phone number.                              |
| country_code   | Integer  | Phone ID of the user's country.                   |
| document_type  | String   | User's document type.                             |
| document_number| Number   | User's document number.                           |
| birthday       | Date     | User's date of birth.                             |
| student        | Boolean  | Indicator if the user is a student or not.        |
| role_id        | String   | ID of the user's role.                            |

#### Example Request

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "genre": "Male",
  "phone_number": "56541154",
  "country_code": "+21",
  "document_type": "Passport",
  "document_number": 123456789,
  "birthday": "1990-01-01",
  "student": true,
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
  "email": "john.doe@example.com",
  "genre": "Male",
  "country_code": "+21",
  "phone_number": "56541154",
  "document_type": "Passport",
  "document_number": 123456789,
  "birthday": "1990-01-01",
  "student": true,
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
        "email": "nicolas@mail.com",
        "password": "1234",
        "genre": "Male",
        "phone_number": "312454850",
        "country_code": "+57",
        "document_type": "Passport",
        "document_number": 123455,
        "birthday": "01-01-1993",
        "student": false,
        "role_id": "USER",
        "created_at": "2023-05-08T00:09:08.093Z",
        "updated_at": "2023-05-08T00:09:08.093Z"
      },
      {
        "id": "e365dD66-40fc-4b4b-d5t2-767a3cfea875",
        "first_name": "John",
        "last_name": "Douglas",
        "email": "john@mail.com",
        "password": "1234",
        "genre": "Male",
        "phone_number": "34554112",
        "country_code": "+32",
        "document_type": "ID",
        "document_number": "9874566",
        "birthday": "02-02-1944",
        "student": false,
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

| Name           | Type     | Description                             |
|----------------|----------|-----------------------------------------|
| first_name     | String   | Updated first name of the user.         |
| last_name      | String   | Updated last name of the user.          |
| genre          | String   | Updated gender of the user.             |
| phone_number   | BigInt   | Updated phone_number of the user.       |
| country_code   | Integer  | Updated phone ID of the user's country. |
| document_type  | String   | Updated document type of the user.      |
| document_number| Number   | Updated document number of the user.    |
| birthday       | Date     | Updated date of birth of the user.      |
| student        | Boolean  | Updated student status of the user.     |


#### Example Request

```json
{
  "first_name": "John",
  "last_name": "Smith",
  "genre": "Male",
  "phone_number": "985654123",
  "country_code": "+57",
  "document_type": "Passport",
  "document_number": 987654321,
  "birthday": "1990-05-20",
  "student": true,
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
### Initiate Password Recovery

Initiate the password recovery process by providing the user's email. A password recovery token will be sent to the user's email address.

- URL: `https://localhost:3000/api/v1/auth/recovery-password`
- Method: POST
- Content Type: application/json

#### Parameters

The request body should include the following parameter:

| Name  | Type   | Description               |
|-------|--------|---------------------------|
| email | String | User's email address.     |

#### Example Request

```json
{
  "email": "john.doe@example.com"
}
```

### Reset Password

Reset the user's password using the recovery token received via email.

- URL: `https://localhost:3000/api/v1/auth/recovery-password/:token`
- Method: PATCH
- Content Type: application/json

#### Parameters

The request body should include the following parameter:

| Name     | Type   | Description                   |
|----------|--------|-------------------------------|
| password | String | New password for the user.    |

#### Example Request

```json
{
  "password": "newpassword123"
}
```

### Send Message

Send a message to a recipient.

- URL: `https://localhost:3000/api/v1/message/:id`
- Method: POST
- Content Type: application/json

#### Parameters

The request should include the following parameters:

##### URL Parameters

| Name      | Type   | Description                    |
|-----------|--------|--------------------------------|
| id        | String | ID of the message recipient.   |

##### Request Body

The request body should include the following parameters:


| Name          | Type   | Description                                    |
|---------------|--------|------------------------------------------------|
| req.user.id   | String | ID of the message sender from the user request.|
| content       | String | Content of the message.                        |
| subject       | String | Subject of the message.                        |


#### Example Request

URL: `https://localhost:3000/api/v1/message/recipientId`

```json
{
  "senderId": "senderId",
  "content": "This is the message content.",
  "subject": "Message Subject"
}
```

#### Successful Response

Status Code: 200 OK

```json
{
  "message": "Message sent successfully",
  "messageContent": {
    "id": "5f810ebb-64b6-4919-8026-3f9bdf827259",
    "sender_id": "55b3d953-4000-49cf-b821-09a4ad04daf6",
    "recipient_id": "9e48bd86-dc15-4d32-b375-abf3665c61b5",
    "sender_first_name": "John",
    "sender_last_name": "Douglas",
    "sender_email": "john@mail.com",
    "sender_phone_number": "5432184321",
    "sender_country_code": "1",
    "sender_document_type": "Passport",
    "sender_document_number": 123456789,
    "subject": "Hello world",
    "content": "Hello! This is my first message",
    "attachment"
  }
}
```
