from pydantic import BaseModel

class CommentCreate(BaseModel):
    coin_symbol: str
    username: str
    comment: str