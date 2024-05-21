from abc import ABC, abstractmethod
from typing import List

from domain.score import Score


class ScoreRepository(ABC):
    @abstractmethod
    async def create_test(self, score: Score) -> Score:
        pass

    @abstractmethod
    async def get_all_scores(self, test_id: int) -> List[Score] | None:
        pass

    @abstractmethod
    async def update_score(self, score_id: int, new_score: Score) -> Score | None:
        pass

    @abstractmethod
    async def delete_score(self, score_id: int) -> None:
        pass
