<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Personal_information;
use Illuminate\Http\Request;

class Personal_informationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $personal_informations = Personal_information::all();
        $personal_informations = $personal_informations->map(function($personal_information){
            return [
                'id' => $personal_information->id,
                'title' => $personal_information->title,
                'description' => $personal_information->description,
                'email' => $personal_information->email,
                'phone' => $personal_information->phone,
                'address' => $personal_information->address,
                'facebook' => $personal_information->facebook,
                'github' => $personal_information->github,
                'linkedin' => $personal_information->linkedin,
                'telegram' => $personal_information->telegram,
            ];
        });
        if ($personal_informations->isEmpty()) {
            return response()->json(["message"=> "data of personal information is empty"],404); 
        }
        return response()->json(["status"=> "success", "data" => $personal_informations]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|string',
            'address' => 'required|string',
            'facebook' => 'nullable|string',
            'github' => 'nullable|string',
            'linkedin' => 'nullable|string',
            'telegram' => 'nullable|string'
        ]);
        $personal_information = Personal_information::create([
            'title' => $request->title,
            'description' => $request->description,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'facebook' => $request->facebook,
            'github' => $request->github,
            'linkedin' => $request->linkedin,
            'telegram' => $request->telegram
        ]);
        $personal_information->save();
        return response()->json(["status"=> "success", "data" => $personal_information]);
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
            'description' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|string',
            'address' => 'required|string',
            'facebook' => 'nullable|string',
            'github' => 'nullable|string',
            'linkedin' => 'nullable|string',
            'telegram' => 'nullable|string'
        ]);
        $personal_information = Personal_information::find($id);
        if (empty($personal_information)) {
              return response()->json(["message" => "not found information for id"]);
        }
        $personal_information->update([
            'title' => $request->title,
            'description' => $request->description,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'facebook' => $request->facebook,
            'github' => $request->github,
            'linkedin' => $request->linkedin,
            'telegram' => $request->telegram
        ]);
        return response()->json(["status"=> "success", "data" => $personal_information]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
              $personal_information = Personal_information::find($id);
        if (empty($personal_information)) {
              return response()->json(["message" => "not found information for id"]);
        }
        $personal_information->delete();
         return response()->json(["message"=> "deleted successfully"]);
    }
}
