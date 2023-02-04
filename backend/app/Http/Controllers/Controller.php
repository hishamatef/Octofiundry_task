<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Auth\LoginController;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Response;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    const CODE_OK = 200;
    const CODE_CREATED = 201;
    const CODE_DELETED = 204;
    const CODE_NOT_FOUND = 404;
    const CODE_UNAUTHORIZED = 401;
    const CODE_INVALID_REQUEST = 422; // request parameters not valid
    const CODE_INTERNAL_SERVER_ERROR = 500;

    //Global Variable For Pagination
    const MAX_ALLOWED_PAGE_SIZE = 20;
    const DEFAULT_PAGE_SIZE = 10;


//    public function __construct()
//    {
//        $user = auth()->user();
//        if($user != null && $user->disabled == 1) {
//            $login_object = new LoginController();
//            $login_object->logout1();
//            return redirect('/');
//        }
//        if($user == null){
//            return redirect('/login');
//        }
//    }

    function prepareResponse($code, $message = null, $response = null, $errors = null,$status_code=null)
    {
        $message = ($message == null) ? "" : $message;
        $response = ($response == null) ? "" : $response;
        $errors = ($errors == null) ? "" : $errors;
        $status_code = ($status_code == null) ? "" : $status_code;
        return Response::json(['code' => $code,'status_code'=>$status_code, 'message' => $message, 'data' => $response, 'errors' => $errors],$code);
    }
    function saveLog($channel, $type, $message)
    {
        Log::channel($channel)->$type($message);
    }
}
