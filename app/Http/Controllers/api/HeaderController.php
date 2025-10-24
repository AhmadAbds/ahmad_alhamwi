<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Header;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use ImageKit\ImageKit;

class HeaderController extends Controller
{
    
     protected $imagekit;

    public function __construct()
    {
        // تهيئة ImageKit يدوياً في الـ constructor
        $this->imagekit = new ImageKit(
           'public_OT6DRF4ePnj7VfctXtSEYDGWptw=',
            'private_S/CUAzlyLsV1Tv7DC/AU3FX4yVw=',
            'https://ik.imagekit.io/xipaoaj98'
        );
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $headers = Header::all();
        $headers = $headers->map(function($header){
            return [
                'id' => $header->id,
                'name' => $header->name,
                'my_jop' => $header->my_jop,
                'description' => $header->description,
                'profile_image' => $header->profile_image
            ];
        });
           if ($headers->isEmpty()) {
            return response()->json(["message" => 'not found headers'] , 404);
        }
        return response()->json([
            "status" => 'success'
            ,
            "headers" => $headers] , 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'my_jop' => 'required|string',
            'description' => 'required|string' ,
            'profile_image' => 'required|image'
        ]);
          $file = $request->file('profile_image');
        $fileName = 'header_' . time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
        
        $uploadResponse = $this->imagekit->upload([
            'file' => base64_encode(file_get_contents($file->getRealPath())),
            'fileName' => $fileName,
            'useUniqueFileName' => true,
            'transformations' => [[
                'format' => 'webp',
                'quality' =>'70',
                'height' => '800',
                'width' => '1200'
            ]],
            'folder' => '/portfolio',
        ]);
        $header = Header::create([
            'name' => $request->name,
            'my_jop' => $request->my_jop,
            'description' => $request->description,
            'profile_image' => $uploadResponse->result->url,
        ]);
        $header->save();
        
         return response()->json($header, 200);
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
            'name' => 'required|string',
            'my_jop' => 'required|string',
            'description' => 'required|string' ,
            'profile_image' => 'image|nullable'
        ]);
        $header =Header::find($id);
      if (empty($header)) {
            return response()->json(["message" => "header not found"]);
        }
         $data = [
        'name' => $request->name,
        'my_jop' => $request->my_jop,
        'description' => $request->description
    ];

     if ($request->hasFile("profile_image")) {
             $file = $request->file('profile_image');
            $fileName = 'header_' . time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            
            $uploadResponse = $this->imagekit->upload([
                'file' => base64_encode(file_get_contents($file->getRealPath())),
                'fileName' => $fileName,
                'folder' => '/portfolio',
            ]);
            $data['profile_image'] = $uploadResponse->result->url;
         }
    

    $header->update($data);

    return response()->json($header , 200);
           
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
          $header = Header::find($id);
         if (empty($header)) {
            return response()->json(["message" => "header not found"]);
        }
        $header->delete();
        return response()->json(["message" => "delete data of header successfully"]);
    }
}
