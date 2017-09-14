# Angular4 Demo 

> An Angular 4 demo displaying multiselect.

### Quick start
**Make sure you have Node version >= 6.0 and NPM >= 3**
> Clone/Download the repo

```bash
# clone repo
# --depth 1 removes all but one .git commit history
git clone --depth 1 https://github.com/chirag-vashisht/multiselect.git

# change directory to our repo
cd multiselect

# WINDOWS only. In terminal as administrator
npm install -g node-pre-gyp

# install the repo with npm
npm install

# start the server
npm start

# use Hot Module Replacement
npm run server:dev:hmr

```
go to [http://0.0.0.0:3000](http://0.0.0.0:3000) or [http://localhost:3000](http://localhost:3000) in your browser

# Table of Contents
* [File Structure](#file-structure)
* [About Multiselect](#multiselect)
* [Getting Started](#getting-started)
    * [Dependencies](#dependencies)
    * [Installing](#installing)
    * [Running the app](#running-the-app)
* [Configuration](#configuration)
* [External Stylesheets](#external-stylesheets)

## File Structure
Here's how it looks:
```
multiselect/
 ├──config/                        * our configuration
 |   ├──helpers.js                 * helper functions for our configuration files
 |   ├──spec-bundle.js             * ignore this magic that sets up our Angular testing environment
 |   ├──karma.conf.js              * karma config for our unit tests
 |   ├──protractor.conf.js         * protractor config for our end-to-end tests
 │   ├──webpack.dev.js             * our development webpack config
 │   ├──webpack.prod.js            * our production webpack config
 │   └──webpack.test.js            * our testing webpack config
 │
 ├──src/                           * our source files that will be compiled to javascript
 |   ├──main.browser.ts            * our entry file for our browser environment
 │   │
 |   ├──index.html                 * Index.html: where we generate our index page
 │   │
 |   ├──polyfills.ts               * our polyfills file
 │   │
 │   ├──app/                       * WebApp: folder
 │   │   ├──app.component.spec.ts  * a simple test of components in app.component.ts
 │   │   ├──app.e2e.ts             * a simple end-to-end test for /
 │   │   ├──app.component.ts       * a simple version of our App component components
 |   |   └──modules/
 |   |            └──multiselect/                         * reusable bootstrap based multiselect
 |   |                          ├──components/            * contains multiselect component and its files
 |   |                          ├──interfaces/            * contains config and dropdown item interfaces
 |   |                          ├──models/                * contains multiselect model that implements miltiselect config interface
 |   |                          ├──pipes/                 * contains filterOtions pipe
 |   |                          ├──index.ts               * expose module, interfaces and models to external modules/components
 |   |                          └──multiselect.module.ts  * multiselect module
 |   |            
 │   │            
 │   └──assets/                    * static assets are served here
 │       ├──icon/                  * our list of icons from www.favicon-generator.org
 │       ├──service-worker.js      * ignore this. Web App service worker that's not complete yet
 │       ├──robots.txt             * for search engines to crawl your website
 │       └──humans.txt             * for humans to know who the developers are
 │
 │
 ├──tslint.json                    * typescript lint config
 ├──typedoc.json                   * typescript documentation generator
 ├──tsconfig.json                  * typescript config used outside webpack
 ├──tsconfig.webpack.json          * config that webpack uses for typescript
 ├──package.json                   * what npm uses to manage its dependencies
 └──webpack.config.js              * webpack main configuration file

```
# Multiselect
## Markup
```
<multiselect [(ngModel)]="dropdownModel" (change)="onChange($event)" [dropdownConfig]="multiSelectOptions">
    </multiselect>
```
In your code
```
import {
  IDropdownItem,
  IMultiselectConfig
} from './modules/multiselect';

public dropdownModel: IDropdownItem[];
public multiSelectOptions: IMultiselectConfig;

public ngOnInit() {
    this.multiSelectOptions = {
      searchBoxPlaceHolder: 'Search for games',
      defaultButtonText: 'Games',
    };
    this.dropdownModel = [
      {
        id: 1,
        label: 'CandyEat',
        selected: false, // optional
      },
      {
        id: 2,
        label: 'OnionsPick',
        selected: false, // optional
      },
      {
        id: 3,
        label: 'FannyDuck',
        selected: false, // optional
      },
      {
        id: 4,
        label: 'Click-o-Wisp',
        selected: false, // optional
      }
    ];
  }
```

# Getting Started
## Dependencies
What you need to run this app:
* `node` and `npm` (`brew install node`)
* Ensure you're running the latest versions Node `v6.x.x`+ (or `v7.x.x`) and NPM `3.x.x`+

> If you have `nvm` installed, which is highly recommended (`brew install nvm`) you can do a `nvm install --lts && nvm use` in `$` to run with the latest Node LTS. You can also have this `zsh` done for you [automatically](https://github.com/creationix/nvm#calling-nvm-use-automatically-in-a-directory-with-a-nvmrc-file)

Once you have those, you should install these globals with `npm install --global`:
* `webpack` (`npm install --global webpack`)
* `webpack-dev-server` (`npm install --global webpack-dev-server`)
* `karma` (`npm install --global karma-cli`)
* `protractor` (`npm install --global protractor`)
* `typescript` (`npm install --global typescript`)

## Installing
* `clone` this repo
* `npm install webpack-dev-server rimraf webpack -g` to install required global dependencies
* `npm install` to install all dependencies or `yarn`
* `npm run server` to start the dev server in another tab

## Running the app
After you have installed all dependencies you can now run the app. Run `npm run server` to start a local server using `webpack-dev-server` which will watch, build (in-memory), and reload for you. The port will be displayed to you as `http://0.0.0.0:3000` (or if you prefer IPv6, if you're using `express` server, then it's `http://[::1]:3000/`).

### server
```bash
# development
npm run server
# production
npm run build:prod
npm run server:prod
```

## Other commands

### build files
```bash
# development
npm run build:dev
# production (jit)
npm run build:prod
# AoT
npm run build:aot
```

### hot module replacement
```bash
npm run server:dev:hmr
```

### watch and build files
```bash
npm run watch
```

### run unit tests
```bash
npm run test
```

### watch and run our tests
```bash
npm run watch:test
```

### run end-to-end tests
```bash
# update Webdriver (optional, done automatically by postinstall script)
npm run webdriver:update
# this will start a test server and launch Protractor (before this step please run the app)
npm run e2e
```

### continuous integration (run unit tests and e2e tests together)
```bash
# this will test both your JIT and AoT builds
npm run ci
```

# Configuration
Configuration files live in `config/` we are currently using webpack, karma, and protractor for different stages of your application

# External Stylesheets
Any stylesheets (Sass or CSS) placed in the `src/styles` directory and imported into your project will automatically be compiled into an external `.css` and embedded in your production builds.

For example to use Bootstrap as an external stylesheet:
1) Create a `styles.scss` file (name doesn't matter) in the `src/styles` directory.
2) `npm install` the version of Boostrap you want.
3) In `styles.scss` add `@import 'bootstrap/scss/bootstrap.scss';`
4) In `src/app/app.module.ts` add underneath the other import statements: `import '../styles/styles.scss';`