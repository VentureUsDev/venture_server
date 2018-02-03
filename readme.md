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

### Login

#### `PUT` `/authenticate`
* if success, user will get a `token` for use as `x-access-token` header in subsequent calls

|Body|Required|Type|Example|Notes|
|-----|-----|-----|-----|-----|
|`phone`|true|String|`+10000000000`|must satisfy regex `/\+[0-9]{0,14}$/`|
|`password`|true|String|`password`||

#### `PUT` `/forgot-password`
* will generate a new OTP and send to user's phone
* afterwards, `PUT/verify` to get an `x-access-token`, then `PUT/user` to update password

|Body|Required|Type|Example|Notes|
|-----|-----|-----|-----|-----|
|`phone`|true|String|`+10000000000`|must satisfy regex `/\+[0-9]{0,14}$/`|

### Signup

#### `POST` `/user`
* if success, user will get a `code` via text

|Body|Required|Type|Example|Notes|
|-----|-----|-----|-----|-----|
|`phone`|true|String|`+10000000000`|must satisfy regex `/\+[0-9]{0,14}$/`|

#### `PUT` `/verify`
* if success, user will get a `token` for use as `x-access-token` header in subsequent calls

|Body|Required|Type|Example|Notes|
|-----|-----|-----|-----|-----|
|`phone`|true|String|`+10000000000`|must satisfy regex `/\+[0-9]{0,14}$/`|
|`code`|true|String|`ab1234`|should have received from text|

### User 

#### `PUT` `/user` `x-access-token` header required
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

### Friend

#### `POST` `/friend` `x-access-token` header required
* will check if the friend is a user
* if not user, will invite friend to be a user via text
* cannot handle batch request (no multiple friend additions for now)

|Body|Required|Type|Example|Notes|
|-----|-----|-----|-----|-----|
|`phone`|true|String|`+10000000000`|must satisfy regex `/\+[0-9]{0,14}$/`|
|`nickname`|false|String|`theoldman`|minlength is 2 chars|

#### `GET` `/friends` `x-access-token` header required
* will return the current user's friends list

### Group

#### `POST` `/group` `x-access-token` header required
* will create a group with the current user as the admin

|Body|Required|Type|Example|Notes|
|-----|-----|-----|-----|-----|
|`name`|true|String|`the cool group`|name of the group, minlength is 2 chars|
|`members`|true|Array|`['jklangdnkgmdskmgl']`|array of user ids|

#### `GET` `/groups` `x-access-token` header required
* will get all of the groups that the current user has created or is a member of

### Venture

#### `POST` `/venture` `x-access-token` header required
* will create a venture with recommended venue options

|Body|Required|Type|Example|Notes|
|-----|-----|-----|-----|-----|
|`group`|false|String|`xbglnsdkglkjlkewjlfkwejlk`|group id|
|`category`|true|String|`bars`|venue search category|
|`location`|true|Object|`{zip: 90034}`|can be zip, or include `longitude` and `longitude`|
| `date`   |false|String|`05/19/18 Timestamp` |can be included if the venture is in the future|
