from datetime import datetime
from uuid import uuid4

from core.exceptions import DatabaseException, RequestProcessingException
from domain.score import Score
from ports.repository.cache_repository import CacheRepository
from ports.repository.question_repository import QuestionRepository
from ports.repository.score_repository import ScoreRepository


class RoomUsecase:
    def __init__(self, cache_repo: CacheRepository, question_repo: QuestionRepository, score_repo: ScoreRepository, ):
        self.cache_repo = cache_repo
        self.question_repo = question_repo
        self.score_repo = score_repo

    async def __save_result(self, room_data: dict) -> None:
        new_score = Score(
            score=round(sum(room_data['marks']) / len(room_data['marks'])),
            candidate_name=room_data['candidate_name'],
            media_contact=room_data['media_contact'],
            date=datetime.strptime(room_data['date'], "%Y-%m-%d %H:%M:%S.%f"),
            test_id=room_data['test_id']
        )
        await self.score_repo.create_score(new_score)

    async def create_room(self, test_id, candidate_name, media_contact) -> dict:
        try:
            test_data = await self.question_repo.get_all_questions(test_id)
            test_data = [{"description": q.description,"answer":q.answer} for q in test_data]
            room_data = {
                "test_data": test_data,
                "marks": [-1] * len(test_data),
                "current_question_id": -1,
                "date": str(datetime.now()),
                "isVisible": False,
                "candidate_name": candidate_name,
                "media_contact": media_contact,
                "test_id": test_id
            }
            room_id = str(uuid4())
            await self.cache_repo.set_cache(room_id, room_data)
            return {"room_id": room_id}
        except DatabaseException:
            raise RequestProcessingException

    async def set_mark(self, room_id: str, mark: int) -> None:
        room_data = await self.cache_repo.get_cache(room_id)
        room_data["marks"][room_data["current_question_id"]] = mark
        await self.cache_repo.set_cache(room_id, room_data)

    async def move_pointer(self, room_id: str) -> dict | None:
        try:
            room_data = await self.cache_repo.get_cache(room_id)
            if not room_data["current_question_id"] == -1 and room_data["marks"][room_data["current_question_id"]] == -1:
                raise RequestProcessingException("Не выставлена оценка")
            room_data["current_question_id"] += 1

            room_data["isVisible"] = False
            if room_data["current_question_id"] < len(room_data["marks"]):
                await self.cache_repo.set_cache(room_id, room_data)
                return room_data['test_data'][room_data["current_question_id"]]
            else:
                await self.__save_result(room_data)
                await self.cache_repo.delete_cache(room_id)
                return None
        except Exception:
            raise RequestProcessingException("Тест завершен")

    async def change_visibility(self, room_id: str) -> None:
        room_data = await self.cache_repo.get_cache(room_id)
        room_data["isVisible"] = not room_data["isVisible"]
        await self.cache_repo.set_cache(room_id, room_data)
