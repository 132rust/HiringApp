from datetime import datetime
from typing import List

from sqlalchemy import String, ForeignKey, func
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship


class Base(DeclarativeBase):
    pass


class Company(Base):
    __tablename__ = "companies"
    company_id: Mapped[int] = mapped_column(primary_key=True)
    company_name: Mapped[str] = mapped_column(nullable=False)
    email: Mapped[str] = mapped_column(unique=True)
    password: Mapped[str] = mapped_column(String(60), nullable=False)

    tests: Mapped[List["Test"]] = relationship(back_populates="company")


class Test(Base):
    __tablename__ = "tests"
    test_id: Mapped[int] = mapped_column(primary_key=True)
    test_name: Mapped[str] = mapped_column(server_default="Без названия")
    company_id: Mapped[int] = mapped_column(ForeignKey("companies.company_id"))
    company: Mapped[Company] = relationship(back_populates="tests")

    questions: Mapped[List["Question"]] = relationship(back_populates="test", cascade="all, delete-orphan")
    scores: Mapped[List["Score"]] = relationship(back_populates="test", cascade="all, delete-orphan")


class Question(Base):
    __tablename__ = "questions"
    question_id: Mapped[int] = mapped_column(primary_key=True)
    description: Mapped[str] = mapped_column(nullable=False)
    answer: Mapped[str] = mapped_column(nullable=False)
    test_id: Mapped[int] = mapped_column(ForeignKey("tests.test_id", ondelete="CASCADE"))
    test: Mapped["Test"] = relationship(back_populates="questions")


class Score(Base):
    __tablename__ = "scores"
    score_id: Mapped[int] = mapped_column(primary_key=True)
    score: Mapped[float] = mapped_column(nullable=False)
    candidate_name: Mapped[str] = mapped_column(nullable=False)
    media_contact: Mapped[str] = mapped_column()
    date: Mapped[datetime] = mapped_column(server_default=func.now())

    test_id: Mapped[int] = mapped_column(ForeignKey("tests.test_id", ondelete="CASCADE"))
    test: Mapped["Test"] = relationship(back_populates="scores")
