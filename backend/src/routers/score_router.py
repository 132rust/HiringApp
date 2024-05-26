from fastapi import APIRouter, Depends, status

from routers.depends.usecase_depends import get_score_usecase
from routers.schemas.other_schemas import DeleteScore
from usecases.score_usecase import ScoreUsecase

score_router = APIRouter(tags=["score"], prefix="/score")


@score_router.get("/{test_id}", status_code=status.HTTP_200_OK)
async def get_scores(test_id: int, usecase: ScoreUsecase = Depends(get_score_usecase)):
    return await usecase.get_scores(test_id)


@score_router.delete("/delete", status_code=status.HTTP_200_OK)
async def delete_score(score: DeleteScore, usecase: ScoreUsecase = Depends(get_score_usecase)):
    await usecase.delete_score(score.score_id)
