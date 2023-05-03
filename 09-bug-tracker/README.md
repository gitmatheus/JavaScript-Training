```
npm install
npm init -y
```

### Deployment Steps

1. minify all the js files
2. uglify all the js files
3. bundle the js files
4. version the bundled files
5. minify the css files
6. bundle the css files
7. version the bundled css files
8. update the references of the generated js & css files in the index.html
9. minify the index.html

This is now handled by the `webpack`. We also need `axios`.

### Bundler

Your page can only make tops 6 requests at the same time.
60 request would cause it to batch 10 requests.

```
// Install dev dependencies
npm install webpack webpack-cli --save-dev
npm install webpack webpack-dev-server --save-dev

// Install runtime dependencies
npm install axios
```

Run `npx weback` to bundle the application.

```
// Bundle the code for deployment
webpack --env production

// Runs the build in a new server
webpack-dev-server

```

### ES6

Everything defined in a JS file is considered private by default.
Anything that must be public has to be explicitly "exported"
