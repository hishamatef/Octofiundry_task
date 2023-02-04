<?php

namespace Modules\Customer\Http\Services;

use App\Enums\Pagination;
use Modules\Customer\Entities\Customer;

class CustomerService
{
    public function store($data)
    {
        $customer = new Customer();

        return $customer->create($data);
    }

    public function update($data, $id)
    {

        $customer = Customer::findOrFail($id);
        $customer->fill($data);
        $customer->save();

        return $customer;
    }

    public function show($id)
    {
        return Customer::findOrFail($id);
    }

    public function index()
    {
        return Customer::paginate(Pagination::PER_PAGE);
    }

    public function delete($id)
    {
        return Customer::where('id', $id)->delete();
    }

}
