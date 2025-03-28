from fastapi import FastAPI
from ..rout.rout import router

app = FastAPI()

app.include_router(router)