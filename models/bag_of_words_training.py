from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
import pandas as pd
import string
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, AdaBoostClassifier

class BagOfWords():
    def __init__(self) -> None:
        super().__init__()
        self.classifier
        self.vectorizer
        dfScam = pd.read_csv("models/inputScam.csv")
        dfNoScam = pd.read_csv("models/twitterNoScam.csv")
        dfNoScam['scam'] = 0
        mainDf = dfNoScam.append(dfScam, ignore_index=True)
        mainDf = mainDf.dropna()
        mainDf['text'] = mainDf['text'].apply(lambda x: self._remove_punctuation(x))
        mainDf['text']= mainDf['text'].apply(lambda x: x.lower())
        y = mainDf['scam']
        vectorizer = CountVectorizer()
        vectorizer = vectorizer.fit(mainDf['text'])
        vectors = vectorizer.transform(mainDf['text'])
        X_train, X_test, y_train, y_test = train_test_split(vectors, y, shuffle=True, test_size=0.2, random_state=1)
        classifier = DecisionTreeClassifier(max_depth=8)
        classifier = classifier.fit(X_train, y_train)

    def _remove_punctuation(self, text):
        punctuationfree="".join([i for i in text if i not in string.punctuation])
        return punctuationfree

    def is_scammy_text(self, tweeter_text: str) -> bool:
        tweeter_text = self._remove_punctuation(tweeter_text)
        tweeter_text = tweeter_text.lower()
        vector_tweet_input = self.vectorizer.transform([tweeter_text])

        result = self.classifier.predict(vector_tweet_input)
        if result > 0.5:
            return True
        return False