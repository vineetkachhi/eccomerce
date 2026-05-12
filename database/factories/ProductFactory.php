<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->words(3, true),

            'slug' => fake()->slug(),

            'description' => fake()->paragraph(),

            'price' => fake()->randomFloat(2, 100, 5000),

            'category_id' => '3',

            'image' => 'https://picsum.photos/640/480',


            'status' => fake()->randomElement(['active', 'inactive']),
        ];
    }
}
