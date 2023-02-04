<?php

namespace Modules\Purchase\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Modules\Purchase\Entities\Purchase;
use Modules\Purchase\Http\Requests\PurchaseRequest;
use Modules\Purchase\Http\Requests\UpdatePurchaseRequest;
use Modules\Purchase\Http\Resources\PurchaseResource;
use Modules\Purchase\Http\Services\PurchaseService;

class PurchaseController extends Controller
{
    protected $purchaseService;

    public function __construct(PurchaseService $purchaseService)
    {
        $this->purchaseService = $purchaseService;
        $this->authorizeResource(Purchase::class, 'purchase');
    }

    /**
     * Display a listing of the resource.
     * @return Renderable
     */
    public function index(Request $request): JsonResponse
    {
        $purchases = $this->purchaseService->index();
        $purchases = new PurchaseResource($purchases);

        return successResponseWithData($purchases);
    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return Renderable
     */

    public function store(PurchaseRequest $request): JsonResponse
    {
        $this->purchaseService->store($request->all());

        return successResponse(__('response.success'));
    }

    /**
     * Show the specified resource.
     * @param Purchase $purchase
     * @return Renderable
     */
    public function show(Request $request,Purchase $purchase): JsonResponse
    {
        return successResponseWithData($purchase);
    }

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param Purchase $purchase
     * @return Renderable
     */
    public function update(UpdatePurchaseRequest $request, Purchase $purchase): JsonResponse
    {
        $this->purchaseService->update($request->all(), $purchase->id);

        return successResponse(__('response.success'));
    }

    /**
     * Remove the specified resource from storage.
     * @param Purchase $purchase
     * @return Renderable
     */
    public function delete(Purchase $purchase): JsonResponse
    {
        if ($this->purchaseService->delete($purchase->id)) {
            return successResponse(__('response.success'));
        }

        return errorResponse(__('response.error'));
    }
}
