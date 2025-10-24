<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'id',
        'classification_id',
        'image',
        'title',
        'summary',
        'visit',
        'video',
        'github',
        'description',
        'formatted_content',
        'content_styles',
        'created_at' , 
        'updated_at'
    ];
    protected $appends = ['image_url'];
    protected $casts = [
        'content_styles' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];
    /* اذا لم يكن ل فورماتيد قيمة فخذ قيمة الوصف ذاتها  */
    /* public function getFormattedContentAttribute($value){
        return $value? : $this->description; 
    } */
    public function getContentStylesAttribute($value){
        if (is_string($value)) {
            return json_decode($value , true);
        }
        if(is_array($value)){
             return $value;
        }
        return[];
    }
    public function setContentStylesAttribute($value)
    {
        if (is_array($value) || is_object($value)) {
            $this->attributes['content_styles'] = json_encode($value);
        } else if (is_string($value)) {
            $decoded = json_decode($value, true);
            $this->attributes['content_styles'] = ($decoded !== null) ? $value : '{}';
        } else {
            $this->attributes['content_styles'] = '{}';
        }
    }
    public function classification(){
        return $this->belongsTo(Classification::class);
    }
     
     public function getImageUrlAttribute(){
        if ($this->image) {
            $basePath = 'storage';
            $imagePath = str_replace('public/' , '' , $this->image);
            return url("$basePath/$imagePath");
        }
        return null ;
    }
}
