<?php

namespace Modules\Purchase\Http\Services;

use App\Enums\Pagination;
use Illuminate\Support\Facades\Auth;
use Modules\Purchase\Entities\Purchase;

class PurchaseService
{
    public function store($data)
    {

        $purchase = new Purchase();

        return $purchase->create($data);
    }

    public function update($data, $id)
    {

        $purchase = Purchase::findOrFail($id);
        $purchase->fill($data);
        $purchase->save();

        return $purchase;
    }

    public function show($id)
    {
        return Purchase::findOrFail($id);
    }

    public function index()
    {
        return Purchase::with(['customer'])->paginate(Pagination::PER_PAGE);
    }

    public function delete($id)
    {
        return Purchase::where('id', $id)->delete();
    }


}
