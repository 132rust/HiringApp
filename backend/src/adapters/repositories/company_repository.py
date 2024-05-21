from sqlalchemy import insert, select
from sqlalchemy.ext.asyncio import AsyncSession

from adapters.orm_engines import models
from core.exceptions import DatabaseException
from domain.company import Company
from ports.repository.company_repository import CompanyRepository


class SQLAlchemyCompanyRepository(CompanyRepository):
    def __init__(self, db: AsyncSession):
        self.db = db

    @staticmethod
    def _from_model_to_dataclass(db_company: models.Company | None) -> Company | None:
        if db_company is None:
            return None
        company = Company(
            company_id=db_company.company_id,
            email=db_company.email,
            password=db_company.password,
            company_name=db_company.company_name)
        return company

    async def create_company(self, company: Company) -> Company:
        try:
            query = insert(models.Company).values(**company.to_dict()).returning(models.Company)
            result = await self.db.execute(query)
            new_company = self._from_model_to_dataclass(result.scalar())
            return new_company
        except Exception as e:
            await self.db.rollback()
            raise DatabaseException(str(e))

    async def get_company_by_email(self, email: str) -> Company | None:
        try:
            query = select(models.Company).where(models.Company.email == email)
            result = await self.db.execute(query)
            user = self._from_model_to_dataclass(result.scalar())
            return user
        except Exception as e:
            raise DatabaseException(str(e))

    async def get_company_by_id(self, company_id: int) -> Company | None:
        try:
            query = select(models.Company).where(models.Company.company_id == company_id)
            result = await self.db.execute(query)
            user = self._from_model_to_dataclass(result.scalar())
            return user
        except Exception as e:
            raise DatabaseException(str(e))
