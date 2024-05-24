from fastapi import APIRouter, status, Depends

from ports.repository.cache_repository import CacheRepository
from routers.depends.usecase_depends import get_auth_usecase, get_cache_repository
from routers.schemas.auth_schemas import Token, LoginUser, CreateUser
from usecases.auth import AuthUseCase
from usecases.token_action import RefreshTokens

auth_router = APIRouter(tags=["auth"], prefix="/auth")


@auth_router.post("/login", response_model=Token, status_code=status.HTTP_200_OK)
async def login_for_access_token(user: LoginUser, user_use_case: AuthUseCase = Depends(get_auth_usecase)):
    token_dict = await user_use_case.login(user.email, user.password)
    return token_dict


@auth_router.post("/signup", status_code=status.HTTP_201_CREATED)
async def register_for_access_token(user: CreateUser, user_use_case: AuthUseCase = Depends(get_auth_usecase)):
    await user_use_case.register(user.to_entity())


@auth_router.post("/refresh-token", response_model=Token, status_code=status.HTTP_200_OK)
async def refresh_token(old_refresh_token: str, cache_repository: CacheRepository = Depends(get_cache_repository)):
    return await RefreshTokens.refresh(old_refresh_token, cache_repository)
