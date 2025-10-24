<?php

use App\Http\Controllers\api\About_meController;
use App\Http\Controllers\api\AchievementController;
use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\api\CategoryController;
use App\Http\Controllers\api\ClassificationController;
use App\Http\Controllers\api\ContactController;
use App\Http\Controllers\api\HeaderController;
use App\Http\Controllers\api\Personal_informationController;
use App\Http\Controllers\api\ProjectController;
use App\Http\Controllers\api\ServiceController;
use App\Http\Controllers\api\SkillController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get("/headers" , [HeaderController::class , 'index']);
Route::get("/About_mes" , [About_meController::class , 'index']);
Route::get("/categories" , [CategoryController::class , 'index']);
Route::get("/skills" , [SkillController::class , 'index']);
Route::get("/projects" , [ProjectController::class , 'index']);
Route::get("/achievements" , [AchievementController::class , 'index']);
Route::get("/personal_informations" , [Personal_informationController::class , 'index']);
Route::get("/services" , [ServiceController::class , 'index']);
Route::get("/classifications" , [ClassificationController::class , 'index']);
Route::post("/contacts" , [ContactController::class , 'store']);
Route::post("/login" , [AuthController::class , "login"]);
Route::middleware('auth:sanctum')->get('/user' , function(Request $request){
    return response()->json($request->user());
});
 Route::middleware("auth:sanctum" , "Auth.M")->group(function(){ 
// test header is corrected 100%
Route::post("/headers" , [HeaderController::class , 'store']);
Route::put("/headers/{id}" , [HeaderController::class , 'update']);
Route::delete("/headers/{id}" , [HeaderController::class , 'destroy']); 
// test About me is corrected 100%

Route::post("/About_mes" , [About_meController::class , 'store']);
Route::put("/About_mes/{id}" , [About_meController::class , 'update']);
Route::delete("/About_mes/{id}" , [About_meController::class , 'destroy']);
// test categories is corrected 100%

Route::post("/categories" , [CategoryController::class , 'store']);
Route::put("/categories/{id}" , [CategoryController::class , 'update']);
Route::delete("/categories/{id}" , [CategoryController::class , 'destroy']);
// test skills is corrected 100%

Route::post("/skills" , [SkillController::class , 'store']);
Route::put("/skills/{id}" , [SkillController::class , 'update']);
Route::delete("/skills/{id}" , [SkillController::class , 'destroy']);
// test skills is corrected 100%

Route::post("/projects" , [ProjectController::class , 'store']);
Route::put("/projects/{id}" , [ProjectController::class , 'update']);
Route::delete("/projects/{id}" , [ProjectController::class , 'destroy']);

Route::post("/classifications" , [ClassificationController::class , 'store']);
Route::put("/classifications/{id}" , [ClassificationController::class , 'update']);
Route::delete("/classifications/{id}" , [ClassificationController::class , 'destroy']);
// test achievements is corrected 100%

Route::post("/achievements" , [AchievementController::class , 'store']);
Route::put("/achievements/{id}" , [AchievementController::class , 'update']);
Route::delete("/achievements/{id}" , [AchievementController::class , 'destroy']);
// test personal informations is corrected 100%

Route::post("/personal_informations" , [Personal_informationController::class , 'store']);
Route::put("/personal_informations/{id}" , [Personal_informationController::class , 'update']);
Route::delete("/personal_informations/{id}" , [Personal_informationController::class , 'destroy']);
// test contacts is corrected 100%
Route::get("/contacts" , [ContactController::class , 'index']);
Route::put("/contacts/{id}" , [ContactController::class , 'update']);
Route::delete("/contacts/{id}" , [ContactController::class , 'destroy']);


Route::post("/services" , [ServiceController::class , 'store']);
Route::put("/services/{id}" , [ServiceController::class , 'update']);
Route::delete("/services/{id}" , [ServiceController::class , 'destroy']);
 });