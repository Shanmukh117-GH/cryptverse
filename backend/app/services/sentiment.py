from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

analyzer = SentimentIntensityAnalyzer()


def analyze_sentiment(text: str):

    score = analyzer.polarity_scores(text)

    compound = score["compound"]

    if compound >= 0.05:
        sentiment = "positive"

    elif compound <= -0.05:
        sentiment = "negative"

    else:
        sentiment = "neutral"

    return {
        "sentiment": sentiment,
        "score": compound
    }