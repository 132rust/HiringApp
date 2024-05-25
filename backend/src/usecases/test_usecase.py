from typing import List

from domain.question import Question
from domain.test import Test
from ports.repository.question_repository import QuestionRepository
from ports.repository.test_repository import TestRepository
from usecases.token_action import TokenUseCase


class TestUsecase:
    def __init__(self, auth, test_repo: TestRepository, question_repo: QuestionRepository):
        self.test_repo = test_repo
        self.question_repo = question_repo
        print(auth)
        self.company_id = TokenUseCase.get_id_from_token(auth)

    async def create_test(self, test_name: str, questions: List[dict]) -> None:
        new_test = Test(company_id=self.company_id, test_name=test_name)
        new_test = await self.test_repo.create_test(new_test)
        for q in questions:
            new_question = Question(description=q['description'],
                                    test_id=new_test.test_id,
                                    answer=q['answer'])
            await self.question_repo.create_question(new_question)

    async def get_all_tests(self) -> List[dict]:
        tests = await self.test_repo.get_all_tests(self.company_id)
        return [{"test_id": test.test_id, "test_name": test.test_name} for test in tests]

    async def get_test(self, test_id: int) -> dict:
        questions = await self.question_repo.get_all_questions(test_id)
        questions = [{"description": question.description, "answer": question.answer} for question in questions]
        test = await self.test_repo.get_test(test_id)
        response={"test_name": test.test_name,
                  "questions": questions}
        return response

    async def update_test(self, test_id: int, test_name: str, questions: List[dict]) -> None:
        await self.delete_test(test_id)
        await self.create_test(test_name, questions)

    async def delete_test(self, test_id: int) -> None:
        await self.test_repo.delete_test(test_id, self.company_id)
