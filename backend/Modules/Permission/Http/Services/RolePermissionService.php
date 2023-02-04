<?php

namespace Modules\Permission\Http\Services;

use Illuminate\Support\Str;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionService
{
    private $allPermissions;
    private $rolesPermissions;

    public function __construct($permessions)
    {
        $this->allPermissions = $permessions;;
    }

    public function getRolesPermissions($roles)
    {
        foreach ($roles as $role){
            $this->rolesPermissions[$role] = $this->getRolePermissions($role);
        }
        return  $this->rolesPermissions;
    }

    private function getRolePermissions($role)
    {
        if($role == 'User'){
            return $this->allPermissions->filter( function ($item, $key) {
                return !in_array($item->slug, ['create-customers', 'update-customers', 'delete-customers']);
            });
        }
    }

}
