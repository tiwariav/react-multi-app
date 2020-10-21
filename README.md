# React Multi App with create-react-app

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=tiwariav_react-multi-app&metric=alert_status)](https://sonarcloud.io/dashboard?id=tiwariav_react-multi-app)

## Features

- Create React App 3 (React 17.0)
- Storybook 6
- Yarn Workspaces (v2 / berry)
- Host Multiple CRA Apps and Component Libraries in one Monorepo
- Include any App into any another App as a component
- Include components from one App into another
- Maintian same linting rules and code style in all applications

## Setup

```bash
git clone git@github.com:tiwariav/react-multi-app-cra.git
cd react-multi-app-cra
yarn
```

## How does it work

Importing components from a shared library is done by overriding CRA webpack config using react-app-rewired to transpile components from
all packages in the workspace (using [react-app-rewire-yarn-workspaces](https://github.com/viewstools/yarn-workspaces-cra-crna/tree/master/react-app-rewire-yarn-workspaces)).

Importing an entire app into another app is slightly more comlicated as we have to make use of `React.Lazy` to make sure the bundle size
does not grow too large and avoid any conflicts that might result between the css or components of multiple apps.
