const gulp = require('gulp');
// const sass = require('gulp-sass');
const bs = require('browser-sync').create();

gulp.task('default', function(){

	// gulp.watch('sass/**/*.scss', ['styles']);
	gulp.watch('./index.html').on('change', bs.reload);
	gulp.watch('./css/*.css').on('change', bs.reload);
	// gulp.watch('./css/responsive.css').on('change', bs.reload);
	bs.init({
	    server: "./"
	});
});