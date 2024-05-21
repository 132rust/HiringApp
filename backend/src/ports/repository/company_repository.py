from abc import ABC, abstractmethod

from domain.company import Company


class CompanyRepository(ABC):
    @abstractmethod
    async def create_company(self, company: Company) -> Company:
        pass

    @abstractmethod
    async def get_company_by_id(self, company_id: int) -> Company | None:
        pass

    @abstractmethod
    async def get_company_by_email(self, email: str) -> Company | None:
        pass
