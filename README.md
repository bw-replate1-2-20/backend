[![GitHub issues](https://img.shields.io/github/issues/bw-replate1-2-20/backend)](https://github.com/bw-replate1-2-20/backend)
[![GitHub forks](https://img.shields.io/github/forks/bw-replate1-2-20/backend)](https://github.com/bw-replate1-2-20/backend)
[![GitHub stars](https://img.shields.io/github/stars/bw-replate1-2-20/backend)](https://github.com/bw-replate1-2-20/backend)
[![GitHub license](https://img.shields.io/github/license/bw-replate1-2-20/backend)](https://github.com/bw-replate1-2-20/backend)

# Replate BackEnd

## Table of Contents

- [About](#about)
- [Schema](#schema)
- [Routes](#routes)
- - [Onboarding](#onboarding)
- - [Delivery Requests](#requests)
- - [Businesses](#businesses)
- - [Volunteers](#volunteers)


## About

Many businesses have leftover food at the end of the day. The Replate app makes it easy and inexpensive to get those leftovers to worthy partner organizations through a network of delivery volunteers.


## Schema

![Database schema](./schema.png)


## Routes

### Onboarding
#### Register

|   Route   |         Input Data         | Expected Return |
| --------- | -------------------------- | --------------- |
|**POST** /api/auth/register/volunteer|{<br>email*<br>password*<br>name*<br>phone*<br>}|**Status: 201** (Created)<br>{<br>email<br>name<br>phone<br>JWT token<br>}|
|**POST** /api/auth/register/business|{email*<br>password*<br>name*<br>address*<br>description*<br>phone*br>}|**Status: 201** (Created)<br>{<br>email<br>name<br>address<br>description<br>phone<br>JWT token<br>}|

#### Login

|   Route   |         Input Data         | Expected Return |
| --------- | -------------------------- | --------------- |
|**POST** /api/auth/login/volunteer|{<br>email<br>password<br>}|**Status: 200** (OK)<br>{<br>email<br>name<br>phone<br>token: JWT token<br>}|
|**POST** /api/auth/login/business|{<br>email<br>password<br>}|**Status: 200** (OK)<br>{<br>email<br>name<br>address<br>description<br>phone<br>token: JWT token<br>}|


### Delivery requests {#requests}
`{ Authorization: [JWT] }` must be sent in the header

|   Route   |         Input Data         | Expected Return |
| --------- | -------------------------- | --------------- |
|**GET** /api/requests||**Status: 200** (OK)<br>[{ request objects }]<br>(for current business/volunteer only)|
|**GET** /api/requests/all||**Status: 200** (OK)<br>All [{ request objects }]|
|**GET** /api/requests/:id||**Status: 200** (OK)<br>{ object }|
|**DELETE** /api/requests/:id||**Status: 200** (OK)<br>No body|


### Businesses
`{ Authorization: [JWT] }` must be sent in the header

|   Route   |         Input Data         | Expected Return |
| --------- | -------------------------- | --------------- |
|**POST** /api/auth/register/business|{email*<br>password*<br>name*<br>address*<br>description*<br>phone*<br>}|**Status: 201** (Created)<br>{<br>email<br>name<br>address<br>description<br>phone<br>JWT token<br>}|
|**PUT** /api/businesses/:id|{ any field(s) }|**Status: 200** (OK)<br>{ business object }|
|**DELETE** /api/businesses/:id \*\*||**Status: 200** (OK)<br>No body|

\*\*Warning: Deleting businesses may render associated delivery requests invalid.


### Volunteers
`{ Authorization: [JWT] }` must be sent in the header

|   Route   |         Input Data         | Expected Return |
| --------- | -------------------------- | --------------- |
|**POST** /api/auth/register/volunteer|{<br>email*<br>password*<br>name*<br>phone*<br>}|**Status: 201** (Created)<br>{<br>email<br>name<br>phone<br>JWT token<br>}|
|**PUT** /api/volunteers/:id|{ any field(s) }|**Status: 200** (OK){ volunteer object }|
|**DELETE** /api/volunteers/:id||**Status: 200** (OK)<br>No body|

