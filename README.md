# CMS Documentation Joazco

CMS Documentation Joazco is a small CMS, which aims to simplify the writing of a documentation or a tutorial in a website format. It is intended for developers who want to give more visibility to their code without creating a website from A to Z.
Very easy to use, CMS documentation Joazco uses serverless technology for a low installation and maintenance cost. The development of the CMS was inspired by documentations like [ReactNative](https://reactnative.dev/docs/getting-started), [Flutter](https://flutter.dev/docs), [Ionic](https://ionicframework.com / docs) and others. Indeed, on your left, you will find the menu and on your right, the content of the documentation page.
Of course, the website is fully responsive, the home page and the menu are automatically generated and take into account multi-language as needed.

![Node CI](https://github.com/poohia/cms-documentation/workflows/Node%20CI/badge.svg)
![Firebase CI](https://github.com/poohia/cms-documentation/workflows/Deploy%20to%20Firebase%20Hosting%20on%20merge/badge.svg)

## Documentation and live demo

CMS documentation Joazco being a documentation cms, you will find the documentation and consequently a demo in the official [website](https://cms-documentation.joazco.com/)

## Installation

```sh
git clone git@github.com:poohia/cms-documentation.git
cd cms-documentation
cp .env.development .env.local
npm install
npm start
```

> [http://localhost:3000](http://localhost:3000)

> [http://localhost:3000/joazco-admin](http://localhost:3000/joazco-admin)

## Drivers

In CMS Documentation Joaco, the drivers are the codes used to communicate with a database. By default the value is equal to localstorage. However, datas will only be saved in your browser, to make datas readable on the internet, CMS documentation is compatible with Firebase (see .env.production).

### Localstorage

Localstorage is useful if you don't want to initialize a firebase project and contribute to the project anyway.

```
#.env.local
REACT_APP_JOAZCO_CMS_DRIVER=localstorage
```

### Firebase

CMS Documentation Joazco is fully compatible with Firebase.

```
#.env.local
REACT_APP_JOAZCO_CMS_DRIVER=firebase
## Firebase vars
REACT_APP_JOAZCO_FIREBASE_API_KEY=
REACT_APP_JOAZCO_FIREBASE_AUTH_DOMAIN=
REACT_APP_JOAZCO_FIREBASE_DATABASE_URL=
REACT_APP_JOAZCO_FIREBASE_PROJECT_ID=
REACT_APP_JOAZCO_FIREBASE_STORAGE_BUCKET=
REACT_APP_JOAZCO_FIREBASE_APP_ID=
REACT_APP_JOAZCO_FIREBASE_MEASUREMENT_ID=
##
```

#### Authentification

CMS Documentation Joazco needs you to create an email / password in firebase.

#### Realtime database

CMS Documentation Joazco needs you to create realtime database in firebase, and secure secure it with this rule:

```
{
  "rules": {
    ".read": true,
    ".write": "auth !== null && auth.provider !== 'anonymous'"
  }
}
```

#### Connect CMS Documentation with my Back End

It is possible to create a driver to communicate with a database not provided by CMS Documentation Joazco, just copy drivers/localstorage to drivers/mydriver and follow name files and types

### Front office template

It is possible to create your front office template, just copy templates/default to templates/{myTemplate} and follow name files

### Lint

If you want to contribute you will have to respect the lint.

```
npm run lint
```

### Tests

If you want to contribute you will have to respect the tests.

```
cp .env.test .env.test.local
npm run test
```

## Env vars

```
# See driver documentation [default value "localstorage"]
REACT_APP_JOAZCO_CMS_DRIVER=

# Add languages you need if multiple split string with "," link "en,fr" [default value "en"]
REACT_APP_JOAZCO_CMS_LANGUAGES=

# See template documentation [default value "default"]
REACT_APP_JOAZCO_TEMPLATE=

## Firebase vars
REACT_APP_JOAZCO_FIREBASE_API_KEY=
REACT_APP_JOAZCO_FIREBASE_AUTH_DOMAIN=
REACT_APP_JOAZCO_FIREBASE_DATABASE_URL=
REACT_APP_JOAZCO_FIREBASE_PROJECT_ID=
REACT_APP_JOAZCO_FIREBASE_STORAGE_BUCKET=
REACT_APP_JOAZCO_FIREBASE_APP_ID=
REACT_APP_JOAZCO_FIREBASE_MEASUREMENT_ID=
##

# Set true or false for enable cache, it is not recommended in development environment [default value "false"]
REACT_APP_JOAZCO_ENABLE_CACHE=

#Set true or false for enable access to fixtures, it is not recommended in production environment [default value "false"]
REACT_APP_ENABLE_FIXTURES=

## See customise stylesheet documentation, this is css vars will be set
REACT_APP_JOAZCO_PRIMARY_COLOR= # Use into all project
REACT_APP_JOAZCO_SECONDARY_COLOR= # Only use into back office
REACT_APP_JOAZCO_SUCCESS_COLOR= # Only use into back office
REACT_APP_JOAZCO_WARNING_COLOR= # Only use into back office
REACT_APP_JOAZCO_DANGER_COLOR= # Only use into back office
REACT_APP_JOAZCO_BLACK_COLOR= # Use into all project
REACT_APP_JOAZCO_BACKGROUND_COLOR= # Use into all project
REACT_APP_JOAZCO_BACKGROUND_COLOR_MENU= # Use into all project
REACT_APP_JOAZCO_LINK_COLOR= # Use into all project
REACT_APP_JOAZCO_FONT_SIZE= # Use into all project

## Default icon
REACT_APP_JOAZCO_ICON=
```
