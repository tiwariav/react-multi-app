# React Multi App

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=tiwariav_react-multi-app&metric=alert_status)](https://sonarcloud.io/dashboard?id=tiwariav_react-multi-app)

Create different compatible and importable apps using any of the supported frameworks, along with a shared component library and storybook.  

## Why multiple apps

Although most applications can be easily built and managed as a single react application, there are many cases where you would want to break your one large application into multiple applications.  

This repo aims to setup this simple scenario and

- reduce development time by re-using components across apps
- make it possible to include apps as modules inside another app
- make it work irrespective of the react framework used

## Features

- Storybook 6.1
- Yarn Workspaces (v2 / berry)
- Maintain common linting rules and code style in all applications
- Host shared component library to be used across all the apps in the monorepo ([see details](#how-does-it-work))
- Host multiple react apps using any of the supported frameworks in a monorepo ([see details](#how-does-it-work))
- Include components from one App into another ([see details](#how-does-it-work))
- Include any App into any another App (created using the same framework) as a component ([see details](#how-does-it-work))

## Supported Frameworks

- Create React App 4 (CRA)
- Next.js 9.5
- Gatsby 2.24

## Setup

### To use the repo as a starting template

```bash
git clone git@github.com:tiwariav/react-multi-app-cra.git
cd react-multi-app-cra
```

The repo contains a sample app for each supported framework and makes use of the "zero-install" feature of yarn v2. So, **if using the repo as a template, make sure that you delete any package that you wont be using** and re-install to remove unused packages.

```bash
rm yarn.lock
yarn
```

Now run any app using defined scripts from the respective `package.json` files.

### Clone individual apps configured to work in a monorepo

`npm install -g degit`

#### create-react-app

`degit tiwariav/react-multi-app/apps/app-cra app-name`

#### next.js

`degit tiwariav/react-multi-app/apps/app-next app-name`

#### gatsby

`degit tiwariav/react-multi-app/apps/app-gatsby app-name`

## How Does It Work

The implementation of almost all the packages will in one way or another depend on all the different things that has to be supported.
Please go through the following section and the [FAQ](#faq) first, if you come across any issues.

The workspaces in the monorepo are divided as:

- **apps** - the web applications, which can be run individually
- **packages** - shared packages and common utilities like storybook

### packages

By default the following packages already initialized:

#### packages/storybook

The storybook package includes any file name ending with `.stories.js` from all the packages. Since stories are meant to document and test UI components, this would make it easier to test the UI components of all the apps centrally.

Alternaively, if required the config of the storybook can be changed to include only specific files. See [packages/storybook/README.md](https://github.com/tiwariav/react-multi-app/blob/main/packages/storybook/README.md) for more details.

#### packages/shared

A shared component and utility library which can be imported and used by all the applications.

Importing components from a shared library is done by overriding the webpack configs for each of the supported frameworks.

While creating shared components make sure that it is compatible with all the frameworks that you plan to use it with.

### apps

By default a sample app for each supported framework is included in the repo.

When importing an entire app into another app things can get complicated in a number of ways. To keep it simple, following rules would have to be followed in all the apps.

- **when importing an app in another app, make sure you use `React.Lazy` so that the bundle size
does not grow too large**
- **use css modules (required by next.js), to avoid css side effects from different applications**
