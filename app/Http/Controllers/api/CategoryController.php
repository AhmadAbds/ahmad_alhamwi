<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::all();
        $categories = $categories->map(function($category){
            return [
                'id' => $category->id ,
                'type' => $category->type
            ];
        });
        if ($categories->isEmpty()) {
            return response()->json(["message" => 'not found categories'] , 404);
        }
        return response()->json([
            "status" => 'success'
            ,
            "data" => $categories] , 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'type' => 'required|string'
        ]);
        $category = Category::create([
            'type' => $request->type
        ]);

        return response()->json(["category" => $category] , 201); 
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
     //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
         $request->validate([
            'type' => 'required|string'
        ]);
          $category = Category::find($id);
        if (empty($category)) {
            return response()->json(["message"=>"not found category for id"]);
        }
        $category->type = $request->type;
        $category->save();
        return response()->json([
        "message" => "Category updated successfully",
        "data" => $category
    ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
         $category = Category::find($id);
        if (empty($category)) {
            return response()->json(["message"=>"not found category for id"]);
        }
        if ($category->delete()) {
        return response()->json(["message" => "succefully"] , 200);
       }
        return response()->json(["message" => "error"]);
    }
}
