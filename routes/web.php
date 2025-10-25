<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

Route::get('/check-db-connection', function() {
    try {
        DB::connection()->getPdo();
        $databaseName = DB::connection()->getDatabaseName();
        $tables = DB::select('SHOW TABLES');
        
        return response()->json([
            'status' => 'success',
            'message' => 'تم الاتصال بنجاح بقاعدة البيانات!',
            'database' => $databaseName,
            'tables_count' => count($tables),
            'tables' => $tables
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'فشل في الاتصال بقاعدة البيانات',
            'error' => $e->getMessage()
        ], 500);
    }
});
 
Route::get('/{path?}', function () {
    return view('welcome'); // أو أي view آخر يحتوي على تطبيق React
})->where('path', '.*');
// خدمة الملفات الثابتة من مجلد التخزين
