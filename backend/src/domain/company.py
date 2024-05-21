from dataclasses import dataclass


@dataclass
class Company:
    # класс для входа в систему
    company_name: str
    email: str
    password: str
    company_id: int | None = None

    def to_dict(self, exclude_none=True):
        if exclude_none:
            return {k: v for k, v in self.__dict__.items() if v is not None}
        else:
            return self.__dict__.copy()
