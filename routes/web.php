<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;


 
Route::get('/{path?}', function () {
    return view('welcome'); // أو أي view آخر يحتوي على تطبيق React
})->where('path', '.*');
// خدمة الملفات الثابتة من مجلد التخزين
