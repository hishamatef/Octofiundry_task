<?php

namespace Modules\Purchase\Policies;

use Modules\Permission\Policies\MainPolicy;

class PurchasePolicy
{
    use MainPolicy;

    public static $permissionsKey = 'Purchases';

}
