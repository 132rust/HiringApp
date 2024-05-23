from dataclasses import dataclass


@dataclass
class Question:
    description: str
    test_id: int

    question_id: int | None = None
    answer: str | None = None

    def to_dict(self, exclude_none=True):
        if exclude_none:
            return {k: v for k, v in self.__dict__.items() if v is not None}
        else:
            return self.__dict__.copy()
