<?php

namespace App\Http\Transformers;

use League\Fractal\TransformerAbstract;
use App\Models\User;

class UserTransformer extends TransformerAbstract
{
    protected $availableIncludes = [];

    public function transform(User $user = null)
    {
        if (is_null($user)) {
            return [];
        }

        return [
            'id'                    => $user->id,
            'name'                  => $user->name,
            'email'                 => $user->email,
            'shopify_grandfathered' => $user->shopify_grandfathered,
            'shopify_namespace'     => $user->shopify_namespace,
            'shopify_freemium'      => $user->shopify_freemium,
            'plan_id'               => $user->plan_id,
            'email_verified_at'      => $user->email_verified_at ? $user->email_verified_at->format('d-m-Y H:i:s') : null,
            'created_at'            => $user->created_at->format('d-m-Y H:i:s'),
            'updated_at'            => $user->updated_at->format('d-m-Y H:i:s'),
        ];
    }
}
