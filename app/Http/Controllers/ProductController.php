<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Transformers\ProductTransformer;

class ProductController extends Controller
{
    public function __construct()
    {
    }

    public function index(Request $request)
    {
        $limit = 1;
        $sinceId = 0;
        $fields = 'id,title,handle,image';

        $shop = Auth::user();
        $request = $shop->api()->rest('GET', '/admin/products.json', ['query' => "limit:{$limit},since_id:{$sinceId},fields:{$fields}"]);
        $records = collect($request['body']['products']->toArray());
        $this->setTransformer(new ProductTransformer());
        return $this->successResponse($records);
    }
}
