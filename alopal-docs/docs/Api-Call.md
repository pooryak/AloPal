---
id: Api-Call
title: Api Calls
---

```javascript
    yarn clone-proto
```
This command clone the proto files repository in github. you can change the repository in package.json

```javascript
    yarn proto-bundle
```
This command will bundle all of proto classes in one js file that will be located at  root of the project(compiled.js), This file will be used as a encoder/decoder of sent/recieved data.

```javascript
    yarn swagger
```
This command will fetch apis from swagger endpoint and make functions for api calls.Axios instance is created at '/pages/_app.js'.it's constant values are taken from constant.js file at root of the project.
