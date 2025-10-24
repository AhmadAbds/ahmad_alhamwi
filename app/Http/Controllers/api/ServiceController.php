<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ServiceController extends Controller
{
      public function index()
    {
        $services = Service::all();
        $services = $services->map(function($service){
            return [
                'id' => $service->id,
                'title' => $service->title,
                'description' => $service->description,
                'image' => $service->image_url
            ];
        });
           if ($services->isEmpty()) {
            return response()->json(["message" => "don't have services"] , 404);
        }
        return response()->json([
            "status" => 'success'
            ,
            "data" => $services] , 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string' ,
            'image' => 'required|image'
        ]);
    $imagePath = $request->file('image')->store('service', 'public');
        $service = Service::create([
            'title' => $request->title,
            'description' => $request->description,
            'image' => $imagePath
        ]);
        $service->save();
        
         return response()->json([
            "status" => 'success'
            ,
            "data" => $service] , 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
    
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
      $request->validate([
            'title' => 'required|string',
            'description' => 'required|string' ,
            'image' => 'required|image'
        ]);
        $service = Service::find($id);
      if (empty($service)) {
            return response()->json(["message" => "data of service not found"]);
        }
         $data = [
            'title' => $request->title,
            'description' => $request->description,
               ];

     if ($request->hasFile("image")) {
             $imagePath = $request->file('image')->store('service', 'public');
             Storage::disk('public')->delete($service->image);
             $service->update(['image' => $imagePath]);
         }
    
    $service->update($data);

    return response()->json($service , 200);
           
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
          $service = Service::find($id);
         if (empty($service)) {
            return response()->json(["message" => "data of service not found"]);
        }
        if ($service->image && Storage::disk('public')->exists($service->image)) {
        Storage::disk('public')->delete($service->image);
    }
        $service->delete();
        return response()->json(["message" => "delete data of service successfully"]);
    }
}
