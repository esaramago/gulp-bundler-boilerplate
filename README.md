# Gulp Bundler

## Features

### HTML minification with Gulp
Just takes `index.html`, minifies it and puts it in `dist` folder.

### SCSS compilation with Gulp
Takes every `.scss` file and concats them in one file. Than minifies it and puts it in `dist` folder.  
It supports glob imports (ex.: `@import "folder/*";`).

### JS bundling with Gulp + Browserify. 
Bundles js files, minifies them and puts them in `dist` folder.  
It supports multiple file outputs.

## Compilation

- `npm run watch` - development
- `npm run build` - production

## Credits
- https://www.youtube.com/watch?v=ax0ykSVPufs