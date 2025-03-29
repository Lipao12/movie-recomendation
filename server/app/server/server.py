from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from ..rout.rout import router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://flickmood.vercel.app"],#["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)