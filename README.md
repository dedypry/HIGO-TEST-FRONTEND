# My Project From HIGO


## Setup API

in file /src/plugins/axios.js

change variable  to adjust Backend server
```sh
const API = 'http://127.0.0.1:3000'
```
## Project Setup

```sh
npm install
```
### Or You Can Run Dockerfile
follow command
```sh
- docker build -t higo-vue:0.0.1 .
- docker run -p 80:80 higo-vue:0.0.1
- open browser http://127.0.0.1
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
