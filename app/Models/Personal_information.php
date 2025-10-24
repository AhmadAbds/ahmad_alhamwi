<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Personal_information extends Model
{
    protected $fillable = [
        'title',
        'description',
        'email',
        'phone',
        'address',
        'facebook',
        'github',
        'linkedin',
        'telegram'
    ];
}
