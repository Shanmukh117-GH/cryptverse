from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.auth import router as auth_router
from app.routes.coins import router as coins_router
from app.routes.comments import router as comments_router
from app.routes.profile import router as profile_router

app = FastAPI(
    title="CryptVerse API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(coins_router)
app.include_router(comments_router)
app.include_router(profile_router)

@app.get("/")
def home():
    return {
        "message": "Welcome to CryptVerse"
    }
