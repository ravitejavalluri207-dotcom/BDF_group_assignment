# KitchenKeys Cloud Kitchen API

**Group:** 03  
**Theme:** 18

## 1. Project Description

KitchenKeys Cloud Kitchen is a REST API developed using Node.js, Express.js and SQLite.

The API manages chefs, kitchen stations and bookings. It supports CRUD operations for stations, chef management, booking creation, data validation, searching and SQL JOIN operations.

## 2. Technologies Used

- Node.js
- Express.js
- SQLite3
- Thunder Client for API testing

## 3. Project Structure

```text
KitchenKeys-Cloud-Kitchen/
│
├── data/
│   └── kitchenkeys.db
│
├── routes/
│   ├── chefs.js
│   ├── stations.js
│   └── bookings.js
│
├── server.js
├── db.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## 4. Installation and Setup

### Prerequisites

- Node.js installed
- npm installed

### Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_LINK
```

Navigate to the project folder:

```bash
cd KitchenKeys-Cloud-Kitchen
```

Install dependencies:

```bash
npm install
```

### Run the project

Start the development server:

```bash
npm run dev
```

The server runs at:

```text
http://localhost:3000
```

## 5. Database Tables

The project uses three related SQLite tables:

### Chefs
- id
- name

### Stations
- id
- name
- cuisine

### Bookings
- id
- chef_id
- station_id
- booking_date

Foreign keys connect bookings with chefs and stations.

## 6. API Endpoints

### Chefs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/chefs` | Get all chefs |
| GET | `/chefs/:id` | Get a chef by ID |
| POST | `/chefs` | Add a new chef |

### Stations

| Method | Endpoint | Description |
|---|---|---|
| GET | `/stations` | Get all stations |
| GET | `/stations/:id` | Get a station by ID |
| POST | `/stations` | Add a station |
| PUT | `/stations/:id` | Update a station |
| DELETE | `/stations/:id` | Delete a station |
| GET | `/stations?cuisine=Indian` | Search stations by cuisine |
| GET | `/stations/top` | Get the three most-booked stations |

### Bookings

| Method | Endpoint | Description |
|---|---|---|
| GET | `/bookings` | Get bookings with chef and station names |
| POST | `/bookings` | Create a new booking |

## 7. Sample API Requests

### Add a chef

**POST** `/chefs`

```json
{
  "name": "Rahul"
}
```

### Add a station

**POST** `/stations`

```json
{
  "name": "Spicy Kitchen",
  "cuisine": "Indian"
}
```

### Create a booking

**POST** `/bookings`

```json
{
  "chef_id": 1,
  "station_id": 1
}
```

### Search stations

**GET** `/stations?cuisine=Indian`

### Get top three stations

**GET** `/stations/top`

## 8. Special Feature – Top Three Most-Booked Stations

The project includes a special feature that displays the three stations with the highest number of bookings.

It uses:

- SQL INNER JOIN
- GROUP BY
- COUNT()
- ORDER BY
- LIMIT 3

Stations are sorted by booking count in descending order. If two stations have the same booking count, they are sorted alphabetically by station name.

Only stations with at least one booking are displayed. If fewer than three stations have bookings, only those stations are returned.

## 9. HTTP Status Codes

| Status Code | Description |
|---|---|
| 200 | Successful request |
| 201 | Resource created successfully |
| 400 | Invalid request or validation error |
| 404 | Resource not found |
| 500 | Internal server error |

## 10. Group Assignment

**Project:** KitchenKeys Cloud Kitchen API  
**Group:** 03  
**Theme:** 18