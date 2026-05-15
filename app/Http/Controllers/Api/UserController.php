<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Address;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{

    public function index()
    {
        $list = Address::where('user_id', Auth::id())->get();
        $data = [];

        foreach ($list as $item) {
            $data[] = [
                'id' => $item->id,
                'address' => $item->address,
                'city' => $item->city,
                'state' => $item->state,
                'postal_code' => $item->postal_code,
                'phone' => $item->phone,
                'name' => $item->name,
                'email' => $item->email,
            ];
        }

        return response()->json([
            'data' => $data,
            'message' => "all address",
            'status' => true
        ]);
    }
}
