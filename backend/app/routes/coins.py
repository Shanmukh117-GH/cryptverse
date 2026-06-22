from fastapi import APIRouter
from app.database.db import db
from app.services.coingecko import get_top_coins

router = APIRouter()


@router.get("/coins")
def get_coins():

    coins = list(
        db.coins.find(
            {},
            {"_id": 0}
        )
    )

    return coins


@router.get("/coins/{symbol}")
def get_coin(symbol: str):

    coin = db.coins.find_one(
        {
            "symbol": symbol.lower()
        },
        {
            "_id": 0
        }
    )

    if not coin:
        return {
            "message": "Coin not found"
        }

    return coin


@router.post("/sync-coins")
def sync_coins():

    coins = get_top_coins()

    db.coins.delete_many({})

    for coin in coins:

        db.coins.insert_one({
            "id": coin["id"],
            "symbol": coin["symbol"],
            "name": coin["name"],
            "current_price": coin["current_price"],
            "market_cap": coin["market_cap"],
            "image": coin["image"]
        })

    return {
        "message": f"{len(coins)} coins synced"
    }