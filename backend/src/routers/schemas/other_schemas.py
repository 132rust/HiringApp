from typing import List

from pydantic import BaseModel


class TestCreate(BaseModel):
    test_name: str
    questions: List[dict]


class TestDelete(BaseModel):
    test_id: int


class TestUpdate(TestCreate, TestDelete):
    pass
