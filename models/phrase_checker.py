from tweet import Tweet


class PhraseChecker():
    def __init__(self) -> None:
        with open('models/your_file.txt', encoding='utf-8') as f:
            self.lines = f.read().splitlines()

    def check_if_string_contain_malicius_phrase(self, tweet: Tweet)-> bool:
        if any(substring in tweet.text for substring in self.lines):
            tweet.contains_malicious_phrases = True
            return True
        tweet.contains_malicious_phrases = False
        return False
        