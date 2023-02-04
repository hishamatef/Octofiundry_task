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

Route::group([ 'prefix' => 'purchase', 'middleware' => 'auth:api'], function () {
    Route::post('/add', 'PurchaseController@store');
    Route::get('/list', 'PurchaseController@index');
    Route::post('/update/{purchase}', 'PurchaseController@update');
    Route::get('/show/{purchase}', 'PurchaseController@show');
    Route::delete('/delete/{purchase}', 'PurchaseController@delete');
});
