# Scratch Chrome Plugin

## Getting Started

```
npm install
```

## Build

Build the plugin:

```
npm run build:plugin
```

## Testing

Run all tests:

```
npm run test
```

Run all tests with coverage:

```
npm run coverage
```

### Tests for Creating Diagrams

To add more tests for `createDiagram(...)`, which returns an Expression Tutor diagram
given a Scratch block and the thread that was used to evaluate the block,
run the chrome extension on a Scratch project, and click on the 'e' button on the block to test.
Make sure update the condition in `diagramUtils.js` to `process.env.NODE_ENV` instead of `process.env.NODE_ENV === testing`.
There will be 4 strings in the console after the click:

1. stringified version of the block
2. stringified version of the thread without the private `_cache` attribute
3. stringified version of object with the `_cache`
4. stringified version of diagram produced

Replace everything in the `blockContainer` attribute in (2) with (3).
The new thread object should be used as the second argument.
The first argument is (1).
The expected is (4).

## Load into your Chrome plugins

  0. Build both the bundle and the plugin;
  1. Open Chrome;
  2. Go to the following URI: `chrome://extensions/`;
  3. Make sure that `Developer mode` is active (top-right of the page);
  4. Press `load unpacked`;
  5. Browse to the location of this plugin and select the `build` directory;

## Authors

* Alen Sugimoto
* Andrea Gallidabino
