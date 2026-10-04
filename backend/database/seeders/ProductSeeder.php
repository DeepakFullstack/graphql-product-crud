<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        Product::create([
            'name' => 'Chocolate Cake',
            'price' => 500,
            'description' => 'Fresh chocolate cake',
        ]);

        Product::create([
            'name' => 'Vanilla Cake',
            'price' => 450,
            'description' => 'Fresh vanilla cake',
        ]);

        Product::create([
            'name' => 'Black Forest Cake',
            'price' => 600,
            'description' => 'Delicious black forest cake',
        ]);
    }
}