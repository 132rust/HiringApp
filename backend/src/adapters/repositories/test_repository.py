from typing import List

from sqlalchemy import insert, select, update, delete, and_
from sqlalchemy.ext.asyncio import AsyncSession

from adapters.orm_engines import models
from core.exceptions import DatabaseException
from domain.test import Test
from ports.repository.test_repository import TestRepository


class SQLAlchemyTestRepository(TestRepository):

    def __init__(self, db: AsyncSession):
        self.db = db

    @staticmethod
    def _from_model_to_dataclass(db_test: models.Test | None) -> Test | None:
        if db_test is None:
            return None
        test = Test(
            test_id=db_test.test_id,
            test_name=db_test.test_name,
            company_id=db_test.company_id)
        return test

    async def create_test(self, test: Test) -> Test:
        try:
            query = insert(models.Test).values(**test.to_dict()).returning(models.Test)
            result = await self.db.execute(query)
            new_test = self._from_model_to_dataclass(result.scalar())
            return new_test
        except Exception as e:
            await self.db.rollback()
            raise DatabaseException(str(e))

    async def get_all_tests(self, company_id: int) -> List[Test] | None:
        try:
            query = select(models.Test).where(models.Test.company_id == company_id)
            result = await self.db.execute(query)
            tests = [self._from_model_to_dataclass(db_test) for db_test in result.scalars().all()]
            return tests
        except Exception as e:
            raise DatabaseException(str(e))

    async def update_test(self, new_test: Test) -> Test | None:
        try:
            query = (
                update(models.Test)
                .where(models.Test.test_id == new_test.test_id)
                .values(**new_test.to_dict())
                .returning(models.Test)
            )
            result = await self.db.execute(query)
            test = self._from_model_to_dataclass(result.scalar())
            return test
        except Exception as e:
            await self.db.rollback()
            raise DatabaseException(str(e))

    async def delete_test(self, test_id: int, company_id: int) -> None:
        try:
            query = delete(models.Test).where(and_(
                models.Test.test_id == test_id,
                models.Test.company_id == company_id
            ))
            await self.db.execute(query)
        except Exception as e:
            await self.db.rollback()
            raise DatabaseException(str(e))

    async def get_test(self, test_id: int) -> Test | None:
        try:
            query = select(models.Test).where(models.Test.test_id == test_id)
            result = await self.db.execute(query)
            return self._from_model_to_dataclass(result.scalar())
        except Exception as e:
            raise DatabaseException(str(e))