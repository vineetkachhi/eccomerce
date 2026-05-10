<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Orders;

class OrderController extends Controller
{
    public function index()
    {
        $orderlist = Orders::with(['orderItem.product', 'user'])
            ->paginate(10);
        //dd($orderlist);
        return view('orderlist.index', compact('orderlist'));
    }

    public function edit($id)
    {
        $details = Orders::with(['orderItem.product', 'user'])
            ->where('id', $id)
            ->first();
        //dd($details);
        return view('orderlist.edit', compact("details"));
    }
    public function update(Request $request, string $id)
    {
        // dd($request);
        $order = Orders::find($id);

        $order->status = $request->status;

        $order->save();

        return redirect()->route('order.list')->with('success', 'Order Status updated successfully.');
    }
}
