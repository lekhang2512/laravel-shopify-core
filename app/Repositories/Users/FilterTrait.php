<?php
namespace App\Repositories\Users;

trait FilterTrait
{
    public function scopeUserId($query, $userId)
    {
        if ($userId != null) {
            return $query->where('user_id', $userId);
        }
        return $query;
    }
}
