from typing import List

from domain.question import Question
from ports.repository.question_repository import QuestionRepository


class QuestionUseCase:
    def __init__(self, repo: QuestionRepository):
        self.repo = repo

    async def create_question(self, question: Question) -> Question|None:
        return await self.repo.create_question(question)

    async def get_all_questions(self, test_id: int) -> List[Question]:
        return await self.repo.get_all_questions(test_id)

    async def update_question(self, question: Question) -> Question|None:
        return await self.repo.update_question(question)

    async def delete_question(self, question_id: int) -> None:
        await self.repo.delete_question(question_id)
