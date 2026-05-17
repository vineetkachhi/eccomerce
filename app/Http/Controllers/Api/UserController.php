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

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:100',
            'state' => 'required|string|max:100',
            'postal_code' => 'required|string|max:20',
        ]);

        $address = Address::create([
            'user_id' => Auth::id(),
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'city' => $request->city,
            'state' => $request->state,
            'postal_code' => $request->postal_code,
        ]);

        return response()->json([
            'data' => $address,
            'message' => "Address added successfully",
            'status' => true
        ]);
    }

    public function update(Request $request, $id)
    {
        $address = Address::where('user_id', Auth::id())->findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:100',
            'state' => 'required|string|max:100',
            'postal_code' => 'required|string|max:20',
        ]);

        $address->update([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'city' => $request->city,
            'state' => $request->state,
            'postal_code' => $request->postal_code,
        ]);

        return response()->json([
            'data' => $address,
            'message' => "Address updated successfully",
            'status' => true
        ]);
    }

    public function destroy($id)
    {
        $address = Address::where('user_id', Auth::id())->findOrFail($id);
        $address->delete();

        return response()->json([
            'message' => "Address deleted successfully",
            'status' => true
        ]);
    }
}
