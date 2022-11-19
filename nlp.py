from tweet import Tweet


def pipeline(tweet: Tweet):
    return _bag_of_words(tweet.text)

def _bag_of_words(tweet_text: str):
    return True