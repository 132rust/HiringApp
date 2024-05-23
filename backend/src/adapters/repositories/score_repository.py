from typing import List

from sqlalchemy import insert, select, delete
from sqlalchemy.ext.asyncio import AsyncSession

from adapters.orm_engines import models
from core.exceptions import DatabaseException
from domain.score import Score
from ports.repository.score_repository import ScoreRepository


class SQLAlchemyScoreRepository(ScoreRepository):

    def __init__(self, db: AsyncSession):
        self.db = db

    @staticmethod
    def _from_model_to_dataclass(db_score: models.Score | None) -> Score | None:
        if db_score is None:
            return None
        score = Score(
            score_id=db_score.score_id,
            score=db_score.score,
            candidate_name=db_score.candidate_name,
            media_contact=db_score.media_contact,
            date=db_score.date,
            test_id=db_score.test_id)
        return score

    async def create_score(self, score: Score) -> Score:
        try:
            query = insert(models.Score).values(**score.to_dict()).returning(models.Score)
            result = await self.db.execute(query)
            new_score = self._from_model_to_dataclass(result.scalar())
            return new_score
        except Exception as e:
            await self.db.rollback()
            raise DatabaseException(str(e))

    async def get_all_scores(self, test_id: int) -> List[Score] | None:
        try:
            query = select(models.Score).where(models.Score.test_id == test_id)
            result = await self.db.execute(query)
            scores = [self._from_model_to_dataclass(db_score) for db_score in result.scalars().all()]
            return scores
        except Exception as e:
            raise DatabaseException(str(e))

    async def delete_score(self, score_id: int) -> None:
        try:
            query = delete(models.Score).where(models.Score.score_id == score_id)
            await self.db.execute(query)
        except Exception as e:
            await self.db.rollback()
            raise DatabaseException(str(e))
