<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/login', function () {
    if (Auth::user()) {
        return redirect()->route('home');
    }
    return view('login');
})->name('login');

Route::middleware(['auth.shopify', 'billable'])->group(function () {
    Route::get('/', 'HomeController@index')->name('home');
    Route::get('/test', 'HomeController@test')->name('test');

    Route::resource('users', UserController::class);

    Route::get('products', 'ProductController@index')->name('shopify-list-product');
});
