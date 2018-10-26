const ENV = process.env.ENV || 'local';

const path = require('path');
const gulp = require('gulp');
const sync = require('gulp-sync')(gulp).sync;
const ga = require('./utils/ga');
const Config = require('./config')(ENV);
let recipe = (name, config) => require('./recipes/' + name)(config);

console.log('Building with config: ', Config);

gulp.task('env', recipe('env', {
  NODE_PATH: 'source/js:node_modules'
}));

gulp.task('clean', recipe('clean', {
  input: './dist'
}));

gulp.task('css', Config.CSS_BUNDLES.map(title => {
  gulp.task(`css:${title}`, recipe('stylus', {
    input: `./source/css/${title}.bundle.${Config.EXT.CSS}`,
    output: './dist/css',
    name: `${title}.css`
  }));

  return `css:${title}`;
}));

gulp.task('js:node_modules', recipe('browserify', {
  input: '',
  require: Config.NODE_MODULES,
  output: './dist/vendor',
  name: 'node_modules.js'
}));

gulp.task('static', recipe('copy', {
  input: './source/static/**/*',
  output: './dist'
}));

gulp.task('static:node_modules', recipe('copy', {
  input: [
    './node_modules/react/umd/react.development.js',
    './node_modules/react-dom/umd/react-dom.development.js',
  ],
  output: './dist/vendor'
}));

gulp.task('inject', recipe('html', {
  cwd: path.resolve(process.cwd(), 'dist'),
  input: './source/html/**/*.html',
  sources: [[
    '!vendor/node_modules.js',
    '!vendor/react.development.js',
    '!vendor/react-dom.development.js',
    'vendor/**/*'
  ], [
    '!js/bundle.js',
    'css/**/*',
    'js/**/*',
  ]],
  output: './dist',
  replacements: [
    ['@{SENTRY}', Config.SENTRY],
    ['@{GA}', ga(Config.GA)],
    ['@{VERSION}', Config.VERSION],
    ['@{ENV}', Config.ENV],
  ],
}));

gulp.task('server', recipe('server', {
  input: './dist',
  port: 3000,
}));

gulp.task('watch', () => {
  gulp.watch([
    './source/html/**/*.html',
    './dist/**/*.js',
    './dist/**/*.css',
    './dist/vendor/**/*',
  ], ['inject']);
  gulp.watch('./source/css/**/*.styl', ['css']);
  gulp.watch('./source/static/**/*', ['static']);
});

var compileAsync = ['js:node_modules', 'static:node_modules', 'static', 'css'];
gulp.task('compile', sync(['env', 'clean', compileAsync, 'inject']));
gulp.task('default', ['compile', 'watch', ENV === 'local' ? 'server' : '']);