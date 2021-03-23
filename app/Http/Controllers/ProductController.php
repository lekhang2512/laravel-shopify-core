<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Transformers\ProductTransformer;
use App\Repositories\ShopifyProducts\ShopifyProductRepository;
class ProductController extends Controller
{
    private $shopifyProductRepo;

    public function __construct(ShopifyProductRepository $shopifyProductRepo)
    {
        $this->shopifyProductRepo = $shopifyProductRepo;
    }

    public function getProducts(Request $request)
    {
        $shop = Auth::user();
        $params = $request->all();
        $result = $this->shopifyProductRepo->getProducts($shop, $params);
        // $this->setTransformer(new ProductTransformer());
        $productTransformer = \App::make('Darkness\Response\Transformers\OptimusPrime');
        $products = $productTransformer->transform(collect($result['products']), new ProductTransformer())['data'];
        $result['products'] = $products;
        return $this->successResponse($result);
    }

    public function getProductsCount(Request $request)
    {
        try {
            $shop = Auth::user();
            $result = $this->shopifyProductRepo->getProductsCount($shop);
            return $this->successResponse($result);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
