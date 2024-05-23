import json
from typing import Any

from redis import asyncio as aioredis

from core.exceptions import RequestProcessingException
from core.settings import settings
from ports.repository.cache_repository import CacheRepository


class RedisRepository(CacheRepository):
    def __init__(self):
        self.__redis_connection = aioredis.from_url(settings.REDIS_URL)

    async def set_cache(self, key: str, value: Any, expire: int | None = None) -> None:
        try:
            json_value = json.dumps(value)
            if expire is None:
                await self.__redis_connection.set(key, json_value)
            else:
                await self.__redis_connection.setex(key, expire, json_value)
        except Exception:
            raise RequestProcessingException

    async def get_cache(self, key: str) -> dict:
        try:
            json_value = await self.__redis_connection.get(key)
            if json_value is not None:
                return json.loads(json_value)
            return {}
        except aioredis.RedisError:
            raise RequestProcessingException

    async def delete_cache(self, key: str) -> None:
        await self.__redis_connection.delete(key)
