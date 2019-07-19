<h1 align="center">
  Gatsby's starter boiler
</h1>

Kick off your project with this boilerplate. This starter ships with the main Gatsby configuration files you might need to get up and running blazing fast with the blazing fast app generator for React.

_Have another more specific idea? You may want to check out our vibrant collection of [official and community-created starters](https://www.gatsbyjs.org/docs/gatsby-starters/)._

## 🚀 Quick start

1.  **Clone the repository.**

    Use `git` clone the repo

    ```sh
    git clone https://github.com/cazuba/gatsby-starter-boiler.git
    ```

1.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```sh
    cd gatsby-starter-boiler/
    npm run develop
    # or it can also be npm start
    ```

1.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

    _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._

    Open the `gatsby-starter-boiler` directory in your code editor of choice and edit `src/pages/index.js`. Save your changes and the browser will update in real time!
## Scripts/Commands

- **Build**

    Build your static code with this command:

    ```sh
    npm run build
    ```
- **Storybook**

    Start developing stories and see how it looks like with this command:

    ```sh
    npm run storybook
    ```
- **Build Storybook**

    Start developing stories and see how it looks like with this command:

    ```sh
    npm run build-storybook
    ```

- **Test cases - Once**

    See how unit tests are working with this command:

    ```sh
    npm run test
    ```
- **Test cases - Watch**

    Start developing tests and see how it looks like while coding, with this command:

    ```sh
    npm run test:w
    ```
- **Test cases - Coverage**

    See how the coverage looks like with this command:

    ```sh
    npm run test:c
    ```

- **Other commands**

    You can also run another commands than sometimes are being used under the hood or maybe for the CI/CD

    ```sh
    npm run format # uses prettier to format your code
    npm run serve # uses the build code to run as static app
    npm run eslint # Checks if your code follows the rules/standards and try to fix simple problems 
    npm run precommit # shortcut for lint-staged [prettier, eslint, git add]
    ```

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in a Gatsby project.

    .
    ├── __mocks__
    ├── .storybook
    ├── node_modules
    ├── src
    ├── static
    ├── stories
    ├── .env.example
    ├── .eslintrc
    ├── .gitignore
    ├── .nvmrc
    ├── .prettierrc
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── jest-preprocess.js
    ├── jest.config.js
    ├── LICENSE
    ├── loadershim.js
    ├── package-lock.json
    ├── package.json
    └── README.md

1.  **`/__mocks__`**: This directory contains all config files for jest

2.  **`/.storybook`**: This directory contains all config and addons files for storybook

3.  **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed

4.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

5.  **`/static`**: This directory will contain all of the static files related to what you will see on the front-end of your site

6.  **`/stories`**: This directory will contain all of the code related to the stories of every one of the `src/components`

7.  **`.env.example`**: This file contains an example of the environment variables you must setup in every environment you want to install the gatsby app

8.  **`.eslintrc`**: This file contains all the developer exception or specific configuration rules for linting the code for standardization

9.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

10.  **`.nvmrc`**: This file tells which is the project's `node version` you should be using (local, staging or production) to install and run within a stable and controlled nodejs environment.

11.  **`.prettierrc`**: This is a configuration file for [Prettier](https://prettier.io/). Prettier is a tool to help keep the formatting of your code consistent.

12.  **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.org/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.

13.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.org/docs/gatsby-config/) for more detail).

14.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

15.  **`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://www.gatsbyjs.org/docs/ssr-apis/) (if any). These allow customization of default Gatsby settings affecting server-side rendering.

16.  **`jest-preprocess.js`**: Jest tells that all js or jsx files need to be transformed using a `jest-preprocess.js` file in the project root. 

17.  **`jest.config.js`**: Because Gatsby handles its own Babel configuration, you will need to manually tell Jest to use babel-jest. The easiest way to do this is to add a `jest.config.js`

18.  **`LICENSE`**: Gatsby is licensed under the MIT license.

19.  **`loadershim.js`**: Jest changing the default `transformIgnorePatterns` to exclude the gatsby module. Transpiling before running in Jest

20. **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

21. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

22. **`README.md`**: A text file containing useful reference information about your project.

## 🎓 Learning Gatsby

Looking for more guidance? Full documentation for Gatsby lives [on the website](https://www.gatsbyjs.org/). Here are some places to start:

- **For most developers, we recommend starting with our [in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.org/tutorial/).** It starts with zero assumptions about your level of ability and walks through every step of the process.

- **To dive straight into code samples, head [to our documentation](https://www.gatsbyjs.org/docs/).** In particular, check out the _Guides_, _API Reference_, and _Advanced Tutorials_ sections in the sidebar.

## 💫 Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/cazuba/gatsby-starter-boiler)

<!-- AUTO-GENERATED-CONTENT:END -->
