from pytwitter import Api
import twitter_bearer

def getRecentTweets(query: str, no_of_tweets: int = 10):
    api = Api(bearer_token=twitter_bearer.bearerCode)
    result = api.search_tweets(query = f"({query}) lang:pl", max_results= no_of_tweets)
    return [tweet.text for tweet in result.data]

print(getRecentTweets("python", 50))