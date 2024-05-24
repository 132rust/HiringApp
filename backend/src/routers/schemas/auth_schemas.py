from pydantic import BaseModel, EmailStr

from domain.company import Company


class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str
    company_name: str


class CreateUser(BaseModel):
    email: EmailStr
    company_name: str
    password: str

    def to_entity(self):
        return Company(
            email=self.email,
            company_name=self.company_name,
            password=self.password,
        )


class LoginUser(BaseModel):
    email: EmailStr
    password: str
