from fastapi import APIRouter, status, Depends

from routers.depends.usecase_depends import get_check_usecase
from usecases.check_usecase import CheckUsecase

check_router = APIRouter(tags=["check"], prefix="/check")


@check_router.get("/{room_id}", status_code=status.HTTP_200_OK)
async def check(room_id: str, usecase: CheckUsecase = Depends(get_check_usecase)):
    return await usecase.get_info(room_id)
