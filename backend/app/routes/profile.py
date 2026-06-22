from fastapi import APIRouter, Depends

from app.auth.dependencies import get_current_user

router = APIRouter()


@router.get("/profile")
def profile(
    current_user=Depends(get_current_user)
):

    return {
        "user": current_user
    }