from fastapi import FastAPI

from routers.auth_router import auth_router

app = FastAPI()


app.include_router(auth_router)


@app.get("/healthcheck")
def health():
    return {"message": "service is available"}
