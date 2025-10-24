<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class About_me extends Model
{
    protected $fillable = [
        'title' ,
        'description',
        'image',
        'state',
        'expert',
        'languages'
    ];
    protected $appends = ['image_url'];
    public function getImageUrlAttribute(){
        if ($this->image) {
            $basePath = 'storage';
            $imagePath = str_replace('public/' , '' , $this->image);
            return url("$basePath/$imagePath");
        }
        return null ;}

}
