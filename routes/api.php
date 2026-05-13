<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\HomeController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\CheckoutController;
use App\Http\Controllers\Api\PaymentController;

Route::get('/categories', [HomeController::class, 'category']);

Route::get('/products/{id}', [HomeController::class, 'productsCategory']);
Route::get('/products', [HomeController::class, 'products']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/signup', [AuthController::class, 'signup']);
//Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/add-cart', [CartController::class, 'store']);
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/update-cart', [CartController::class, 'update']);
    Route::post('/remove-cart', [CartController::class, 'remove']);
    Route::post('/merge-cart', [CartController::class, 'merge']);
    Route::post('/logout_data', [AuthController::class, 'logout']);
    Route::post('/checkout', [CheckoutController::class, 'checkout']);
    Route::get('/order-list', [PaymentController::class, 'orderList']);
    Route::post('/create-order', [PaymentController::class, 'createOrder']);
    Route::post('/verify-payment', [PaymentController::class, 'verify']);
    Route::get('/cart-count', [CartController::class, 'cartCount']);
});
