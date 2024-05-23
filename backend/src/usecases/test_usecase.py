from typing import List

from domain.test import Test
from ports.repository.test_repository import TestRepository


class TestUsecase:
    def __init__(self, repo: TestRepository):
        self.repo = repo

    async def create_test(self, test: Test) -> Test | None:
        return await self.repo.create_test(test)

    async def get_all_tests(self, company_id: int) -> List[Test]:
        return await self.repo.get_all_tests(company_id)

    async def update_test(self, test: Test) -> Test | None:
        return await self.repo.update_test(test)

    async def delete_test(self, test_id: int) -> None:
        await self.repo.delete_test(test_id)
