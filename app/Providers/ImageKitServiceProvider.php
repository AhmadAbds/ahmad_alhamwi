<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use ImageKit\ImageKit;

class ImageKitServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
     protected $imageKit;
    public function register(): void
    {
        $this->app->singleton(ImageKit::class, function ($app) {
            return new ImageKit(
                config('imagekit.public_key'),
                config('imagekit.private_key'),
                config('imagekit.url_endpoint')
            );
        });
        
    }
 public function uploadImage($file, $fileName)
    {
        $response = $this->imageKit->upload([
            'file' => base64_encode(file_get_contents($file->getRealPath())),
            'fileName' => $fileName,
            'folder' => '/portfolio' // المجلد المطلوب
        ]);

        return $response->result;
    }

    public function deleteImage($fileId)
    {
        return $this->imageKit->deleteFile($fileId);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
