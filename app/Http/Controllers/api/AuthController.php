<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    
    public function login(Request $request){
           $request->validate([
            "email" => "required|email",
            "password" => "required|min:8|string"
        ]);
        $user = User::where("email" , $request->email)->first();
        if (!$user || !Hash::check($request->password , $user->password)) {
            return response()->json([
                "status" => "faild",
                "message" => "invalid credntails"
            ],401);
        }
        $token = $user->createToken($request["email"])->plainTextToken;
           $response = [
            "status" => "success",
            "message" => "user is logged successfully",
            "data" => [
            "token" => $token ,
            "user" => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email
            ]
            ]
            ];
            return response()->json($response , 200);
    }
    /* public function logout(){
        auth()->user()->tokens()->delete();
        return response()->json([
            "status" => "success",
            "message" => "user is logout successfully",
        ]);
    } */
}
