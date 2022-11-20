from tweet import Tweet
from models.bag_of_words_training import BagOfWords

def pipeline(tweet: Tweet):
    some = BagOfWords()
    return some.is_scammy_text(tweet.text) or phrase_detection(tweet.text)

def phrase_detection(tweet_text: str):
    return True

