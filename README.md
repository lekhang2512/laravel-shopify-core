## Installation
```
composer install
php artisan key:generate
copy .env.example .env
php artisan vendor:publish --tag=shopify-config
php artisan vendor:publish --tag=shopify-migrations
.env change CACHE_DRIVER=array
php artisan config:cache
php artisan migrate
```
## Dependencies
- [laravel-shopify](https://github.com/osiset/laravel-shopify)
- [repository](https://github.com/lekhang2512/repository)
- [response](https://github.com/lekhang2512/response)
- [reactjs](https://github.com/facebook/react)
- [react-dom](https://github.com/facebook/react/tree/master/packages/react-dom)
- [redux](https://github.com/reduxjs/redux)
- [react-redux](https://github.com/reduxjs/react-redux)
- [react-thunk](https://www.npmjs.com/package/redux-thunk)
- [redux-devtools-extension](https://www.npmjs.com/package/redux-devtools-extension)
- [redux-logger](https://www.npmjs.com/package/redux-logger)
- [@shopify/app-bridge-react](https://www.npmjs.com/package/@shopify/app-bridge-react)
- [@shopify/polaris](https://www.npmjs.com/package/@shopify/polaris)
- [raven-js](https://www.npmjs.com/package/raven-js)
