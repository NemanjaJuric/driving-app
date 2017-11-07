var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyjs = require('gulp-js-minify');
var htmlreplace = require('gulp-html-replace');

var paths = {
    sass: 'src/assets/styles/sass/*.scss',
    css: 'src/assets/styles/css/',
    scripts: [
        'src/app/app.js',
        'src/app/config/app.config.js',
        'src/app/controllers/home.controller.js',
        'src/app/controllers/details.controller.js',
        'src/app/components/home.component.js',
        'src/app/components/map.component.js',
        'src/app/services/driving-app.service.js'
    ],
    node_modules:[
        'node_modules/angular/angular.js',
        'node_modules/angular-ui-router/release/angular-ui-router.js'
    ]
}

var destinations = {
    dist: 'dist/'
}

gulp.task('sass', function () {
    sass(paths.sass)
        .on('error', sass.logError)
        .pipe(gulp.dest(paths.css))
});

gulp.task('watch', function () {
    gulp.watch(paths.sass, ['sass']);
});

gulp.task('concat-scripts', function () {
    return gulp.src(paths.scripts)
        .pipe(concat('main.js'))
        .pipe(gulp.dest(destinations.dist));
})

gulp.task('concat-vendor', function () {
    return gulp.src(paths.node_modules)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(destinations.dist));
})

gulp.task('minify-scripts', ['concat-scripts'], function () {
    return gulp.src(destinations.dist + 'main.js')
        .pipe(uglify({ mangle: false }))
        .pipe(minifyjs())
        .pipe(gulp.dest(destinations.dist))
})

gulp.task('minify-vendor', ['concat-vendor'], function () {
    return gulp.src(destinations.dist + 'vendor.js')
        .pipe(uglify({ mangle: false }))
        .pipe(gulp.dest(destinations.dist))
})

gulp.task('html-replace', ['minify-scripts', 'minify-vendor'], function () {
    gulp.src('index.html')
        .pipe(htmlreplace({
            'scripts': 'main.js',
            'vendor': 'vendor.js'
        }))
        .pipe(gulp.dest(destinations.dist));
});

gulp.task('copy', function(){
    gulp.src('src/**/*')
    .pipe(gulp.dest('dist/src'))
})

gulp.task('build', function () {
    gulp.start('copy', 'html-replace');
});