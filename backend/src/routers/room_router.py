from fastapi import APIRouter, status, Depends

from routers.depends.usecase_depends import get_room_usecase
from routers.schemas.other_schemas import CreateRoom
from usecases.room_usecase import RoomUsecase

room_router = APIRouter(tags=["room"], prefix="/room")


@room_router.post("/create", status_code=status.HTTP_200_OK)
async def create_room(room: CreateRoom, usecase: RoomUsecase = Depends(get_room_usecase)):
    return await usecase.create_room(room.test_id, room.candidate_name, room.media_content)


# @room_router.post("/set_score", status_code=status.HTTP_200_OK)
# async def set_score(usecase: RoomUsecase = Depends(get_room_usecase)):
#     return await usecase.