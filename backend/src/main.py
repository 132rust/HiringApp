from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from routers.auth_router import auth_router
from routers.room_router import room_router
from routers.score_router import score_router
from routers.test_router import test_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],  # Разрешить все методы (GET, POST, PUT, DELETE и т.д.)
    allow_headers=["Authorization"],  # Разрешить все заголовки
)

app.include_router(auth_router)
app.include_router(test_router)
app.include_router(score_router)
app.include_router(room_router)


@app.get("/healthcheck")
def health():
    return {"message": "service is available"}
