from fastapi import FastAPI

app = FastAPI()


@app.get("/healthcheck")
def health():
    return {"message": "service is available"}
