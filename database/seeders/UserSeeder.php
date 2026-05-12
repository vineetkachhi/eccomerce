<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Admin user
        User::create([
            'name' => 'Admin',
            'email' => 'adminlogin@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'admin', // agar role column hai
        ]);

        // Normal user
        User::create([
            'name' => 'User',
            'email' => 'userlogin@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'user',
        ]);
    }
}
