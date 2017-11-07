var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var concat = require('gulp-concat');

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

gulp.task('concat', function () {
    return gulp.src(paths.scripts)
        .pipe(concat('main.js'))
        .pipe(gulp.dest(destinations.dist));
})

gulp.task('default', function () {
    gulp.start('watch');
});