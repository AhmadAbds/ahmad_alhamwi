<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $skills = Skill::all();
        $skills = $skills->map(function($skill){
            return [
            'id' => $skill->id,
            'title' => $skill->title,
            'value' => $skill->value,
            'category_id' => $skill->category_id, 
            'category_type' => $skill->category->type
            ];
        });
             if ($skills->isEmpty()) {
            return response()->json(["message" => 'not found skills'] , 404);
        }
        return response()->json([
            "status" => 'success'
            ,
            "data" => $skills] , 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
        'title' => 'required|string',
        'value' => 'required|numeric|min:0|max:100',
        'category_id' => 'required|exists:categories,id'
    ]);
    $skill = Skill::create([
          'title' => $request->title,
            'value' => $request->value,
            'category_id' => $request->category_id
    ]);
    $skill->load("category");
    return response()->json($skill, 201);
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
        'title' => 'required|string',
        'value' => 'required|numeric|min:0|max:100',
        'category_id' => 'required|exists:categories,id'
    ]);
        $skill = Skill::find($id);
        if (empty($skill)) {
            return response()->json(["message"=> "not found skill for id"]);
        }
        $skill->title= $request->title;
        $skill->value = $request->value;
        $skill->category_id = $request->category_id;
        $skill->save();
          return response()->json($skill, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
         $skill = Skill::find($id);
        if (empty($skill)) {
            return response()->json(["message"=> "not found skill for id"]);
        }
          if ($skill->delete()) {
        return response()->json(["message" => "succefully"] , 200);
       }
        return response()->json(["message" => "error"]);
    }
}
