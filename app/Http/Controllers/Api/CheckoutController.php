<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Address;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\Product;

class CheckoutController extends Controller
{
    public function checkout(Request $request)
    {
        $user = $request->user();
        $cartItems = $user->cartItems()->with('product')->get();

        if ($cartItems->isEmpty()) {
            return response()->json(['message' => 'Your cart is empty.'], 400);
        }

        // Here you would typically create an order, process payment, etc.
        // For simplicity, we'll just return the cart items as a "checkout summary".

        return response()->json([
            'message' => 'Checkout successful.',
            'cart_items' => $cartItems
        ]);
    }
}
