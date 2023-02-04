<?php

namespace Modules\Customer\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class CustomerResource extends ResourceCollection
{
    public function toArray($request)
    {
        $result['data'] = $this->collection->transform(function ($data) {
            return [
                'id' => $data->id,
                'name' => $data->name,
            ];
        });

        $result['pagination'] = $this->getPaginationMeta($request);

        return $result;
    }

    private function getPaginationMeta(\Illuminate\Http\Request $request)
    {
        return [
            'total' => $this->total(),
            'count' => $this->count(),
            'per_page' => $this->perPage(),
            'current_page' => $this->currentPage(),
            'total_pages' => $this->lastPage()
        ];
    }
}
