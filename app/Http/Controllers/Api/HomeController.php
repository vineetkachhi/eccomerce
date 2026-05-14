<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Categories as Category;
use Illuminate\Support\Facades\Cache;

class HomeController extends Controller
{

    public function category()
    {
        // $data = Cache::remember('category', 60, function () {
        $categories = Category::where('status', 'active')->get();

        $categories->transform(function ($item) {
            return [
                'id' => $item->id,
                'name' => $item->name,
                'slug' => $item->slug,
            ];
        });
        //   return $categories;
        // });

        return response()->json([
            'message' => 'Welcome to the API',
            'status' => 'success',
            'categories' => $categories
        ]);
    }

    public function productsCategory($slug)
    {
        $products = Product::with('category')
            ->where('status', 'active')
            ->whereHas('category', function ($q) use ($slug) {
                $q->where('slug', $slug);
            })
            ->paginate(8);

        $result = [];
        // dd($products);

        foreach ($products as $item) {
            $result[] = [
                'id' => $item->id,
                'name' => $item->name,
                'slug' => $item->slug,
                'description' => $item->description,
                'price' => $item->price,
                'image_url' => asset('images/' . $item->image),
                'category_name' => $item->category->name ?? '',
            ];
        }

        return response()->json([
            'message' => 'Products List',
            'status' => 'success',
            'products' => $result,
            'pagination' => [

                'current_page' => $products->currentPage(),
                'last_page' => $products->lastPage(),
                'per_page' => $products->perPage(),
                'total' => $products->total(),

            ]
        ]);
    }
    public function products()
    {
        $products = Product::with('category')
            ->where('status', 'active')
            ->paginate(8);

        $result = [];
        // dd($products);

        foreach ($products as $item) {
            $result[] = [
                'id' => $item->id,
                'name' => $item->name,
                'slug' => $item->slug,
                'description' => $item->description,
                'price' => $item->price,
                'image_url' => asset('images/' . $item->image),
                'category_name' => $item->category->name ?? '',

            ];
        }

        return response()->json([
            'message' => 'Products List',
            'status' => 'success',
            'products' => $result,
            'pagination' => [

                'current_page' => $products->currentPage(),
                'last_page' => $products->lastPage(),
                'per_page' => $products->perPage(),
                'total' => $products->total(),

            ]
        ]);
    }


    public function  productsDetails($slug)
    {
        $product = Product::with('category')
            ->where('status', 'active')
            ->where('slug', $slug)
            ->first();


        return response()->json([
            'message' => 'Products Details',
            'status' => 'success',
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'description' => $product->description,
                'price' => $product->price,
                'image_url' => asset('images/' . $product->image),
                'category_name' => $product->category->name ?? '',
            ]

        ]);
    }
}
