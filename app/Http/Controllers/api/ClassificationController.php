<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Classification;
use Illuminate\Http\Request;

class ClassificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $classifications = Classification::all();
        $classifications = $classifications->map(function($classification){
            return [
                'id' => $classification->id ,
                'type' => $classification->type
            ];
        });
        if ($classifications->isEmpty()) {
            return response()->json(["message" => 'not found classifications'] , 404);
        }
        return response()->json([
            "status" => 'success'
            ,
            "data" => $classifications] , 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'type' => 'required|string'
        ]);
        $classification = Classification::create([
            'type' => $request->type
        ]);

        return response()->json(["data" => $classification] , 201); 
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
          $classification = Classification::find($id);
        if (empty($classification)) {
            return response()->json(["message"=>"not found category for id"]);
        }
        $classification->type = $request->type;
        $classification->save();
        return response()->json([
        "message" => "classification updated successfully",
        "data" => $classification
    ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
         $classification = Classification::find($id);
        if (empty($classification)) {
            return response()->json(["message"=>"not found classification for id"]);
        }
        if ($classification->delete()) {
        return response()->json(["message" => "succefully"] , 200);
       }
        return response()->json(["message" => "error"]);
    }
}
