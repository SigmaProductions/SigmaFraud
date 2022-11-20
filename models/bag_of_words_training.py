from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
import pandas as pd
import string
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, AdaBoostClassifier

from tweet import Tweet

class BagOfWords():
    def __init__(self) -> None:
        self.vectorizer = None
        self.classifier = None
        dfScam = pd.read_csv("models/inputScam.csv")
        dfNoScam = pd.read_csv("models/twitterNoScam.csv")
        dfNoScam['scam'] = 0
        mainDf = dfNoScam.append(dfScam, ignore_index=True)
        mainDf = mainDf.dropna()
        mainDf['text'] = mainDf['text'].apply(lambda x: self._remove_punctuation(x))
        mainDf['text']= mainDf['text'].apply(lambda x: x.lower())
        y = mainDf['scam']
        self.vectorizer = CountVectorizer()
        self.vectorizer = self.vectorizer.fit(mainDf['text'])
        vectors = self.vectorizer.transform(mainDf['text'])
        X_train, X_test, y_train, y_test = train_test_split(vectors, y, shuffle=True, test_size=0.2, random_state=1)
        self.classifier = DecisionTreeClassifier(max_depth=8)
        self.classifier = self.classifier.fit(X_train, y_train)

    def _remove_punctuation(self, text):
        punctuationfree="".join([i for i in text if i not in string.punctuation])
        return punctuationfree

    def is_scammy_text(self, tweet: Tweet) -> bool:
        tweet.text = self._remove_punctuation(tweet.text)
        tweet.text = tweet.text.lower()
        vector_tweet_input = self.vectorizer.transform([tweet.text])

        result = self.classifier.predict(vector_tweet_input)
        if result > 0.5:
            return True
        return False