from typing import List

from sqlalchemy import insert, select, update, delete
from sqlalchemy.ext.asyncio import AsyncSession

from adapters.orm_engines import models
from core.exceptions import DatabaseException
from domain.question import Question
from ports.repository.question_repository import QuestionRepository


class SQLAlchemyQuestionRepository(QuestionRepository):

    def __init__(self, db: AsyncSession):
        self.db = db

    @staticmethod
    def _from_model_to_dataclass(db_question: models.Question | None) -> Question | None:
        if db_question is None:
            return None
        question = Question(
            question_id=db_question.question_id,
            description=db_question.description,
            answer=db_question.answer,
            test_id=db_question.test_id)
        return question

    async def create_question(self, question: Question) -> Question:
        try:
            query = insert(models.Question).values(**question.to_dict()).returning(models.Question)
            result = await self.db.execute(query)
            new_question = self._from_model_to_dataclass(result.scalar())
            return new_question
        except Exception as e:
            await self.db.rollback()
            raise DatabaseException(str(e))

    async def get_all_questions(self, test_id: int) -> List[Question] | None:
        try:
            query = select(models.Question).where(models.Question.test_id == test_id)
            result = await self.db.execute(query)
            questions = [self._from_model_to_dataclass(db_question) for db_question in result.scalars().all()]
            return questions
        except Exception as e:
            raise DatabaseException(str(e))

    async def update_question(self, new_question: Question) -> Question | None:
        try:
            query = (
                update(models.Question)
                .where(models.Question.question_id == new_question.question_id)
                .values(**new_question.to_dict())
                .returning(models.Question)
            )
            result = await self.db.execute(query)
            question = self._from_model_to_dataclass(result.scalar())
            return question
        except Exception as e:
            await self.db.rollback()
            raise DatabaseException(str(e))

    async def delete_question(self, question_id: int) -> None:
        try:
            query = delete(models.Question).where(models.Question.question_id == question_id)
            await self.db.execute(query)
        except Exception as e:
            await self.db.rollback()
            raise DatabaseException(str(e))
