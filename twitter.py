from pytwitter import Api
from tweet import Tweet
import twitter_bearer
from typing import List

def getRecentTweets(query: str, no_of_tweets: int = 10) -> List[Tweet]:
    api = Api(bearer_token=twitter_bearer.bearerCode)
    result = api.search_tweets(query = f"({query}) lang:pl", max_results= no_of_tweets)
    return [Tweet(tweet.text, 1) for tweet in result.data]
