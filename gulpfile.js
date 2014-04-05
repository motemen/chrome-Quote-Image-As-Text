var gulp = require('gulp'),
    zip  = require('gulp-zip'),
    exec = require('child_process').exec,
    Q    = require('q');

gulp.task('zip', function (cb) {
    var q = Q.defer();

    exec('git describe --tags --always --dirty', function (err, stdout, stderr) {
        if (err) {
            q.reject(err)
            return;
        }

        var tag = stdout.replace(/\n/, '');
        gulp.src('app/**/*')
            .pipe(zip('Quote-Image-As-Text-' + tag + '.zip'))
            .pipe(gulp.dest('build'))
            .on('end', function () {
                q.resolve();
            });
    });

    return q.promise;
});
