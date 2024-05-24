from typing import List

from pydantic import BaseModel


class TestCreate(BaseModel):
    test_name: str
    questions: List[dict]

class TestUpdate(BaseModel):
    test_id: int
    test_name: str
    questions: List[dict]