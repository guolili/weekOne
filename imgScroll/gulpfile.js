const gulp = require('gulp');
const webserver = require('gulp-webserver');
const fs = require('fs');
const path = require('path');
const url = require('url');
gulp.task('page',() => {
	gulp.src('./') 
		.pipe(webserver({
			port: 8090,
			livereload: true
		}))
})
gulp.task('server',() => {
	gulp.src('./')
		.pipe(webserver({
			port: 8080,
			middleware : (request, response) => {
				if (request.url === '/') {
					return;
				}
				const file = url.parse(request.url,true).pathname.split('/')[1];//截取请求
				const filePath = path.resolve('Data', file + '.json');
				if (fs.existsSync(filePath)) {
					let data = fs.readFileSync(filePath);
					response.writeHead(200, {
						'Content-Type': 'text/json',
						'Access-Control-Allow-Origin': '*'
					})
					response.end(data);
				} else {
					response.end('not found');
				}
			}
		}))
})
gulp.task('default',['page','server']);