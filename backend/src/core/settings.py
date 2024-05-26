from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DB_URL: str = 'postgresql+asyncpg://postgres:password@localhost:5432/my_db'
    REDIS_URL: str = ''
    JWT_SECRET_KEY: str = ''
    JWT_ALGORITHM: str = ''
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 0
    REFRESH_TOKEN_EXPIRE_MINUTES: int = 0


settings = Settings()
