from models.phrase_checker import PhraseChecker
from tweet import Tweet
from models.bag_of_words_training import BagOfWords

def pipeline(tweet: Tweet):
    bow = BagOfWords()
    pc = PhraseChecker()
    return bow.is_scammy_text(tweet) or pc.check_if_string_contain_malicius_phrase(tweet)
