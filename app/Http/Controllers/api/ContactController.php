<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $contacts = Contact::all();
        $contacts = $contacts->map(function($contact){
            return[
                'id' => $contact->id,
                'first_name' => $contact->first_name,
                'last_name' => $contact->last_name,
                'email' => $contact->email,
                'phone' => $contact->phone,
                'description' => $contact->description,
                'address' => $contact->address,
            ]; 
        });
        if ($contacts->isEmpty()) {
        return response()->json(["status" => "failed","message"=> "there is not request to contact"],404);
        }
        return response()->json(["status"=> "success" , "data" => $contacts],200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|regex:/^([0-9\s\-\+\(\)]*)$/|max:50|min:7',
            'description' => 'required|string',
            'address' => 'required|string'
        ]);
        $contact = Contact::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'description' => $request->description,
            'address' => $request->address
        ]);
          return response()->json(["status"=> "success" , "data" => $contact]);
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
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|regex:/^([0-9\s\-\+\(\)]*)$/|max:50|min:9',
            'description' => 'required|string',
            'address' => 'required|string'
        ]);
        $contact = Contact::find($id);
        if (empty($contact)) {
              return response()->json(["message"=> "there is not request to contact for id"]);
        }
         $contact->update([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'description' => $request->description,
            'address' => $request->address
        ]);
          return response()->json(["status"=> "success" , "data" => $contact]);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
          $contact = Contact::find($id);
        if (empty($contact)) {
              return response()->json(["message"=> "there is not request to contact for id"]);
        }
        $contact->delete();
            return response()->json(["message"=> "deleted successfully"]);
    }
}
