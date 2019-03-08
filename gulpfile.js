const { watch, src, dest, parallel, series } = require('gulp');
const scss = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');


function css() {
  return src('wos_files/wos.scss')
    .pipe(scss())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(dest('wos_files/'))
}

exports.css = css;

exports.default = parallel(css);

watch('wos_files/wos.scss', series(css));