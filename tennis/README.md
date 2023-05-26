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
8. useSearchParams hook
    get and set qs of router
9. useNavigate hook
    usage: programmatically navigate components, such as: search
10. useForm hook
    usage: for form validation and submission
11. useLoadData hook
    usage: react router do the data loading
    component use the hook to fetch data
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

Index Routes: 
a child in route with index field: true

routing query string: useSearchParams hook

navigate imperitively: useNavigate hook for search

## Custom Error Page
errorElement of router
useRouteError hook

## Typescript
1. type predicate function
2. nullish coalescing operator ??

## Form
tailwind pulgin for style form
npm i -D @tailwindcss/forms

1. html form
2. react Form: much simpler
3. React hook form: (extra react lib)
    1. complex validation: FieldError
    2. submission logic
    3. optimized avoid re-render
    4. auto validation mouse lose focus

    npm i react-hook-form

## React Form Usage with third-party components react-select
https://blog.logrocket.com/react-hook-form-complete-guide/
npm i react-select

using a Controller component




## HTML Element
html list item,
unique key prop: react efficient
<li>

header 
h1
nav

React: FormEvent
native js: FormData

className="relative text-right": form upper right corner

button three type: 
1. button
2. submit: for form
3. reset: clean

ul: HTML Lists unordered
ol: ordered list
li

label: 
Associating a <label> with a form control, such as <input> or <textarea> offers some major advantages:

## Performance Optimization
lazy loading: fallback during downloading the page
default export is pre-requisite
webpack: separate bundle
react Suspense component

Slow3G in chrome dev tools


## State Management
1. Prop drilling: Parent pass down to child component
2. Context feature in react
3. Redux. 

npm i @reduxjs/toolkit react-redux

    1. immutable object: store
    2. state is updated through dispatch action
    3. reducer + action --> update state

    4. Provider component: input prop is store, 
        this component enables all the child component to access store


## Integration with REST API
1. fetch api
2. React Router: 
    reduce number of re-renderer
    1. useLoadData hook
    2. rest api is completed before rendering the component
    3. downside: require a mannual refresh to see the updates

3. Deferer react router 
    1. improve user experience with no delay for component rendering


4. React Query
    client side cache
    1. cache api 
    2. install: npm install @tanstack/react-query
    3. Provider component wrap up components which needs to access the data where the provider component manages.(cache included)
    4. useQuery hook. read
    5. useMutation hook. update
    6. useQueryClient hook, access cached data
    6. React Query assumes data is stale when browser regains focus

5. Combination of React Router and React Query

3. Mock with json-server
npm i -D json-server
4. env var for rest endpoints


1. type assertion to strongly type the data from REST API.

## Integration with GraphQL API
1. fetch + react query

2. Apollo Client
npm i @apollo/ckuebt graphql

both 1 and 2 has useQuery hook
useMutate hook

## Generic React Component
typescript generics
generic react props

1. component allow pass in data
2. component allow pass in style
     rest parameters
    prop spread
3. component allow pass in render prop
    consumer decide how to render the data
    ReactNode: an element react can render

4. state in generic component
   useState hook

5. custom hook
   custom hook vs regular function
   customm hook uses standard react hook
   regular function does not 

6. 

## for .env to work
REACT_APP_ prefix is a must
