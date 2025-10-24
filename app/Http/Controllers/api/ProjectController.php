<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use ImageKit\ImageKit;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
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
        $projects = Project::all();
        $projects = $projects->map(function($project){
            return [
                'id' => $project->id,
                'classification_id' => $project->classification_id,
                'classification_type' => $project->classification->type,
                'image' => $project->image,
                'title' => $project->title,
                'summary' => $project->summary,
                'visit' => $project->visit,
                'video' => $project->video,
                'github' => $project->github,
                'description' => $project->description,
                'formatted_content' => $project->formatted_content,
                'content_styles' => $project->content_styles,
                'created_at' => $project->created_at->format('Y-m-d'),
                'updated_at' => $project->updated_at->format('Y-m-d')
            ];
        });
        if ($projects->isEmpty()) {
            return response()->json(['message'=> "you don't have project"]);
        }
        return response()->json(['status'=> 'success','data' => $projects],200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'classification_id' =>'required|exists:classifications,id',
            'image' => 'required|image',
            'title' => 'required|string',
            'summary' => 'required|string',
            'visit' => 'nullable|string',
            'video' => 'nullable|string',
            'github' => 'required|string',
            'description' => 'required|string',
             'formatted_content' => 'nullable|string',
            'content_styles' => 'nullable|string'
        ]);
           $file = $request->file('image');
        $fileName = 'project_' . time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
        
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
         /* $imagePath = $request->file('image')->store('project', 'public'); */
        $contentStyles = [];
        
        if ($request->has('content_styles') && !empty($request->content_styles)) {
            $rawContentStyles = $request->content_styles;
            Log::info('🔍 Raw content_styles value:', ['value' => $rawContentStyles]);
            
            // إذا كانت string تحتوي على JSON
            if (is_string($rawContentStyles)) {
                // تنظيف الـ string
                $cleaned = trim($rawContentStyles);
                Log::info('🧹 Cleaned content_styles:', ['cleaned' => $cleaned]);
                
                if ($cleaned !== '' && $cleaned !== '{}' && $cleaned !== '[]') {
                    $decoded = json_decode($cleaned, true);
                    $jsonError = json_last_error();
                    
                    Log::info('🔓 JSON decode attempt:', [
                        'decoded' => $decoded,
                        'json_error' => $jsonError,
                        'error_msg' => json_last_error_msg()
                    ]);
                    
                    if ($jsonError === JSON_ERROR_NONE && is_array($decoded)) {
                        $contentStyles = $decoded;
                        Log::info('✅ Successfully decoded JSON content_styles:', $contentStyles);
                    } else {
                        // إذا فشل فك التشفير، حاول كـ array مباشرة
                        Log::warning('⚠️ JSON decode failed, trying direct array');
                        $contentStyles = ['raw' => $cleaned];
                    }
                } else {
                    Log::info('ℹ️ Empty or invalid JSON string');
                    $contentStyles = [];
                }
            } 
            // إذا كانت array مباشرة (لأي سبب)
            else if (is_array($rawContentStyles)) {
                $contentStyles = $rawContentStyles;
                Log::info('✅ Direct array content_styles:', $contentStyles);
            }
        }

        Log::info('💾 Final content_styles to save:', ['content_styles' => $contentStyles]);

        // 🔥 الحل البديل: حفظ كـ JSON string مباشرة
        $contentStylesForDb = empty($contentStyles) ? null : json_encode($contentStyles);

        $project = Project::create([
            'classification_id' => $request->classification_id,
             'image' => $uploadResponse->result->url,
            'title' => $request->title,
            'summary' => $request->summary,
            'visit' => $request->visit,
            'video' => $request->video,
            'github' => $request->github,
            'description' => $request->description,
            'formatted_content' => $request->formatted_content,
            'content_styles' => $contentStyles
        ]);
         return response()->json($project,200);
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
            'classification_id' =>'required|exists:classifications,id',
            'image' => 'sometimes|image',
            'title' => 'required|string',
            'summary' => 'required|string',
            'visit' => 'nullable|string',
            'video' => 'nullable|string',
            'github' => 'required|string',
            'description' => 'required|string',
            'formatted_content' => 'nullable|string',
            'content_styles' => 'nullable|string'
        ]);
        $project = Project::find($id);
        if (empty($project)) {
             return response()->json(['message'=> "you don't have project for id"]);
        }
        // 
        $contentStyles = [];
        
        if ($request->has('content_styles') && !empty($request->content_styles)) {
            $rawContentStyles = $request->content_styles;
            Log::info('🔍 Update - Raw content_styles value:', ['value' => $rawContentStyles]);
            
            if (is_string($rawContentStyles)) {
                $cleaned = trim($rawContentStyles);
                Log::info('🧹 Update - Cleaned content_styles:', ['cleaned' => $cleaned]);
                
                if ($cleaned !== '' && $cleaned !== '{}' && $cleaned !== '[]') {
                    $decoded = json_decode($cleaned, true);
                    $jsonError = json_last_error();
                    
                    Log::info('🔓 Update - JSON decode attempt:', [
                        'decoded' => $decoded,
                        'json_error' => $jsonError,
                        'error_msg' => json_last_error_msg()
                    ]);
                    
                    if ($jsonError === JSON_ERROR_NONE && is_array($decoded)) {
                        $contentStyles = $decoded;
                        Log::info('✅ Update - Successfully decoded JSON content_styles:', $contentStyles);
                    } else {
                        Log::warning('⚠️ Update - JSON decode failed, trying direct array');
                        $contentStyles = ['raw' => $cleaned];
                    }
                } else {
                    Log::info('ℹ️ Update - Empty or invalid JSON string');
                    $contentStyles = [];
                }
            } else if (is_array($rawContentStyles)) {
                $contentStyles = $rawContentStyles;
                Log::info('✅ Update - Direct array content_styles:', $contentStyles);
            }
        }

        Log::info('💾 Update - Final content_styles to save:', ['content_styles' => $contentStyles]);

        // 🔥 نفس الحل: حفظ كـ JSON string مباشرة
        $contentStylesForDb = empty($contentStyles) ? null : json_encode($contentStyles);
        //
        $data = [
            'title' => $request->title,
            'classification_id' => $request->classification_id,
            'summary' => $request->summary,
            'visit' => $request->visit,
            'video' => $request->video,
            'github' => $request->github,
            'description' => $request->description,
            'formatted_content' => $request->formatted_content,
            'content_styles' => $contentStylesForDb 
        ];
         if ($request->hasFile("image")) {
             $file = $request->file('image');
            $fileName = 'project_' . time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            
            $uploadResponse = $this->imagekit->upload([
                'file' => base64_encode(file_get_contents($file->getRealPath())),
                'fileName' => $fileName,
                'folder' => '/portfolio',
            ]);
            $data['image'] = $uploadResponse->result->url;
         }
         $project->update($data);
          return response()->json(['status'=> 'success','data' => $project]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
         $project = Project::find($id);
        if (empty($project)) {
             return response()->json(['message'=> "you don't have project for id"]);
        }   
         $project->delete();
            return response()->json(['message'=> "deleted successfully"]);
    }
}
