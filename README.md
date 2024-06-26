# Blog Feeder - Vue, Vite + Tailwind

** A Blog Feeder app which I use to fill the contents of my blogging website **

## Technologies Used

A front-end app created in Vue using Tailwind css and Headless UI

![Vite](https://img.shields.io/badge/-Vite-%23F766?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-%2338B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vue JS](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)


## Getting started

The project uses Vite build tool for lighting-fast modern single-page application development. It is expected to have Node installed on your system. Then, run the conventional npm commands to see the project in action.

```
npm install
npm run build
npm run dev
```

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (previously Volar) and disable Vetur

## Ecosystem

| Package        | Purpose                |
| -------------- | ---------------------- |
| Vue-router     | For routing in Vue     |
| Pinia          | For Vue store          |
| Tailwind CSS   | For CSS Styles         |
| Headless icons | For icons to be used   |
| Express        | Serving Vue build      |
| Vee-validate   | For validations        |
| Headless UI    | For dynamic components |

## Project Screenshots

Only contains home page with features like searching for an anime and gets the data in paginated form.

![Screenshot](./screenshots/1.png)

Pagination is available with the API response, 25 items are fetched at max in one go.

![Screenshot](./screenshots/2.png)

## Automated Tests with Cypress

Configure the cypress config file as per Vue and Vite. After configuration is completed a cypress folder would be generated inside of which you can have your component as well as integration tests

## Docker Deployment

1. Build the image from the given Dockerfile, give it a intuitive name 'anime-dashboard'.

```
docker build -t anime-dashboard . 
```

2. Run the Docker container on port 4200 which is the default port used by Angular Applications.

```
docker run -p 4200:80 --name dashboard anime-dashboard
```

## Issues

No issues as of now, issues would be added here to be addressed later.

## Changelog

- April 2024 : Initial Release with basic features from anime search page.

- Approx 3600 LOC in 24 hrs.

- Added eslint and Husky, but husky pre-commit hooks are not running.

```
npm i husky --save-dev
```

This command adds the pre-commit hooks for Husky.

Installing Husky: husky-init itself is not a separate package. It utilizes npx to run the husky package, which helps manage Git hooks. By running npx husky-init, you're essentially installing Husky as a development dependency in your project.

Initializing Husky Hooks: After installation, husky-init configures Husky to work with your project. It creates a folder named .husky in your project's root directory. This folder contains the necessary files for Husky to execute pre-commit hooks (scripts that run before you commit changes).

In simpler terms:

Running npx husky-init is a quick way to set up Husky and enable pre-commit hooks in your project. These hooks can be used to automate tasks like running ESLint or other linters before committing code, ensuring cleaner and more consistent code quality.

### Additional Info

npx is a tool included with npm that allows you to execute packages from the npm registry without installing them globally.
You can achieve the same functionality by installing Husky explicitly with npm install husky --save-dev followed by npx husky install to initialize the hooks. However, npx husky-init is a convenient one-step approach.

After running npx husky-init, you'll need to configure the pre-commit hook behavior further. You can define which scripts or commands to run before commit using your project's configuration files (like .eslintrc.js for ESLint).

```
npx husky-init 
```

Fixing Husky related issues by re-installing packages.

```
npm uninstall husky
npm install husky --save-dev
```
## Stay In Touch

- [Twitter](https://twitter.com/vuejs)
- [Blog](https://medium.com/the-vue-point)
- [Job Board](https://vuejobs.com/?ref=vuejs)

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2024-present, Amit Prafulla (Apfirebolt)