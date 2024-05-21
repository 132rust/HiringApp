from dataclasses import dataclass
from datetime import date


@dataclass
class Score:
    score_id: int
    score: float
    candidate_name: int
    media_contact: str
    date: date

    question_id: int
