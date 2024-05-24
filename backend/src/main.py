from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from routers.auth_router import auth_router
from routers.test_router import test_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["Authorization"],
)

app.include_router(auth_router)
app.include_router(test_router)


@app.get("/healthcheck")
def health():
    return {"message": "service is available"}
