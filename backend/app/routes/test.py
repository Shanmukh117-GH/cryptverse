from fastapi import APIRouter
from app.database.db import db

router = APIRouter()

@router.get("/test-db")
def test_db():

    result = db.users.insert_one({
        "username": "testuser"
    })

    return {
        "inserted_id": str(result.inserted_id)
    }