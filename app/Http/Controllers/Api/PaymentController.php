<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Razorpay\Api\Api;
use App\Models\Orders;
use App\Models\Address;
use App\Models\Cart;
use App\Models\Payments;
use App\Models\Order_items;

use Illuminate\Support\Facades\Auth;
use Razorpay\Api\Order;
use Razorpay\Api\Payment;
use App\Models\Product;

class PaymentController extends Controller
{
    public function createOrder(Request $request)
    {
        Address::create([
            'user_id' => Auth::id(),
            'address' => $request->address,
            'city' => $request->city,
            'state' => $request->state,
            'postal_code' => $request->postal_code,
            'email' => $request->email,
            'phone' => $request->phone,
            'name' => $request->name,
        ]);

        $api = new Api(env('RAZORPAY_KEY'), env('RAZORPAY_SECRET'));

        $razorpay_payment_id = $api->order->create([
            'receipt' => uniqid(),
            'amount' => $request->amount * 100,
            'currency' => 'INR'
        ]);

        $order = Orders::create([
            'user_id' => Auth::id(),
            'total_amount' => $request->amount,
            'status' => 'pending',
            'razorpay_payment_id' => $razorpay_payment_id['id'],
        ]);

        if ($request->type == 'buy_now') {

            // 👉 single product insert
            $product = Product::find($request->product_id);

            Order_items::create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'qty' => 1,
                'price' => $product->price,
                'sub_total' => $request->qty * $product->price,
            ]);
        } else {

            $cartItems = Cart::with('product')->where('user_id', Auth::id())->get();

            foreach ($cartItems as $item) {
                Order_items::create([
                    'order_id' => $order->id,
                    'product_id' => $item->product_id,
                    'qty' => $item->qty,
                    'price' => $item->product->price,
                    'sub_total' => $item->qty * $item->product->price,
                ]);
            }
        }



        return response()->json([
            'razorpay_payment_id' => $razorpay_payment_id['id'],
            'key' => env('RAZORPAY_KEY'),
            'order_id' => $order->id,
            'amount' => $request->amount,
        ]);
    }

    public function verify(Request $request)
    {
        $api = new Api(env('RAZORPAY_KEY'), env('RAZORPAY_SECRET'));
        $attributes = [
            'razorpay_order_id' => $request->razorpay_order_id,
            'razorpay_payment_id' => $request->razorpay_payment_id,
            'razorpay_signature' => $request->razorpay_signature,
        ];
        $api->utility->verifyPaymentSignature($attributes);
        Cart::where('user_id', Auth::id())->delete();
        Payments::create([
            'user_id' => Auth::id(),
            'amount' => $request->amount,
            'payment_method' => 'razorpay',
            'order_id' => $request->product_order_id,
            'razorpay_payment_id' => $request->razorpay_payment_id,
            'payment_status' => 'success',
            'razorpay_order_id' => $request->razorpay_order_id,
            'razorpay_signature' => $request->razorpay_signature,
        ]);

        // Orders::where('id', $request->product_order_id)->update([
        //     'status' => 'paid',
        // ]);

        return response()->json([
            'status' => true,
            'message' => 'Payment Success',
            'success' => true,
        ]);
    }

    public function orderList()
    {

        $orderlist = Orders::with('orderItem.product')
            ->where('user_id', Auth::id())
            ->get();

        $data = [];

        foreach ($orderlist as $list) {

            $items = [];

            foreach ($list->orderItem as $item) {
                $items[] = $item->product->name ?? '';
            }

            // $name = implode(', ', $items);

            $data[] = [
                'total' => $list->total_amount,
                'status' => $list->status,
                'items' => $items,
                'order_id' => "#ORD" . $list->id,
                'date' => $list->created_at->format('d M Y'),
            ];
        }

        return response()->json([
            'status' => true,
            'message' => 'Order list',
            'data' => $data,

        ]);
    }
}
