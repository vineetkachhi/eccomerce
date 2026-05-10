<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cart;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{

    public function index()
    {
        $cartItems = Cart::with('product')->where('user_id', Auth::id())->get();
        $data = [];
        foreach ($cartItems as $item) {
            $data[] = [
                'id' => $item->product,
                'product_id' => $item->product_id,
                'qty' => $item->qty,
                'product' => $item->product,
                'total_price' => $item->qty * $item->product->price,
                'image_url' =>  asset('images/' . $item->product->image),
                'category_name' => $item->product->category->name ?? '',
                'name' => $item->product->name,
                'price' => $item->product->price,
            ];
        }

        return response()->json([
            'status' => true,
            'cart' => $data
        ]);
    }

    public function store(Request $request)
    {
        $cart = Cart::where('user_id', Auth::id())
            ->where('product_id', $request->product_id)
            ->first();

        if ($cart) {
            $cart->increment('qty');
        } else {
            $cart = Cart::create([
                'user_id' => Auth::id(),
                'product_id' => $request->product_id,
                'qty' => 1
            ]);
        }

        return response()->json([
            'status' => true,
            'message' => 'Added to cart'
        ]);
    }

    public function merge(Request $request)
    {
        foreach ($request->items as $item) {

            Cart::updateOrCreate(
                [
                    'user_id' => Auth::id(),
                    'product_id' => $item['id']
                ],
                [
                    'qty' => \DB::raw('qty + ' . $item['qty'])
                ]
            );
        }

        return response()->json([
            'status' => true
        ]);
    }

    public function update(Request $request)
    {
        // dd($request->all());
        $cart = Cart::where('user_id', Auth::id())->where('product_id', $request->product_id)->first();
        if ($cart) {
            if ($request->action === 'increment') {
                $cart->qty += 1;
            } elseif ($request->action === 'decrement' && $cart->qty > 1) {
                $cart->qty -= 1;
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Invalid action or quantity cannot be less than 1'
                ], 400);
            }
            // $cart->qty = $request->qty;
            $cart->save();

            return response()->json([
                'status' => true,
                'message' => 'Cart updated'
            ]);
        }

        return response()->json([
            'status' => false,
            'message' => 'Cart item not found'
        ], 404);
    }

    public function remove(Request $request)
    {
        $cart = Cart::where('user_id', Auth::id())->where('product_id', $request->product_id)->first();
        if ($cart) {
            $cart->delete();

            return response()->json([
                'status' => true,
                'message' => 'Cart item removed'
            ]);
        }

        return response()->json([
            'status' => false,
            'message' => 'Cart item not found'
        ], 404);
    }

    public function cartCount()
    {
        $total = Cart::where('user_id', Auth::id())
            ->count();

        return response()->json([
            'status' => true,
            'message' => 'Total cart',
            'count' => $total,
        ], 200);
    }
}
