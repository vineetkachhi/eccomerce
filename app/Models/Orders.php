<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{
    protected $table = 'orders';

    protected $fillable = [
        'user_id',
        'total_amount',
        'status',
        'razorpay_payment_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }


    public function orderItem()
    {

        return $this->hasMany(Order_items::class, 'order_id');
    }
}
