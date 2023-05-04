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
