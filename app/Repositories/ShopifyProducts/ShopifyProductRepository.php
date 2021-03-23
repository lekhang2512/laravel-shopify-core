<?php

namespace App\Repositories\ShopifyProducts;

use Illuminate\Support\Arr;
use Cache;
use Carbon\Carbon;

class ShopifyProductRepository
{
    public function getProductsCount($shop) {
        $request = $shop->api()->rest('GET', '/admin/products/count.json');
        return $request['body']->toArray();
    }

    public function getProducts($shop, $params) {
        $limit = Arr::get($params, 'limit');
        $page = Arr::get($params, 'page', 1);
        $limit = $limit > 50 ? $limit : 50;
        $sinceId = Arr::get($params, 'since_id', 0);
        $fields = 'id,title,handle,image';
        $key = $shop->name . '_product_page_' . $page;
        $expiresAt = Carbon::now()->addHours(12);

        $result = [];
        if (Cache::has($key)) {
            $result = Cache::get($key);
            $result = $result ? $result : [];
        }
        if (!count($result)) {
            $request = $shop->api()->rest('GET', '/admin/products.json', ['query' => [
                'limit' => $limit,
                'since_id' => $sinceId,
                'fields' => $fields,
            ]]);
            $result = $request['body']['products']->toArray();
            Cache::put($key, $result, $expiresAt);
        }
        if (count($result)) {
            $lastKey = count($result) - 1;
            $sinceId = isset($result[$lastKey]['id']) ? $result[$lastKey]['id'] : 0;
        }
        return [
            'products' => $result,
            'since_id' => $sinceId
        ];
    }
}
