from core.exceptions import UserAlreadyExist, InvalidCredentialsException
from core.settings import settings
from domain.company import Company
from ports.repository.company_repository import CompanyRepository
from usecases.token_action import TokenUseCase
from usecases.utils import Hash


class AuthUseCase:
    def __init__(self, repo: CompanyRepository):
        self.repo = repo

    async def __authenticate_user(self, email: str, password: str) -> Company:
        company = await self.repo.get_company_by_email(email)
        if not company or not Hash.verify_password(password, company.password):
            raise InvalidCredentialsException
        return company

    async def login(self, email: str, password: str) -> dict:
        company = await self.__authenticate_user(email, password)

        access_token = TokenUseCase.create_token(company.company_id, settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        refresh_token = TokenUseCase.create_token(company.company_id, settings.REFRESH_TOKEN_EXPIRE_MINUTES)
        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer",
            "company_name": company.company_name
        }

    async def register(self, company: Company) -> None:
        db_company = await self.repo.get_company_by_email(email=company.email)
        if db_company:
            raise UserAlreadyExist
        company.password = Hash.get_password_hash(company.password)
        await self.repo.create_company(company)
