<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Achievement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use ImageKit\ImageKit;

class AchievementController extends Controller
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



    public function index()
    {
        $Achievements = Achievement::all();
        $Achievements = $Achievements->map(function($Achievement){
            return [
                'id' => $Achievement->id,
                'image' => $Achievement->image
               /*  'image' => $Achievement->image_url */
            ];
        });
           if ($Achievements->isEmpty()) {
            return response()->json(["message" => 'not found data of Achievements'] , 404);
        }
        return response()->json([
            "status" => 'success'
            ,
            "data" => $Achievements] , 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image',
        ]);
          $file = $request->file('image');
        $fileName = 'achie_' . time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
        
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
         if (isset($uploadResponse->result->url)) {
            $Achievement = Achievement::create([
                'image' => $uploadResponse->result->url,
            ]);
        $Achievement->save();
        
         return response()->json($Achievement, 200);
    }
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
            'image' => 'required|image',
        ]);
        $Achievement = Achievement::find($id);
      if (empty($Achievement)) {
            return response()->json(["message" => "data of Achievement not found"]);
        }
        

     if ($request->hasFile("image")) {
             $file = $request->file('image');
            $fileName = 'achie_' . time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            
            $uploadResponse = $this->imagekit->upload([
                'file' => base64_encode(file_get_contents($file->getRealPath())),
                'fileName' => $fileName,
                'folder' => '/portfolio',
            ]);
            $data['image'] = $uploadResponse->result->url;
             $Achievement->update($data);
         }
    return response()->json($Achievement , 200); 
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
          $Achievement = Achievement::find($id);
         if (empty($Achievement)) {
            return response()->json(["message" => "data of Achievement not found"]);
        }
        
        $Achievement->delete();
        return response()->json(["message" => "delete data of Achievement successfully"]);
    }
}
