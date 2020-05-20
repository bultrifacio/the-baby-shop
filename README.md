#The Body Shop

## Introduction

This project is a catalog of clothes for babies. Built with React + Typescript using the [Gocco API](https://gocco.docs.apiary.io/).

## Getting Started

### Project structure

- App
    - public (index.html, manifest.json, favicon.ico)
    - src
        - assets
            - img (app images)
            - translations (translations files)
        - components
            - pages (page components)
            - other components
        - shared
            - enum (app enums)
            - model (model types)
            - types (types of non-typescript libraries)
            - constants
        - Other files like App.tsx, index.tsx or variables.less

### Prerequisites

Before you start you need the last version of *nodejs* and *yarn*. Instead of yarn you can use NPM if you want.

* [Nodejs](https://nodejs.org/en/download/) 10.5.3
* [Yarn](https://yarnpkg.com/getting-started/install) 1.22.4

This project uses the [Gocco API](https://gocco.docs.apiary.io/), in the following link you can select an endpoint and 
view an example or switch and do your own requests. This app only uses the endpoints of *Stores*, *Categories* and 
*Products*. For requests, we use the *Mock Server* environment.

Although this project is build on top of [create-react-app](https://github.com/facebook/create-react-app) we use 
[react-app-rewired](https://github.com/timarney/react-app-rewired) to modify the structure and add LESS instead of SASS.

Why LESS?
This app uses [ant-design](https://ant.design/) a component library that permit us to change some css variables and
propagate it for the whole app. This library uses LESS for that reason.

### Installing

In the project folder open a terminal and type the next sentence to install all the dependencies:

### `yarn install`

When it's finish type the next one to start the project:

### `yarn start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Running the tests

The application doesn't have tests yet, but you will need the next command to execute it:

### `yarn test`

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) in 
*create-react-app* documentation for more information.

## Deployment

For deploy the app you can use the next command, that builds the application for production:

### `yarn build`

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) in 
*create-react-app* documentation for more information.

Or you can use [AWS Amplify](https://aws.amazon.com/es/amplify/), an Amazon web service that helps you deploy an 
application, among other features. You will need an AWS account, after that follow the next steps:

1. Open the AWS Management console like the image below and search *AWS Amplify*.
![AWS Management Console](./img/aws-console.PNG?raw=true "AWS Management Console")

2. On the *AWS Amplify* console click on the *Connect app* button.

3. Then select the Github.
![Select Github project](./img/git.PNG?raw=true "Select Github project")

4. Give permissions to your account and select the repo and branch
![Selected repository](./img/select-repo-branch.PNG?raw=true "Selected repository")

4. If you want you can add build settings
![Build settings](./img/build-settings.PNG?raw=true "Build settings")

5. Review and click *Save and deploy*
![Review deployment](./img/review-deploy.PNG?raw=true "Review deployment")

6. You will see the status of the app. When the verify check turns green, you can access to the app following the URL.
![App status](./img/app-status.PNG?raw=true "App status")

7. Now every commit will be deployed automatically.

## Built With

* [React](https://github.com/facebook/react) - The library
* [Typescript](https://www.typescriptlang.org/docs/home.html) - The programming language
* [Ant design](https://github.com/ant-design/ant-design) - The components library
* [Axios](https://github.com/axios/axios) - Used to fech data from server
* [Lodash](https://github.com/lodash/lodash) - The utils library
* [React-intl](https://github.com/formatjs/formatjs) - Used to translate the app
* [React-query](https://github.com/tannerlinsley/react-query) - Used to add cache to requests
* [Less](http://lesscss.org/) - Used to add features over CSS
* [Prettier](https://prettier.io/) - Used to format the code

## Author
* **Juan Carlos Arroyo Herrera** - jcah20022@gmail.com - GitHub: **bultrifacio**