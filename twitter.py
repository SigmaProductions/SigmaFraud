from pytwitter import Api
from tweet import Tweet
import twitter_bearer
from typing import List

def getRecentTweets(query: str, no_of_tweets: int = 100) -> List[Tweet]:
    api = Api(bearer_token=twitter_bearer.bearerCode)
    result = api.search_tweets(query = f"({query}) lang:pl",
         tweet_fields=['author_id',"id", "text", "created_at", "public_metrics"],
         expansions=["attachments.media_keys"],
         media_fields=['url',"preview_image_url", "type"],
         max_results= no_of_tweets)

    authorIds = [tweet.author_id for tweet in result.data]
    usersResponse = api.get_users(ids=authorIds)
    s = [(userdata.name, userdata.id) for userdata in usersResponse.data]
    return [Tweet(tweet.text, tweet.id, "not-processed", tweet.created_at, tweet.author_id,userData[0]) for tweet, userData in zip (result.data, s)]
