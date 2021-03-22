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
## Example Setup Billing
```
# Create a recurring "Demo" plan for $5.00, with 7 trial days, which will be presented on install to the shop and have the ability to issue usage charges to a maximum of $10.00
INSERT INTO plans (`type`,`name`,`price`,`interval`,`capped_amount`,`terms`,`trial_days`,`test`,`on_install`,`created_at`,`updated_at`) VALUES
('RECURRING','Test Plan',5.00,'EVERY_30_DAYS',10.00,'Test terms',7,FALSE,1,NULL,NULL);
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
