<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    protected $fillable = [
        'title',
        'value',
        'category_id'
    ];
    public function category(){
        return $this->belongsTo(Category::class);
    }
}
