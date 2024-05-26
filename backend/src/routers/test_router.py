from fastapi import APIRouter, status, Depends

from routers.depends.usecase_depends import get_test_usecase
from routers.schemas.other_schemas import TestCreate, TestUpdate, TestDelete
from usecases.test_usecase import TestUsecase

test_router = APIRouter(tags=["test"], prefix="/test")


@test_router.get("/read", status_code=status.HTTP_200_OK)
async def get_all_tests(usecase: TestUsecase = Depends(get_test_usecase)):
    return await usecase.get_all_tests()


@test_router.post("/create", status_code=status.HTTP_201_CREATED)
async def create_test(test: TestCreate, usecase: TestUsecase = Depends(get_test_usecase)):
    await usecase.create_test(test.test_name, test.questions)


@test_router.patch("/update", status_code=status.HTTP_200_OK)
async def update_test(test: TestUpdate, usecase: TestUsecase = Depends(get_test_usecase)):
    await usecase.update_test(test.test_id, test.test_name, test.questions)


@test_router.delete("/delete", status_code=status.HTTP_200_OK)
async def delete_test(test:  TestDelete, usecase: TestUsecase = Depends(get_test_usecase)):
    await usecase.delete_test(test.test_id)


@test_router.get("/{test_id}", status_code=status.HTTP_200_OK)
async def get_all_tests(test_id: int, usecase: TestUsecase = Depends(get_test_usecase)):
    return await usecase.get_test(test_id)
