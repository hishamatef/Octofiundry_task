<?php

namespace Modules\Customer\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Modules\Customer\Entities\Customer;
use Modules\Customer\Http\Requests\CustomerRequest;
use Modules\Customer\Http\Requests\UpdateCustomerRequest;
use Modules\Customer\Http\Resources\CustomerResource;
use Modules\Customer\Http\Services\CustomerService;

class CustomerController extends Controller
{
    protected $customerService;

    public function __construct(CustomerService $customerService)
    {
        $this->customerService = $customerService;
        $this->authorizeResource(Customer::class, 'customer');
    }

    /**
     * Display a listing of the resource.
     * @return Renderable
     */
    public function index(Request $request): JsonResponse
    {
        $customers = $this->customerService->index();
        $customers = new CustomerResource($customers);

        return successResponseWithData($customers);
    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return Renderable
     */

    public function store(CustomerRequest $request): JsonResponse
    {
        $this->customerService->store($request->all());

        return successResponse(__('response.success'));
    }

    /**
     * Show the specified resource.
     * @param Customer $customer
     * @return Renderable
     */
    public function show(Customer $customer): JsonResponse
    {
//        $customer = $this->customerService->show($customer->id);

        return successResponseWithData($customer);
    }

    /**
     * Update the specified resource in storage.
     * @param UpdateCustomerRequest $request
     * @param Customer $customer
     * @return Renderable
     */
    public function update(UpdateCustomerRequest $request,Customer $customer): JsonResponse
    {
        $this->customerService->update($request->all(), $customer->id);

        return successResponse(__('response.success'));
    }

    /**
     * Remove the specified resource from storage.
     * @param Customer $customer
     * @return Renderable
     */
    public function delete(Customer $customer): JsonResponse
    {
        if ($this->customerService->delete($customer->id)) {
            return successResponse(__('response.success'));
        }

        return errorResponse(__('response.error'));
    }
}
