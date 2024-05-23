from abc import ABC, abstractmethod
from typing import Any


class CacheRepository(ABC):
    @abstractmethod
    async def set_cache(self, key: str, value: Any, expire: int | None = None) -> None:
        pass

    @abstractmethod
    async def get_cache(self, key: str) -> dict:
        pass

    @abstractmethod
    async def delete_cache(self, key: str) -> None:
        pass
