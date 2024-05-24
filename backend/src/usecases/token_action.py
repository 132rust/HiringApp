from datetime import datetime, timedelta

import jwt

from core.exceptions import InvalidTokenException
from core.settings import settings
from ports.repository.cache_repository import CacheRepository


class TokenUseCase:
    @staticmethod
    def create_token(company_id: int, expires_delta: int | None = None) -> str:
        try:
            if expires_delta:
                expire = datetime.utcnow() + timedelta(minutes=expires_delta)
            else:
                expire = datetime.utcnow() + timedelta(minutes=15)
            to_encode = {"company_id": company_id, "exp": expire}
            encoded_jwt = jwt.encode(to_encode, settings.JWT_SECRET_KEY, settings.JWT_ALGORITHM)
            return encoded_jwt
        except Exception:
            raise InvalidTokenException

    @staticmethod
    def get_id_from_token(token: str) -> int:
        try:
            print(token,2222)
            payload = jwt.decode(token, settings.JWT_SECRET_KEY, settings.JWT_ALGORITHM)
            print(payload,2222)
            return payload["company_id"]
        except Exception:
            raise InvalidTokenException


class RefreshTokens:
    @staticmethod
    async def refresh(old_refresh_token: str, cache_repository: CacheRepository):
        try:
            if await cache_repository.get_cache(old_refresh_token):
                raise Exception

            company_id = TokenUseCase.get_id_from_token(old_refresh_token)
            access_token = TokenUseCase.create_token(company_id, settings.ACCESS_TOKEN_EXPIRE_MINUTES)
            refresh_token = TokenUseCase.create_token(company_id, settings.REFRESH_TOKEN_EXPIRE_MINUTES)

            await cache_repository.set_cache(old_refresh_token, None, settings.REFRESH_TOKEN_EXPIRE_MINUTES)

            return {
                "access_token": access_token,
                "refresh_token": refresh_token,
                "token_type": "bearer",
            }
        except Exception:
            raise InvalidTokenException
