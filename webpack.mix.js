const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/src/index.js', 'public/js')
    .react()
    .sass('resources/sass/app.scss', 'public/css');

// run versioning on production only
if (mix.inProduction()) {
    mix.version();
}

const domain = process.env.APP_DOMAIN;

// Cấu hình hot reload trang web
mix.browserSync({
    proxy: 'https://' + domain,
    host: domain,
    open: 'external',
    https: {
        key: process.env.LOCAL_CERTIFICATES_KEY,
        cert: process.env.LOCAL_CERTIFICATES_CERT,
    },
})
