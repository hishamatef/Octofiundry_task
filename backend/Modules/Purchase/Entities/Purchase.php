<?php

namespace Modules\Purchase\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Customer\Entities\Customer;

class Purchase extends Model
{
    use SoftDeletes;

    protected $table = 'purchases';

    protected $fillable = [
        'title',
        'description',
        'customer_id',
    ];

    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];

    public function customer(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

}
