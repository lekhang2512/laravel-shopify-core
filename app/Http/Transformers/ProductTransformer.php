<?php

namespace App\Http\Transformers;

use League\Fractal\TransformerAbstract;
use Illuminate\Support\Facades\Auth;

class ProductTransformer extends TransformerAbstract
{
    protected $availableIncludes = [];

    public function transform($product = null)
    {
        if (is_null($product)) {
            return [];
        }
        $user = Auth::user();
        $shop = $user->name;

        return [
            'id' => $product['id'],
            'title' => $product['title'],
            'handle' => $product['handle'],
            'image' => $product['image'],
            'imageUrl' => $product['image'] ? $product['image']['src'] : '',
            'productUrl' => "https://".$shop."/products/".$product['handle'],
            'faqs' => 0
        ];
    }
}
