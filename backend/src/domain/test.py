from dataclasses import dataclass


@dataclass
class Test:
    test_name: str
    company_id: int

    test_id: int | None = None

    def to_dict(self, exclude_none=True):
        if exclude_none:
            return {k: v for k, v in self.__dict__.items() if v is not None}
        else:
            return self.__dict__.copy()
