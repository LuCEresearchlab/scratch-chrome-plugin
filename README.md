# Scratch Chrome Plugin

## Getting Starded:

```
npm install
```

## Build:

Build the scratchWWW bundle. **This operation may takes several minutes to complete!**
This command is not guaranteed to work on machine without Unix.

```
npm run build:bundle
```


Build the plugin:

```
npm run build:plugin
```

## Load into your Chrome plugins

  0. Build both the bundle and the plugin;
  1. Open Chrome;
  2. Go to the following URI: `chrome://extentions/`;
  3. Make sure that `Developer mode` is active (top-right of the page);
  4. Press `load unpacked`;
  5. Browse to the location of this plugin and select the `build` directory;