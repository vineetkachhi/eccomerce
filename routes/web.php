<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;



Route::prefix('admin')->group(function () {

    Route::get('/', function () {
        return view('welcome');
    });
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->middleware(['auth', 'verified'])->name('dashboard');

    Route::middleware('auth')->group(function () {

        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
        Route::resource('product', ProductController::class);

        Route::get('/category', [CategoryController::class, 'index'])->name('category.list');
        Route::get('/category/create', [CategoryController::class, 'create'])->name('category.create');
        Route::get('/category/edit/{id}', [CategoryController::class, 'edit'])->name('category.edit');
        Route::post('/category/store', [CategoryController::class, 'store'])->name('category.store');
        Route::delete('/category/delete/{id}', [CategoryController::class, 'destroy'])->name('category.destroy');
        Route::put('/category/update/{id}', [CategoryController::class, 'update'])->name('category.update');
        Route::get('/orderlist', [OrderController::class, 'index'])->name('order.list');
        Route::get('/order/edit/{id}', [OrderController::class, 'edit'])->name('order.edit');
        Route::post('order/{id}', [OrderController::class, 'update'])
            ->name('order.update');
    });
});
require __DIR__ . '/auth.php';
Route::get('/{any}', function () {
    return view('frontend');
})->where('any', '^(?!admin|api).*$');
