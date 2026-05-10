<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categories as Category;
use Illuminate\Support\Facades\Cache;

class CategoryController extends Controller
{

    public function index()
    {
        $list = Category::paginate(10);
        return view('categories.index', compact('list'));
    }
    public function create()
    {
        return view('categories.create');
    }

    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:categories',
            'status' => 'required|in:active,inactive',
        ]);

        // Create a new category using the validated data
        $category = Category::create($validatedData);
        Cache::forget('category');
        return redirect()->route('category.create')->with('success', 'Category created successfully!');
    }
    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();
        Cache::forget('category');

        return redirect()->route('category.list')->with('success', 'Category deleted successfully!');
    }

    public function edit($id)
    {
        $category = Category::findOrFail($id);
        Cache::forget('category');

        return view('categories.edit', compact('category'));
    }
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:categories,slug,' . $id,
            'status' => 'required|in:active,inactive',
        ]);

        $category = Category::findOrFail($id);
        $category->update($validatedData);
        Cache::forget('category');

        return redirect()->route('category.list')->with('success', 'Category updated successfully!');
    }
}
