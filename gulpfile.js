const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const browserSync = require('browser-sync');
const autoprefixer = require('autoprefixer');
const minimist = require('minimist'); // 用來讀取指令轉成變數
const gulpSequence = require('gulp-sequence').use(gulp);

// production || development 
// gulp --env production
const envOptions = {
  string: 'env',
  default: {
    env: 'development'
  }
};
const options = minimist(process.argv.slice(2), envOptions);
console.log(options);

gulp.task('clean', () => {
  return gulp.src([
    './build', './.tmp'
  ], {read: false}) // 選項讀取：false阻止gulp讀取文件的內容，使此任務更快。
    .pipe($.clean());
});

gulp.task('babel', function () {
  return gulp
    .src(['./src/js/*.js'])
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    // .pipe($.concat('all.js'))
    .pipe($.babel({presets: ['env']}))
    .pipe($.if (options.env === 'production', $.uglify({
      compress: {
        drop_console: true
      }
    }))).pipe($.sourcemaps.write('.')).pipe(gulp.dest('./build/js')).pipe(browserSync.reload({stream: true}));
});

gulp.task('m-babel', function () {
  return gulp
    .src(['./src/m/js/*.js'])
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    // .pipe($.concat('all.js'))
    .pipe($.babel({presets: ['env']}))
    .pipe($.if (options.env === 'production', $.uglify({
      compress: {
        drop_console: true
      }
    }))).pipe($.sourcemaps.write('.')).pipe(gulp.dest('./build/m/js')).pipe(browserSync.reload({stream: true}));
});

gulp.task('libJs', function () {
  return gulp.src(['./src/js/lib/**/*.js'])
  // .pipe($.order([ 'jquery.js', 	'bootstrap.js' ])) // 照順序讀取
  // .pipe($.concat('vendor.js'))
    .pipe(gulp.dest('./build/js/lib'))
});

gulp.task('m-libJs', function () {
  return gulp.src(['./src/m/js/lib/**/*.js'])
  // .pipe($.order([ 'jquery.js', 	'bootstrap.js' ])) // 照順序讀取
  // .pipe($.concat('vendor.js'))
    .pipe(gulp.dest('./build/m/js/lib'))
});

gulp.task('sass', function () {
  // PostCSS AutoPrefixer
  var processors = [autoprefixer({
      browsers: ['last 5 version', 'ie 8']
    })];

  return gulp
    .src(['./src/scss/**/*.sass', './src/scss/**/*.scss'])
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass({outputStyle: 'nested'}).on('error', $.sass.logError))
    // .pipe($.concat('all.css'))
    .pipe($.postcss(processors))
    .pipe($.if (options.env === 'production', $.cleanCss()) ) // 假設開發環境則壓縮 CSS
        .pipe($.sourcemaps.write('.')).pipe(gulp.dest('./build/css')).pipe(browserSync.reload({stream: true}));
});

gulp.task('m-sass', function () {
  // PostCSS AutoPrefixer
  var processors = [autoprefixer({
      browsers: ['last 5 version', 'ie 8']
    })];

  return gulp
    .src(['./src/m/scss/**/*.sass', './src/m/scss/**/*.scss'])
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass({outputStyle: 'nested'}).on('error', $.sass.logError))
    // .pipe($.concat('all.css'))
    .pipe($.postcss(processors))
    .pipe($.if (options.env === 'production', $.cleanCss()) ) // 假設開發環境則壓縮 CSS
    .pipe($.sourcemaps.write('.')).pipe(gulp.dest('./build/m/css')).pipe(browserSync.reload({stream: true}));
});

gulp.task('imageMin', function () {
  gulp
    .src('./src/images/**/**')
    .pipe($.if (options.env === 'production', $.imagemin()) ).pipe(gulp.dest('./build/images'));
});

gulp.task('m-imageMin', function () {
  gulp
    .src('./src/m/images/**/**')
    .pipe($.if (options.env === 'production', $.imagemin()) ).pipe(gulp.dest('./build/m/images'));
});

gulp.task('copy', function () {
  gulp
    .src(['./src/**/*.html'])
    .pipe(gulp.dest('./build/'))
		.pipe(browserSync.reload({stream: true}));
		
  gulp
    .src(['./src/scss/**/*.ttf'], ['./src/scss/**/*.otf'])
		.pipe(gulp.dest('./build/css'))
	gulp
    .src(['./src/m/scss/**/*.ttf'], ['./src/m/scss/**/*.otf'])
		.pipe(gulp.dest('./build/m/css'))
		
	gulp
    .src(['./src/scss/**/*.css'])
		.pipe(gulp.dest('./build/css'))
	gulp
    .src(['./src/m/scss/**/*.css'])
    .pipe(gulp.dest('./build/m/css'))
});

gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: './build'
    },
    reloadDebounce: 2000
  })
});

gulp.task('watch', function () {
  gulp.watch(['./src/scss/**/*.sass', './src/scss/**/*.scss'], ['sass']);
  gulp.watch(['./src/js/**/*.js'], ['babel']);
	gulp.watch(['./src/**/*.html'], ['copy']);

	gulp.watch(['./src/m/scss/**/*.sass', './src/m/scss/**/*.scss'], ['m-sass']);
  gulp.watch(['./src/m/js/**/*.js'], ['m-babel']);
  // gulp.watch(['./src/m/**/*.html'], ['m-copy']);
});

gulp.task('deploy', function () {
  return gulp
    .src('./build/**/*')
    .pipe($.ghPages());
});

gulp.task('sequence', gulpSequence('clean', 'copy', 'sass', 'babel', 'libJs', 'imageMin'));

gulp.task('default', [
  'copy',
  'sass',
  'babel',
  'libJs',
	'imageMin',
	'm-sass',
  'm-babel',
  'm-libJs',
  'm-imageMin',
  'browserSync',
	'watch',
]);
gulp.task('build', ['sequence'])
