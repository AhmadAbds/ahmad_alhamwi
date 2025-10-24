<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Header extends Model
{
    protected $fillable = [
        'name',
        'my_jop',
        'description',
        'profile_image'
    ];
    protected $appends = ['image_url'];
      public function getImageUrlAttribute(){
        if ($this->profile_image) {
            $basePath = 'storage';
            $imagePath = str_replace('public/' , '' , $this->profile_image);
            return url("$basePath/$imagePath");
        }
        return null ;}
    }

