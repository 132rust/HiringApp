from dataclasses import dataclass


@dataclass
class Question:
    question_id: int
    description: str
    answer: str
    test_id: int
