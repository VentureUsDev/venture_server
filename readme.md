# API Server for Venture

## Environments

|local| `http://localhost:8080/api`|
|-----|-----|
|development| `https://venture-sever-api.herokuapp.com/api/`|

## Installation

```
npm install
```

## Start

```
npm start
npm run dev
npm run debug
```

## API Endpoints

### Authenticate

#### `POST` `/authenticate`
* if success, user will get a `token` for use as `x-access-token` header in subsequent calls

|Body|Required|Type|Example|Notes|
|-----|-----|-----|-----|-----|
|`phone`|true|String|`+10000000000`|must satisfy regex `/\+[0-9]{0,14}$/`|
|`password`|true|String|`password`||

### Signup

#### `POST` `/user`
* if success, user will get a `code` via text

|Body|Required|Type|Example|Notes|
|-----|-----|-----|-----|-----|
|`phone`|true|String|`+10000000000`|must satisfy regex `/\+[0-9]{0,14}$/`|

#### `POST` `/verify`
* if success, user will get a `token` for use as `x-access-token` header in subsequent calls

|Body|Required|Type|Example|Notes|
|-----|-----|-----|-----|-----|
|`phone`|true|String|`+10000000000`|must satisfy regex `/\+[0-9]{0,14}$/`|
|`code`|true|String|`ab1234`|should have received from text|

### User

#### `PUT` `/user`
* can be used @ signup (to set password, names, etc)
* or in updating user profile later

|Body|Required|Type|Example|Notes|
|-----|-----|-----|-----|-----|
|`password`||String|`password`||
|`email`||String|`email@email.com`||
|`firstName`||String|`John`||
|`lastName`||String|`Hwang`||
|`noticeOff`||Boolean|`true`|notification setting|
|`emailOff`||Boolean|`true`|email setting|


