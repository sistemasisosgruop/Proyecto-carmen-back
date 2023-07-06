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

5. Perform Sequelize seed to set up the database seeds.

```
npx sequelize-cli db:seed:all
```

6. Run ESlint

```
npm run lint
```

## Endpoints

### Create a Role

Create a new role in the database. 

- **URL**: `https://localhost:3000/api/v1/roles`
- **Method**: POST
- **Content Type**: application/json

#### Parameters
| Name             | Type    | Description                                              |
| ---------------- | ------- | -------------------------------------------------------- |
| `id`             | UUID    | Unique identifier of the user (automatically generated). |
| `name`           | String  | Role's name.                                             |
| `permissions`    | String  | Role's permissions                                       |

### Create a User

Create a new user in the database.

- **URL**: `https://localhost:3000/api/v1/users`
- **Method**: POST
- **Content Type**: application/json

#### Parameters

| Name             | Type    | Description                                              |
| ---------------- | ------- | -------------------------------------------------------- |
| `id`             | UUID    | Unique identifier of the user (automatically generated). |
| `firstName`      | String  | User's first name.                                       |
| `lastName`       | String  | User's last name.                                        |
| `email`          | String  | User's email address.                                    |
| `password`       | String  | User's password.                                         |
| `genre`          | String  | User's gender.                                           |
| `phoneNumber`    | BigInt  | User's phone number.                                     |
| `countryCode`    | Integer | Phone ID of the user's country.                          |
| `documentType`   | String  | User's document type.                                    |
| `documentNumber` | Number  | User's document number.                                  |
| `birthday`       | Date    | User's date of birth.                                    |
| `student`        | Boolean | Indicator if the user is a student or not.               |
| `roleId `        | String  | ID of the user's role.                                   |

### Get All Users

Retrieve a paginated list of all created users in the database.

- **URL**: `https://localhost:3000/api/v1/users`
- **Method**: GET

### Update User Data

Update the data of a user, excluding email and password.

- **URL**: `https://localhost:3000/api/v1/users`
- **Method**: PATCH
- **Content Type**: application/json

### Delete User Data

Delete the data of a user.

- **URL**: `https://localhost:3000/api/v1/users`
- **Method**: DELETE


### User Login

Authenticate a user by providing their email and password.

- **URL**: `https://localhost:3000/api/v1/auth/login`
- **Method**: POST
- **Content Type**: application/json

#### Parameters

The request body should include the following parameters:

| Name      | Type   | Description           |
| --------- | ------ | --------------------- |
| `email`   | String | User's email address. |
| `password`| String | User's password.      |

### Initiate Password Recovery

Initiate the password recovery process by providing the user's email. A password recovery token will be sent to the user's email address.

- URL: `https://localhost:3000/api/v1/auth/recovery-password`
- Method: POST
- Content Type: application/json

#### Parameters

The request body should include the following parameter:

| Name   | Type   | Description           |
| ------ | ------ | --------------------- |
| `email`| String | User's email address. |

### Reset Password

Reset the user's password using the recovery token received via email.

- **URL**: `https://localhost:3000/api/v1/auth/recovery-password/:token`
- **Method**: PATCH
- **Content Type**: application/json

#### Parameters

The request body should include the following parameter:

| Name      | Type   | Description                |
| --------- | ------ | -------------------------- |
| `password`| String | New password for the user. |

### Send Message

Send a message to a recipient. Messages can only be sent to administrators, not between regular users.

- **URL**: `https://localhost:3000/api/v1/message/:id`
- **Method**: POST
- **Content Type**: application/json

#### Parameters

The request should include the following parameters:

##### URL Parameters

| Name  | Type   | Description                  |
| ----- | ------ | ---------------------------- |
| `id`  | String | ID of the message recipient. |

##### Request Body

The request body should include the following parameters:

| Name          | Type   | Description                                     |
| ------------- | ------ | ----------------------------------------------- |
| `req.user.id` | String | ID of the message sender from the user request. |
| `content`     | String | Content of the message.                         |
| `subject`     | String | Subject of the message.                         |


### Create Department

Create a new department. This endpoint is only accessible to administrators.

- **URL**: `https://localhost:3000/api/v1/departments`
- **Method**: POST
- **Content Type**: application/json

#### Parameters

The request should include the following parameters

| Name               | Type   | Description                                                                                               |
| ------------------ | ------ | --------------------------------------------------------------------------------------------------------- |
| `departmentType`   | String | Type of the department.                                                                                   |
| `description`      | String | Description of the department.                                                                            |
| `address`          | String | Address of the department.                                                                                |
| `price`            | Number | Price of the department.                                                                                  |
| `checkIn`          | Date   | Check-in date for the department.                                                                         |
| `checkOut`         | Date   | Check-out date for the department.                                                                        |
| `numBathrooms`     | Number | Number of bathrooms in the department.                                                                    |
| `numBeds`          | Number | Number of beds in the department.                                                                         |
| `extras`           | Array  | Additional features or extras offered in the department.                                                  |
| `departmentDetails`| Object | Details about the department, including images, amenities, not included services, and department services.|
| `departmentRooms`  | Object | Details about the department type, including department type, number of beds, bed type, and department    |
##### details Object

The `departmentDetails` object should include the following parameters:

| Name           | Type  | Description                                                          |
| -------------- | ----- | -------------------------------------------------------------------- |
| `amenities`    | Array | An array of strings listing the amenities provided in the department.|
| `notIncluded`  | Array | An array of strings specifying what is not included.                 |
| `services`     | Array | An array of strings listing the services available.                  |

##### departmentRooms Object

The `departmentRooms` object should include the following parameters:

| Name          | Type   | Description                                    |
| ------------- | ------ | ---------------------------------------------- |
| `typeRoom`    | String | Type of the room od the department.            |
| `numBed`      | Number | Number of beds in the department number.       |
| `typeBed`     | String | Type of the bed in the department number.      |
| `numBathrooms`| Number | Number of baths in the room of the department. |
| `image`       | String | Image of the room                              |

### Upload Department Images
Upload iamges for the new department.

- **URL**: `https://localhost:3000/api/v1/departments/:departmentId/images`
- **Method**: POST
- **Content Type**: form-data

### Get All Departments

Retrieve a paginated list of all created departments in the database.

- **URL**: `https://localhost:3000/api/v1/departments`
- **Method**: GET

### Get Department By Id

Retrieve a paginated list of department search by id in the database.

- **URL**: `https://localhost:3000/api/v1/departments/:departmentId`
- **Method**: GET

### Create a New Tour

Creates a new tour with the provided information.

- **URL**: `https://localhost:3000/api/v1/tours`
- **Method**: `POST`
- **Data Parameters**:

  | Parameter         | Type   | Description                                |
  | ----------------- | ------ | ------------------------------------------ |
  | `tourName`        | String | The name of the tour.                      |
  | `tourDescription` | Text   | The description of the tour.               |
  | `extras  `        | String | Additional extras or features of the tour. |
  | `location`        | String | The location of the tour.                  |
  | `duration`        | String | The duration of the tour.                  |
  | `difficulty`      | String | The difficulty level of the tour.          |
  | `languages`       | Array  | The languages spoken during the tour.      |
  | `numberOfPeople`  | String | The number of people allowed on the tour.  |
  | `ages`            | String | The age group suitable for the tour.       |
  | `tourInfo`        | Object | Additional information about the tour.     |
  | `tourDetails`     | Object | Detailed information about the tour.       |

##### tourInfo Object

The `tourInfo` object should include the following parameters:

  | Parameter            | Type   | Description                                                             |
  | -------------------- | ------ | ----------------------------------------------------------------------- |
  | `whatToDo`           | Text   | Activities to do during the tour.                                       |
  | `goodChoice_for`     | Text   | Target audience or type of traveler for whom the tour is a good choice. |
  | `cancellationPolicy` | Text   | Cancellation policy of the tour.                                        |
  | `pricePerPerson`     | Number | Price per person for the tour.                                          |
  | `availableDates`     | Array  | Array of available dates for the tour.                                  |
  | `schedule`           | String | Schedule or itinerary of the tour.                                      |

##### tourDetails Object

The `tourDetails` object should include the following parameters:

  | Parameter           | Type   | Description                                                                           |
  | ------------------- | ------ | ------------------------------------------------------------------------------------- |
  | `whatIsIncluded`    | Text   | List of what is included in the tour package.                                         |
  | `whatIsNotIncluded` | Text   | List of what is not included in the tour package.                                     |
  | `itinerary`         | Array  | Array of itinerary items or activities during the tour.                               |
  | `departureDetails`  | String | Departure details or instructions for the tour.                                       |
  | `returnDetails`     | String | Return details or instructions after the tour.                                        |
  | `accessibility`     | Text   | Information about the accessibility of the tour for individuals with mobility issues. |

### Upload Tour Images
Upload images for the new tour.

- **URL**: `https://localhost:3000/api/v1/tour/:tourId/images`
- **Method**: POST
- **Content Type**: form-data

### Get All Tours

Retrieve a paginated list of all created tours in the database.

- **URL**: `https://localhost:3000/api/v1/tours`
- **Method**: GET

### Get Tour By Id

Retrieve a paginated list of tour search by id in the database.

- **URL**: `https://localhost:3000/api/v1/tours/:tourId`
- **Method**: GET

### Create a New Coupon

Creates a new coupons with the provided information.

- **URL**: `https://localhost:3000/api/v1/coupons`
- **Method**: `POST`
- **Data Parameters**:

  | Parameter       | Type   | Description                 |
  | --------------- | ------ | --------------------------- |
  | `couponCode`    | String | The name of the coupon.     |
  | `discount`      | Text   | Coupon of discount          |
  | `departmentId`  | String | Department valid of coupon  |
  | `tourId`        | String | Tour valid of coupon        |

### Get All Coupons

Retrieve a paginated list of all created coupons in the database.

- **URL**: `https://localhost:3000/api/v1/coupons`
- **Method**: GET

### Get Coupons By Id

Retrieve a paginated list of coupons search by id in the database.

- **URL**: `https://localhost:3000/api/v1/coupons/:couponsId`
- **Method**: GET

### Create New Reservations

## DEPARTMENT RESERVATION

Create a new department reservation.

- **URL**: `http://localhost:3000/api/v1/department/:departmentId/reservation`
- **Method**: POST
- **Data Parameters**:

  | Parameter         | Type    | Description             |
  | ----------------- | ------- | ----------------------- |
  | `purchaseDate`    | Date    | Date of purchase        |
  | `purchaseTime`    | Date    | Time of purchase        |
  | `numberOfPeople`  | Integer | Number of people        |
  | `totalPrice`      | Integer | Total price in currency |

### Get Department Reservation by Id

- **URL**: `http://localhost:3000/api/v1/reservations/:departmentId`
- **Method**: GET

### DELETE Department Reservation by Id

- **URL**: `http://localhost:3000/api/v1/reservations/:departmentId`
- **Method**: DELETE

### Update Department Reservation

Update the department reservation.

- **URL**: `https://localhost:3000/api/v1/reservations/:departmentId`
- **Method**: PATCH
- **Content Type**: application/json

#### Parameters

The request body should include the following parameters:

| Parameter         | Type    | Description             |
| ----------------- | ------- | ----------------------- |
| `purchaseDate`    | Date    | Date of purchase        |
| `purchaseTime`    | Date    | Time of purchase        |
| `numberOfPeople`  | Integer | Number of people        |
| `totalPrice`      | Integer | Total price in currency |

## TOURS RESERVATION

Create a new tour reservation.

- **URL**: `http://localhost:3000/api/v1/tours/:tourId/reservation`
- **Method**: POST
- **Data Parameters**:

  | Parameter        | Type    | Description                |
  | ---------------- | ------- | -------------------------- |
  | `purchaseDate`   | Date    | Date of purchase           |
  | `purchaseTime`   | Date    | Time of purchase           |
  | `numberOfPeople` | Integer | Number of people           |
  | `totalPurchase`  | Integer | Total purchase in currency |

### Get Tour Reservation by Id

- **URL**: `http://localhost:3000/api/v1/reservations/:tourId`
- **Method**: GET

### DELETE Tour Reservation by Id

- **URL**: `http://localhost:3000/api/v1/reservations/:tourId`
- **Method**: DELETE

### Update Tour Reservation

Update the Tour reservation.

- **URL**: `https://localhost:3000/api/v1/reservations/:tourId`
- **Method**: PATCH
- **Content Type**: application/json

#### Parameters

The request body should include the following parameters:

| Parameter        | Type    | Description             |
| ---------------- | ------- | ----------------------- |
| `purchaseDate`   | Date    | Date of purchase        |
| `purchaseTime`   | Date    | Time of purchase        |
| `numberOfPeople` | Integer | Number of people        |
| `totalPrice`     | Integer | Total price in currency |
