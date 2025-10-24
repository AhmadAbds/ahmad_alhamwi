<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Achievement extends Model
{
    protected $fillable=['image'];
      protected $appends = ['image_url'];
     public function getImageUrlAttribute(){
        if ($this->image) {
            $basePath = 'storage';
            $imagePath = str_replace('public/' , '' , $this->image);
            return url("$basePath/$imagePath");
        }
        return null ;} 
}
