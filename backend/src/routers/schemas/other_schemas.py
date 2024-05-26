from typing import List

from pydantic import BaseModel


class TestCreate(BaseModel):
    test_name: str
    questions: List[dict]


class TestDelete(BaseModel):
    test_id: int


class TestUpdate(TestCreate, TestDelete):
    pass


class DeleteScore(BaseModel):
    score_id: int


class CreateRoom(BaseModel):
    test_id: int
    candidate_name: str
    media_content: str

class SetMark(BaseModel):
    room_id: str
    score: int
