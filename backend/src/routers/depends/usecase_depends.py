from fastapi import Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.ext.asyncio import AsyncSession

from adapters.repositories.company_repository import SQLAlchemyCompanyRepository
from adapters.repositories.redis_repository import RedisRepository
from adapters.repositories.test_repository import SQLAlchemyTestRepository
from adapters.repositories.question_repository import SQLAlchemyQuestionRepository
from ports.repository.cache_repository import CacheRepository
from ports.repository.company_repository import CompanyRepository
from ports.repository.question_repository import QuestionRepository
from ports.repository.test_repository import TestRepository
from routers.depends.database_depends import get_db
from usecases.auth import AuthUseCase
from usecases.test_usecase import TestUsecase


def get_user_repository(db: AsyncSession = Depends(get_db)) -> CompanyRepository:
    return SQLAlchemyCompanyRepository(db)


def get_test_repository(db: AsyncSession = Depends(get_db)) -> TestRepository:
    return SQLAlchemyTestRepository(db)


def get_question_repository(db: AsyncSession = Depends(get_db)) -> QuestionRepository:
    return SQLAlchemyQuestionRepository(db)


def get_cache_repository() -> CacheRepository:
    return RedisRepository()


def get_auth_usecase(user_repo: CompanyRepository = Depends(get_user_repository)) -> AuthUseCase:
    return AuthUseCase(user_repo)


def get_test_usecase(
        auth: HTTPAuthorizationCredentials = Depends(HTTPBearer()),
        test_repo: TestRepository = Depends(get_test_repository),
        question_repo: QuestionRepository = Depends(get_question_repository)
) -> TestUsecase:
    return TestUsecase(auth.credentials, test_repo, question_repo)
