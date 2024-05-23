from dataclasses import dataclass
from datetime import datetime


@dataclass
class Score:
    score: float
    candidate_name: str
    media_contact: str
    date: datetime
    test_id: int

    score_id: int | None = None

    def to_dict(self, exclude_none=True):
        if exclude_none:
            return {k: v for k, v in self.__dict__.items() if v is not None}
        else:
            return self.__dict__.copy()
