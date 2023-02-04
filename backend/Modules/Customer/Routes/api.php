<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([ 'prefix' => 'customer', 'middleware' => 'auth:api'], function () {
    Route::post('/add', 'CustomerController@store');
    Route::get('/list', 'CustomerController@index');
    Route::post('/update/{customer}', 'CustomerController@update');
    Route::get('/show/{customer}', 'CustomerController@show');
    Route::delete('/delete/{customer}', 'CustomerController@delete');
});
