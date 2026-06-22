from fastapi import APIRouter

from app.models.user import UserRegister, UserLogin
from app.database.db import db
from app.auth.hashing import hash_password, verify_password
from app.auth.jwt_handler import create_token

router = APIRouter()


@router.post("/register")
def register(user: UserRegister):

    existing = db.users.find_one({
        "email": user.email
    })

    if existing:
        return {
            "message": "Email already exists"
        }

    hashed = hash_password(user.password)

    db.users.insert_one({
        "username": user.username,
        "email": user.email,
        "password": hashed
    })

    return {
        "message": "User Registered Successfully"
    }


@router.post("/login")
def login(user: UserLogin):

    existing_user = db.users.find_one({
        "email": user.email
    })

    if not existing_user:
        return {
            "message": "User not found"
        }

    valid_password = verify_password(
        user.password,
        existing_user["password"]
    )

    if not valid_password:
        return {
            "message": "Invalid password"
        }

    token = create_token({
        "email": existing_user["email"],
        "username": existing_user["username"]
    })

    return {
        "access_token": token,
        "token_type": "bearer"
    }