# Gulp Bundler

## Features

### HTML minification with Gulp
Just takes `index.html`, minifies it and puts it in `dist` folder.

### SCSS compilation with Gulp
Takes every `.scss` file and concats them in one file. Than minifies it and puts it in `dist` folder.  
It uses ITCSS architecture (https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/)
It supports glob imports (ex.: `@import "folder/*";`).  
It supports multiple file outputs.

### JS bundling with Gulp + Browserify. 
Bundles js files, minifies them and puts them in `dist` folder.  
Uses Envify to enable frameworks production mode (https://vuejs.org/v2/guide/deployment.html#Browserify).  
It supports multiple file outputs.

## Compilation

- `npm run watch` - development
- `npm run build` - production

## Credits
- https://www.youtube.com/watch?v=ax0ykSVPufs