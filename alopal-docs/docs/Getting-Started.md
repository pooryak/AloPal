---
id: Getting-Started
title: Getting Started
---

You will need a working version of Node (tested with v10.17.0) and NPM to get started. We won’t cover that here, as it varies from platform to platform.

To install these tools and dependencies:

```javascript
    yarn install
```

to get protobuf files from specified github repository in the package.json: 

```javascript
    yarn clone-proto
```
to compile all proto files in one js file (that will be located in root of project with compiled.js name):

```javascript
    yarn proto-bundle
```

To install api's functions:

```javascript
    yarn swagger
```

To test changes while developing, which will watch source files for changes and compile as necessary:

```javascript
    yarn dev
```

Once you are satisfied with your changes, finalize the bundles (this will minify library sources):

```javascript
    yarn build
```
To see an analyze from build folders:(result will be found in .next folder)

```javascript
    yarn build-analyze
```

## File Structure

```javascript
    "alopal-docs/"
    "pages/"
    "public/"
    "src/"
    "repository/"
    "swagger/"
    "test/"
```
All files and directories should be lowercase with hyphens used to separate words.

### alopal-docs
 Should contain any site specific Document files .

### src/components
 Should contain any components that could be used in different parts of project .

### src/locales
 Should contain any languages that could be used in project .

 ### src/utility
 Should contain all modules that will be used in the project like hooks .

 ### src/widgets
 Should contain all widgets that will be used in the project .

  ### src/style
 Should contain all of global styles like theme .

### pages
 Should contain all of routes in the project .

### public
 Should contain all of bundles of the project in build mode .

### repository
 Should contain all of api's that will be used in the project .

### swagger
 Should contain package that fetches api's from swagger endpoint .

 ### test
 Should contain test's units for pages and components.


 