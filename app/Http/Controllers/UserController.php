<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use App\Http\Transformers\UserTransformer;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Repositories\Users\UserRepository;

class UserController extends Controller
{
    private $userRepo;

    public function __construct(UserRepository $userRepo)
    {
        $this->userRepo = $userRepo;
        $this->setTransformer(new UserTransformer());
    }

    public function index(Request $request)
    {
        $limit = $request->get('limit', config('constants.DEFAULT_PAGE_SIZE'));

        $records = $this->userRepo->getByQuery($request->query(), $limit);
        return $this->successResponse($records);
    }

    public function show($id)
    {
        try {
            $record = $this->userRepo->getById($id);
            $this->authorize('view', $record);

            return $this->successResponse($record);
        } catch (ModelNotFoundException $e) {
            return $this->notFoundResponse();
        } catch (\Throwable $t) {
            throw $t;
        }
    }

    protected function validationRules($action = 'create')
    {
        if ($action == 'update') {
            return [
            ];
        }
        return [
        ];
    }

    protected function validationMessages()
    {
        return [
        ];
    }

    public function store(Request $request)
    {
        try {
            $this->authorize('create', User::class);
            $this->validate($request, $this->validationRules(), $this->validationMessages());
            $record = $this->userRepo->store($data);
            return $this->successResponse($record);

        } catch (ValidationException $validationException) {
            return $this->errorResponse([
                'errors'    => $validationException->validator->errors(),
                'exception' => $validationException->getMessage()
            ]);
        } catch (\Throwable $t) {
            throw $t;
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $record = $this->userRepo->getById($id);

            $this->validate($request, $this->validationRules('update'), $this->validationMessages());

            $record = $this->userRepo->update($record, $data);
            return $this->successResponse($record);
        } catch (ModelNotFoundException $e) {
            return $this->notFoundResponse();
        } catch (ValidationException $validationException) {
            return $this->errorResponse([
                'errors'    => $validationException->validator->errors(),
                'exception' => $validationException->getMessage()
            ]);
        } catch (\Throwable $t) {
            throw $t;
        }
    }

    public function destroy($id)
    {
        try {
            $record = $this->userRepo->getById($id);
            $this->userRepo->delete($record);

            return $this->deleteResponse();
        } catch (ModelNotFoundException $e) {
            return $this->notFoundResponse();
        } catch (\Throwable $t) {
            throw $t;
        }
    }
}
