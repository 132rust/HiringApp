from abc import ABC, abstractmethod
from typing import List

from domain.question import Question


class QuestionRepository(ABC):
    @abstractmethod
    async def create_question(self, question: Question) -> Question:
        pass

    @abstractmethod
    async def get_all_questions(self, test_id: int) -> List[Question] | None:
        pass

    @abstractmethod
    async def update_question(self, new_question: Question) -> Question | None:
        pass

    @abstractmethod
    async def delete_question(self, question_id: int) -> None:
        pass
