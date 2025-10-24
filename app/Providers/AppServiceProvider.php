<?php

namespace App\Providers;

use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(ImageKitServiceProvider::class, function ($app) {
        return new ImageKitServiceProvider($app);
    });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
    }
}
