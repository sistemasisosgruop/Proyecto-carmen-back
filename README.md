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

| Name            | Type    | Description                                              |
| --------------- | ------- | -------------------------------------------------------- |
| id              | UUID    | Unique identifier of the user (automatically generated). |
| first_name "    | String  | User.photo4"s"https://bucket.aws.photo3" first name.     |
| last_name       | String  | User's last name.                                        |
| email           | String  | User's email address.                                    |
| password        | String  | User's password.                                         |
| genre           | String  | User's gender.                                           |
| phone_number    | BigInt  | User's phone number.                                     |
| country_code    | Integer | Phone ID of the user's country.                          |
| document_type   | String  | User's document type.                                    |
| document_number | Number  | User's document number.                                  |
| birthday        | Date    | User's date of birth.                                    |
| student         | Boolean | Indicator if the user is a student or not.               |
| role_id         | String  | ID of the user's role.                                   |

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

| Name            | Type    | Description                             |
| --------------- | ------- | --------------------------------------- |
| first_name      | String  | Updated first name of the user.         |
| last_name       | String  | Updated last name of the user.          |
| genre           | String  | Updated gender of the user.             |
| phone_number    | BigInt  | Updated phone_number of the user.       |
| country_code    | Integer | Updated phone ID of the user's country. |
| document_type   | String  | Updated document type of the user.      |
| document_number | Number  | Updated document number of the user.    |
| birthday        | Date    | Updated date of birth of the user.      |
| student         | Boolean | Updated student status of the user.     |

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
  "student": true
}
```

### User Login

Authenticate a user by providing their email and password.

- URL: `https://localhost:3000/api/v1/auth/login`
- Method: POST
- Content Type: application/json

#### Parameters

The request body should include the following parameters:

| Name     | Type   | Description           |
| -------- | ------ | --------------------- |
| email    | String | User's email address. |
| password | String | User's password.      |

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

| Name  | Type   | Description           |
| ----- | ------ | --------------------- |
| email | String | User's email address. |

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

| Name     | Type   | Description                |
| -------- | ------ | -------------------------- |
| password | String | New password for the user. |

#### Example Request

```json
{
  "password": "newpassword123"
}
```

### Send Message

Send a message to a recipient. Messages can only be sent to administrators, not between regular users.

- URL: `https://localhost:3000/api/v1/message/:id`
- Method: POST
- Content Type: application/json

#### Parameters

The request should include the following parameters:

##### URL Parameters

| Name | Type   | Description                  |
| ---- | ------ | ---------------------------- |
| id   | String | ID of the message recipient. |

##### Request Body

The request body should include the following parameters:

| Name        | Type   | Description                                     |
| ----------- | ------ | ----------------------------------------------- |
| req.user.id | String | ID of the message sender from the user request. |
| content     | String | Content of the message.                         |
| subject     | String | Subject of the message.                         |

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

### Create Room

Create a new room. This endpoint is only accessible to administrators.

- URL: `https://localhost:3000/api/v1/rooms`
- Method: POST
- Content Type: application/json

#### Parameters

The request should include the following parameters:

##### Request Body

The request body should include the following parameters:

| Name          | Type   | Description                                                                                    |
| ------------- | ------ | ---------------------------------------------------------------------------------------------- |
| room_type     | String | Type of the room.                                                                              |
| description   | String | Description of the room.                                                                       |
| address       | String | Address of the room.                                                                           |
| price         | Number | Price of the room.                                                                             |
| check_in      | Date   | Check-in date for the room.                                                                    |
| check_out     | Date   | Check-out date for the room.                                                                   |
| num_bathrooms | Number | Number of bathrooms in the room.                                                               |
| num_beds      | Number | Number of beds in the room.                                                                    |
| extras        | Array  | Additional features or extras offered in the room.                                             |
| details       | Object | Details about the room, including images, amenities, not included services, and room services. |
| num_room      | Object | Details about the room type, including room type, number of beds, bed type, and room images.   |

##### details Object

The `details` object should include the following parameters:

| Name         | Type  | Description                                                     |
| ------------ | ----- | --------------------------------------------------------------- |
| images_url   | Array | An array of strings representing the images of the room.        |
| amenities    | Array | An array of strings listing the amenities provided in the room. |
| not_included | Array | An array of strings specifying what is not included.            |
| services     | Array | An array of strings listing the services available.             |

##### num_room Object

The `num_room` object should include the following parameters:

| Name       | Type   | Description                                |
| ---------- | ------ | ------------------------------------------ |
| type_room  | String | Type of the room number.                   |
| num_bed    | Number | Number of beds in the room number.         |
| type_bed   | String | Type of the bed in the room number.        |
| type_bed_2 | String | Additional type of bed in the room number. |
| images_url | String | Images of the room number.                 |

#### Example Request

URL: `https://localhost:3000/api/v1/rooms`

```json
{
  "room_type": "Deluxe Suite",
  "description": "Spacious and luxurious suite with a stunning view of the city.",
  "address": "123 Main Street, Cityville",
  "price": 200,
  "check_in": "2023-05-15T00:00:00.000Z",
  "check_out": "2023-05-20T00:00:00.000Z",
  "num_bathrooms": 2,
  "num_beds": 1,
  "extras": ["Breakfast included", "Free Wi-Fi", "Gym access"],
  "details": {
    "images_url": ["https://bucket.aws.photo", "https://bucket.aws.photo2"],
    "amenities": ["Swimming pool", "Restaurant", "Room service"],
    "not_included": ["Pets not allowed", "Smoking not allowed"],
    "services": ["24/7 concierge", "Laundry service"]
  },
  "num_room": {
    "type_room": "Deluxe Suite",
    "num_bed": 1,
    "type_bed": "King Bed",
    "type_bed_2": "Sofa Bed",
    "images_url": ["https://bucket.aws.photo4", "https://bucket.aws.photo3"]
  }
}
```

#### Successful Response

Status Code: 200 OK
The room has been successfully created.

```json
  {
  "room": {
    "id": "475921e3-2d82-414c-abd9-c121778ffe3e",
    "room_type": "Deluxe Suite",
    "description": "Spacious and luxurious suite with a stunning view of the city.",
    "address": "123 Main Street, Cityville",
    "price": 200,
    "check_in": "2023-05-15T00:00:00.000Z",
    "check_out": "2023-05-20T00:00:00.000Z",
    "num_bathrooms": 2,
    "num_beds": 1,
    "extras": ["Breakfast included", "Free Wi-Fi", "Gym access"],
    "updated_at": "2023-05-17T03:19:13.759Z",
    "created_at": "2023-05-17T03:19:13.759Z"
  },
  "roomDetails": {
    "id": "1",
    "room_id": "475921e3-2d82-414c-abd9-c121778ffe3e",
    "type_room": "Deluxe Suite",
    "num_bed": 1,
    "type_bed": "King Bed",
    "type_bed_2": "Sofa Bed",
    "images_url": ["https://bucket.aws.photo","https://bucket.aws.photo1" ]
    "updated_at": "2023-05-17T03:19:13.767Z",
    "created_at": "2023-05-17T03:19:13.767Z"
  },
  "roomDetails2": {
    "id": "1",
    "room_id": "475921e3-2d82-414c-abd9-c121778ffe3e",
    "images_url": ["https://bucket.aws.photo4","https://bucket.aws.photo3" ],
    "amenities": ["Swimming pool", "Restaurant", "Room service"],
    "not_included": ["Pets not allowed", "Smoking not allowed"],
    "services": ["24/7 concierge", "Laundry service"],
    "updated_at": "2023-05-17T03:19:13.769Z",
    "created_at": "2023-05-17T03:19:13.769Z",

  }
}
```

### Get All Rooms

Retrieve a paginated list of all created users in the database.

- URL: `https://localhost:3000/api/v1/rooms`
- Method: GET
- Content Type: application/json

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
        "id": "475921e3-2d82-414c-abd9-c121778ffe3e",
        "room_type": "Standard Room",
        "description": "Cozy and affordable room for a comfortable stay.",
        "address": "456 Elm Street, Townsville",
        "price": 100,
        "check_in": "2023-05-15T00:00:00.000Z",
        "check_out": "2023-05-20T00:00:00.000Z",
        "num_bathrooms": 1,
        "num_beds": 1,
        "extras": ["TV with cable channels", "Air conditioning", "Mini fridge"],
        "created_at": "2023-05-17T03:19:13.759Z",
        "updated_at": "2023-05-17T03:19:13.759Z"
      },
      {
        "id": "912de97f-82f1-4d79-bd79-16b3de40dcdf",
        "room_type": "Suite",
        "description": "Luxurious suite with a separate living area and stunning views.",
        "address": "789 Oak Street, Villagetown",
        "price": 250,
        "check_in": "2023-05-15T00:00:00.000Z",
        "check_out": "2023-05-20T00:00:00.000Z",
        "num_bathrooms": 2,
        "num_beds": 2,
        "extras": ["Private balcony", "Jacuzzi", "24-hour room service"],
        "created_at": "2023-05-17T03:19:13.759Z",
        "updated_at": "2023-05-17T03:19:13.759Z"
      }
    ]
  }
}
```

### Create a New Tour

Creates a new tour with the provided information.

- **URL**: `https://localhost:3000/api/v1/tours`
- **Method**: `POST`
- **Data Parameters**:

  | Parameter          | Type   | Description                                |
  | ------------------ | ------ | ------------------------------------------ |
  | `tour_name`        | String | The name of the tour.                      |
  | `tour_description` | Text   | The description of the tour.               |
  | `extras`           | String | Additional extras or features of the tour. |
  | `location`         | String | The location of the tour.                  |
  | `duration`         | String | The duration of the tour.                  |
  | `difficulty`       | String | The difficulty level of the tour.          |
  | `languages`        | Array  | The languages spoken during the tour.      |
  | `number_of_people` | String | The number of people allowed on the tour.  |
  | `ages`             | String | The age group suitable for the tour.       |
  | `tour_info`        | Object | Additional information about the tour.     |
  | `tour_details`     | Object | Detailed information about the tour.       |

##### tour_info Object

The `tour_info` object should include the following parameters:

| `tour_info`           | Object | Additional information about the tour.                                  |
| --------------------- | ------ | ----------------------------------------------------------------------- |
| `what_to_do`          | Text   | Activities to do during the tour.                                       |
| `good_choice_for`     | Text   | Target audience or type of traveler for whom the tour is a good choice. |
| `cancellation_policy` | Text   | Cancellation policy of the tour.                                        |
| `price_per_person`    | Number | Price per person for the tour.                                          |
| `available_dates`     | Array  | Array of available dates for the tour.                                  |
| `schedule`            | String | Schedule or itinerary of the tour.                                      |

##### tour_details Object

The `tour_details` object should include the following parameters:

| `tour_details`         | Object | Detailed information about the tour.                                                  |
| ---------------------- | ------ | ------------------------------------------------------------------------------------- |
| `what_is_included`     | Text   | List of what is included in the tour package.                                         |
| `what_is_not_included` | Text   | List of what is not included in the tour package.                                     |
| `itinerary`            | Array  | Array of itinerary items or activities during the tour.                               |
| `departure_details`    | String | Departure details or instructions for the tour.                                       |
| `return_details`       | String | Return details or instructions after the tour.                                        |
| `accessibility`        | Text   | Information about the accessibility of the tour for individuals with mobility issues. |

- **Success Response**:

  - **Status Code**: 201
  - **Content**:

    ```json
    {
      "tour": {
        "id": "345fd2de-7c53-4c82-b399-04c9b3e3fc25",
        "tour_name": "Amazing Adventure Tour",
        "tour_description": "Embark on an unforgettable adventure in the wilderness.",
        "extras": "Photography equipment, Snacks",
        "location": "Mountainous region",
        "duration": "3 days",
        "difficulty": "Intermediate",
        "languages": ["English", "Spanish"],
        "number_of_people": "10",
        "ages": "18+",
        "tour_info": {
          "what_to_do": "Hiking, Camping, Wildlife spotting",
          "good_choice_for": "Nature lovers, Adventure enthusiasts",
          "cancellation_policy": "Free cancellation up to 48 hours before the tour",
          "price_per_person": 250.0,
          "available_dates": ["2023-06-15", "2023-06-22", "2023-06-29"],
          "schedule": "Day 1: Arrival and orientation, Day 2: Hiking to scenic viewpoints, Day 3: Wildlife safari"
        },
        "tour_details": {
          "what_is_included": "Accommodation, Meals, Transportation",
          "what_is_not_included": "Personal expenses, Travel insurance",
          "itinerary": [
            "Day 1: Arrival and orientation",
            "Day 2: Hiking to scenic viewpoints",
            "Day 3: Wildlife safari"
          ],
          "departure_details": "Meeting point: Visitor Center at 9:00 AM",
          "return_details": "Drop-off at Visitor Center at 5:00 PM",
          "accessibility": "Not suitable for individuals with mobility issues"
        },
        "created_at": "2023-05-18T09:30:00.000Z",
        "updated_at": "2023-05-18T09:30:00.000Z"
      }
    }
    ```

-

### Create a New Coupon

Creates a new coupons with the provided information.

- **URL**: `https://localhost:3000/api/v1/coupons`
- **Method**: `POST`
- **Data Parameters**:

  | Parameter     | Type   | Description                                |
  | ------------- | ------ | ------------------------------------------ |
  | `coupon_code` | String | The name of the tour.                      |
  | `discount`    | Text   | The description of the tour.               |
  | `room_id`     | String | Additional extras or features of the tour. |
  | `tour_id`     | String | The location of the tour.                  |

#### Example Request

URL: `https://localhost:3000/api/v1/coupons`

```json
{
  "coupon_code": "NEWCOUPON",
  "discount": 0.2,
  "room_id": "8cd226a6-5577-4ce2-ab0f-074123a8fece",
  "tour_id": null
}
```

- **Success Response**:

  - **Status Code**: 201
  - **Content**:

    ```json
    {
      "id": "700c5644-4619-47d0-a6dd-f99e092fc610",
      "coupon_code": "NEWCOUPON",
      "discount": 0.2,
      "room_id": "8cd226a6-5577-4ce2-ab0f-074123a8fece",
      "tour_id": null,
      "created_at": "2023-05-26T03:52:46.273Z",
      "updated_at": "2023-05-26T03:52:46.273Z"
    }
    ```
### Get All Coupons

Retrieve a paginated list of all created coupons in the database.

- URL: `https://localhost:3000/api/v1/coupons`
- Method: GET
- Content Type: application/json

#### Successful Response

Status Code: 200 OK

```json
{
  "count": 4,
  "totalPages": 1,
  "currentPage": 1,
  "results": [
    {
      "id": "700c5644-4619-47d0-a6dd-f99e092fc610",
      "coupon_code": "NEWCOUPON",
      "discount": 0.2,
      "room_id": "8ert6a6-5577-4ce2-ab0f-074123a8fece",
      "tour_id": null,
      "created_at": "2023-05-26T03:52:46.273Z",
      "updated_at": "2023-05-26T03:52:46.273Z"
    },
    {
      "id": "c4d4ba14-deb4-4599-9c70-4e8ecc10ceb0",
      "coupon_code": "COUPON777",
      "discount": 0.7,
      "room_id": "yu5y26a6-5577-4ce2-ab0f-074123a8fece",
      "tour_id": null,
      "created_at": "2023-05-26T04:00:38.034Z",
      "updated_at": "2023-05-26T04:00:38.034Z"
    },
    {
      "id": "2a15f9ad-9961-46a6-be7c-f966938a3edd",
      "coupon_code": "SUPERDISCOUNT",
      "discount": 0.5,
      "room_id": "lka47a6-5577-4ce2-ab0f-074123a8fece",
      "tour_id": "5asdA232-4584-45yV-f854as23-oiH44",
      "created_at": "2023-05-26T04:00:57.611Z",
      "updated_at": "2023-05-26T04:00:57.611Z"
    }
  ]
}
```

### Get Coupons by ID

Retrieve a paginated list of coupon search by Id in the database.

- URL: `https://localhost:3000/api/v1/coupons/:couponId`
- Method: GET
- Content Type: application/json

#### Successful Response

Status Code: 200 OK

```json
{
  "id": "700c5644-4619-47d0-a6dd-f99e092fc610",
  "coupon_code": "NEWCOUPON",
  "discount": 0.2,
  "room_id": "8cd226a6-5577-4ce2-ab0f-074123a8fece",
  "tour_id": null,
  "created_at": "2023-05-26T03:52:46.273Z",
  "updated_at": "2023-05-26T03:52:46.273Z"
}

```

