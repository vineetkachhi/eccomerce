<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'slug',
        'description',
        'price',
        'category_id',
        'image',
        'status',
    ];

    public function category()
    {
        return $this->belongsTo(Categories::class);
    }

    public function carts()
    {
        return $this->hasMany(Cart::class);
    }
}
