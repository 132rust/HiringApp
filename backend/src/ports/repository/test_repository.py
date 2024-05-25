from abc import ABC, abstractmethod
from typing import List

from domain.test import Test


class TestRepository(ABC):
    @abstractmethod
    async def create_test(self, test: Test) -> Test:
        pass

    @abstractmethod
    async def get_all_tests(self, company_id: int) -> List[Test] | None:
        pass

    @abstractmethod
    async def update_test(self, new_test: Test) -> Test | None:
        pass

    @abstractmethod
    async def delete_test(self, test_id: int, company_id: int) -> None:
        pass

    @abstractmethod
    async def get_test(self, test_id: int) -> Test | None:
        pass
