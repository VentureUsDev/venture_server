# API Server for Venture

### Environments

|local| `http://localhost:8080/api`|
|-----|-----|
|development| `https://venture-sever-api.herokuapp.com/api/`|

### Installation

```
npm install
```

### Start

```
npm start
npm run dev
npm run debug
```

### API Endpoints

#### Signup ####

`POST` `/user`
* if success, user will get a `code` via text

|Body|Required|Type|Example|Notes|
|-----|-----|-----|-----|-----|
|`phone`|true|String|`+10000000000`|must satisfy regex `/\+[0-9]{0,14}$/`|

`POST` `/verify`
* if success, user will get a `token` to set password

|Body|Required|Type|Example|Notes|
|-----|-----|-----|-----|-----|
|`phone`|true|String|`+10000000000`|must satisfy regex `/\+[0-9]{0,14}$/`|
|`code`|true|String|`ab1234`|should have received from text|

#### User ####

`PUT` `/user`
* can be part of signup (to set password, etc)
* or in updating user profile subsequently

|Body|Required|Type|Example|Notes|
|-----|-----|-----|-----|-----|
|`password`||String|`password`||
|`email`||String|`email@email.com`||
|`firstName`||String|`ab1234`||
|`lastName`||String|`ab1234`||
|`noticeOff`||Boolean|`true`|notification setting|
|`emailOff`||Boolean|`true`|email setting|


