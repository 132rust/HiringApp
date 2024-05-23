from typing import List

from domain.score import Score
from ports.repository.score_repository import ScoreRepository


class ScoreUsecase:
    def __init__(self, repo: ScoreRepository):
        self.repo = repo

    async def get_scores(self, test_id: int) -> List[Score]:
        return await self.repo.get_all_scores(test_id)

    async def delete_score(self, score_id: int) -> None:
        await self.repo.delete_score(score_id)
