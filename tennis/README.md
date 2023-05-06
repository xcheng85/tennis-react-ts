# tennis-react-ts
tennis system built with react and ts

## From scratch
project scaffolding tools 

npx create-react-app tennis --template typescript

### Linting
Microsoft's ESLint ext

### Formatting
npm install prettier -D
npm install eslint-config-prettier eslint-plugin-prettier -D
"plugin:prettier/recommended"
touch .prettierrc.json
prettier options

Prettier - Code formatter
format on save
look at setting.json for workspace config

### Build
production
npm run build

### chrome extension
React Developer Tools
components and profile

### Hooks
all the hooks has rules


1. effect hook 
common use case: fetching data
use case2: mannualy register dom events
    1. useEffect()
    2. dependencies
    3. can return cleanup function
    4. does not support async await 

2. state hook
    1. useState hook
    state is scattered
    state defined in a variable, for simple state
    update state value is not immediate, wait for the next renderer
    2. useReducer hook
    state is organized in one object
    define action type: union of all supported action
    a reducer function for state changes; for complex usage

3. ref hook
    usage: access HTML elements
    imperitive move focus to a html element
    1. syntax: useRef
    2. change without re-render

4. memo hook
    usage: computationally heavy
    1. syntax: useMemo

5. callback hook + memo function
    usage: prevent unnecessary re-render of child components
    component is re-renderer if parent re-renderer
    virtual dom change detection
    avoid re-render of component that fetches data/have heavy compotation

6. useParams hook. 
    usage: component to fetch the params from the routers
    1. syntax: useParams
7. useRouteError hook
    usage: react router error

## CSS
Tailwind 

npm i -D tailwindcss
npm i -D postcss
npm i -D autoprefixer

npx tailwindcss init -p

tailwind directives in index.css


## Router
React Router is a library 
npm i react-router-dom

route: path + component

Link, NavLink: navigation
Link: relative component path
NavLink: more style options

nested routes + Parent/Child Component (React Router's Outlet component)
route parameters, useParams hook

## Custom Error Page
errorElement of router
useRouteError hook

## Typescript
1. type predicate function

## HTML Element
html list item,
unique key prop: react efficient
<li>

header 
h1
nav