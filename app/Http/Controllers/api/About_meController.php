<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\About_me;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use ImageKit\ImageKit;

class About_meController extends Controller
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
        $About_mes = About_me::all();
        $About_mes = $About_mes->map(function($About_me){
            return [
                'id' => $About_me->id,
                'title' => $About_me->title,
                'description' => $About_me->description,
                'image' => $About_me->image,
                'state' => $About_me->state,
                'expert' => $About_me->expert,
                'languages' => $About_me->languages,
            ];
        });
           if ($About_mes->isEmpty()) {
            return response()->json(["message" => 'not found data of About me'] , 404);
        }
        return response()->json([
            "status" => 'success'
            ,
            "data" => $About_mes] , 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string' ,
            'image' => 'required|image',
            'state' => 'required|string' ,
            'expert' => 'required|string' ,
            'languages' => 'required|string' 
        ]);
          $file = $request->file('image');
        $fileName = 'about_' . time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
        
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
        $About_me = About_me::create([
            'title' => $request->title,
            'description' => $request->description,
          'image' => $uploadResponse->result->url,
            'state' => $request->state,
            'expert' => $request->expert,
            'languages' => $request->languages
        ]);
        $About_me->save();
        
         return response()->json([
            "status" => 'success'
            ,
            "AboutMe" => $About_me] , 200);
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
            'image' => 'image|sometimes',
            'state' => 'required|string' ,
            'expert' => 'required|string' ,
            'languages' => 'required|string' 
        ]);
        $About_me = About_me::find($id);
      if (empty($About_me)) {
            return response()->json(["message" => "data of About me not found"]);
        }
         $data = [
            'title' => $request->title,
            'description' => $request->description,
            'state' => $request->state,
            'expert' => $request->expert,
            'languages' => $request->languages
               ];

     if ($request->hasFile("image")) {
               $file = $request->file('image');
            $fileName = 'about_' . time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            
            $uploadResponse = $this->imagekit->upload([
                'file' => base64_encode(file_get_contents($file->getRealPath())),
                'fileName' => $fileName,
                'folder' => '/portfolio',
            ]);
            $data['image'] = $uploadResponse->result->url;
         }
    
    $About_me->update($data);

    return response()->json($About_me , 200);
           
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
          $About_me = About_me::find($id);
         if (empty($About_me)) {
            return response()->json(["message" => "data of About me not found"]);
        }
        $About_me->delete();
        return response()->json(["message" => "delete data of About me successfully"]);
    }
}
