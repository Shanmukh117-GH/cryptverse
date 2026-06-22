from fastapi import Header, HTTPException
from typing import Optional

from app.auth.jwt_handler import verify_token


def get_current_user(
    authorization: Optional[str] = Header(None)
):

    if authorization is None:
        raise HTTPException(
            status_code=401,
            detail="Token missing"
        )

    if not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=401,
            detail="Invalid token format"
        )

    token = authorization.replace(
        "Bearer ",
        ""
    )

    payload = verify_token(token)

    if payload is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    return payload