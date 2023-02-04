<?php

namespace Modules\Customer\Policies;

use Modules\Permission\Policies\MainPolicy;

class CustomerPolicy
{
    use MainPolicy;

    public static $permissionsKey = 'Customers';
}
