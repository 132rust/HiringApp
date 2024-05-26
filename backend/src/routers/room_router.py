from fastapi import APIRouter, status, Depends

from routers.depends.usecase_depends import get_room_usecase
from routers.schemas.other_schemas import CreateRoom, SetMark
from usecases.room_usecase import RoomUsecase

room_router = APIRouter(tags=["room"], prefix="/room")


@room_router.post("/create", status_code=status.HTTP_200_OK)
async def create_room(room: CreateRoom, usecase: RoomUsecase = Depends(get_room_usecase)):
    return await usecase.create_room(room.test_id, room.candidate_name, room.media_content)


@room_router.post("/set", status_code=status.HTTP_200_OK)
async def set_score(room: SetMark, usecase: RoomUsecase = Depends(get_room_usecase)):
    await usecase.set_mark(room.room_id, room.score)


@room_router.get("/change_visibility/{room_id}", status_code=status.HTTP_200_OK)
async def set_score(room_id: str, usecase: RoomUsecase = Depends(get_room_usecase)):
    await usecase.change_visibility(room_id)


@room_router.get("/{room_id}", status_code=status.HTTP_200_OK)
async def move_pointer(room_id: str, usecase: RoomUsecase = Depends(get_room_usecase)):
    return await usecase.move_pointer(room_id)
