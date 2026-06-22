from fastapi import APIRouter

from app.database.db import db
from app.models.comment import CommentCreate
from app.services.sentiment import analyze_sentiment

router = APIRouter()

@router.post("/comments")
def create_comment(comment: CommentCreate):

    result = analyze_sentiment(
        comment.comment
    )

    document = {
        "coin_symbol": comment.coin_symbol,
        "username": comment.username,
        "comment": comment.comment,
        "sentiment": result["sentiment"],
        "score": result["score"]
    }

    db.comments.insert_one(document)

    return {
        "message": "Comment Added",
        "sentiment": result["sentiment"],
        "score": result["score"]
    }



@router.get("/coins/{symbol}/sentiment")
def get_coin_sentiment(symbol: str):

    comments = list(
        db.comments.find({
            "coin_symbol": symbol.lower()
        })
    )

    total = len(comments)

    if total == 0:
        return {
            "message": "No comments found"
        }

    positive = sum(
        1 for c in comments
        if c["sentiment"] == "positive"
    )

    negative = sum(
        1 for c in comments
        if c["sentiment"] == "negative"
    )

    neutral = sum(
        1 for c in comments
        if c["sentiment"] == "neutral"
    )

    positive_percentage = round(
        (positive / total) * 100,
        2
    )

    negative_percentage = round(
        (negative / total) * 100,
        2
    )

    neutral_percentage = round(
        (neutral / total) * 100,
        2
    )

    overall_sentiment = max(
        {
            "positive": positive,
            "negative": negative,
            "neutral": neutral
        },
        key=lambda x: {
            "positive": positive,
            "negative": negative,
            "neutral": neutral
        }[x]
    )

    return {
        "coin": symbol,
        "total_comments": total,
        "positive": positive,
        "negative": negative,
        "neutral": neutral,
        "positive_percentage": positive_percentage,
        "negative_percentage": negative_percentage,
        "neutral_percentage": neutral_percentage,
        "overall_sentiment": overall_sentiment
    }

@router.get("/coins/{symbol}/comments")
def get_comments(symbol: str):

    comments = list(
        db.comments.find(
            {
                "coin_symbol": symbol.lower()
            },
            {
                "_id": 0
            }
        )
    )

    return comments

@router.get("/coins/{symbol}/comments")
def get_comments(symbol: str):

    comments = list(
        db.comments.find(
            {"coin_symbol": symbol.lower()},
            {"_id": 0}
        )
    )

    return comments