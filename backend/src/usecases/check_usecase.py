from core.exceptions import RequestProcessingException
from ports.repository.cache_repository import CacheRepository


class CheckUsecase:
    def __init__(self, cache_repo: CacheRepository):
        self.cache_repo = cache_repo

    async def get_info(self, room_id) -> dict:
        try:
            room_data = await self.cache_repo.get_cache(room_id)
            question = room_data['test_data'][room_data["current_question_id"]]
            if not room_data['isVisible']:
                del question['answer']
            return question
        except KeyError:
            raise RequestProcessingException("Тест завершен")
