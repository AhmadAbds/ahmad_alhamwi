<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
             $table->id();
            $table->foreignId("classification_id")->constrained()->onDelete("cascade");
            $table->string("image");
            $table->string("title");
            $table->string("summary");
            $table->string("visit")->nullable();
            $table->string("video")->nullable();
            $table->string("github");
            $table->text("description");
            $table->text("formatted_content")->nullable();
            $table->json("content_styles")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
