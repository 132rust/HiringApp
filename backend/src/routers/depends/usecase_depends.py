from fastapi import Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.ext.asyncio import AsyncSession

from adapters.repositories.redis_repository import RedisRepository
from adapters.repositories.company_repository import SQLAlchemyCompanyRepository
from ports.repository.cache_repository import CacheRepository
from ports.repository.company_repository import CompanyRepository
from routers.depends.database_depends import get_db
from usecases.auth import AuthUseCase


def get_user_repository(db: AsyncSession = Depends(get_db)) -> CompanyRepository:
    return SQLAlchemyCompanyRepository(db)


def get_cache_repository() -> CacheRepository:
    return RedisRepository()


def get_auth_usecase(user_repo: CompanyRepository = Depends(get_user_repository)) -> AuthUseCase:
    return AuthUseCase(user_repo)


# def get_usecase(
#     auth: HTTPAuthorizationCredentials = Depends(HTTPBearer()), user_repo: CompanyRepository =
#         Depends(get_user_repository)) -> CompanyManagementUseCase:
#     return UserManagementUseCase(auth.credentials, user_repo)
