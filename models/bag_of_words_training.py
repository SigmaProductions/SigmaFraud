from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
import pandas as pd
import string
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, AdaBoostClassifier


def _remove_punctuation(text):
    punctuationfree="".join([i for i in text if i not in string.punctuation])
    return punctuationfree


def is_scammy_text(tweeter_text: str) -> bool:
    dfScam = pd.read_csv("inputScam.csv")
    dfNoScam = pd.read_csv("twitterNoScam.csv")
    dfNoScam['scam'] = 0
    mainDf = dfNoScam.append(dfScam, ignore_index=True)
    mainDf = mainDf.dropna()
    mainDf['text'] = mainDf['text'].apply(lambda x:_remove_punctuation(x))
    mainDf['text']= mainDf['text'].apply(lambda x: x.lower())
    y = mainDf['scam']
    vectorizer = CountVectorizer()
    vectorizer = vectorizer.fit(mainDf['text'])
    vectors = vectorizer.transform(mainDf['text'])
    X_train, X_test, y_train, y_test = train_test_split(vectors, y, shuffle=True, test_size=0.2, random_state=1)
    classifier = DecisionTreeClassifier(max_depth=8)
    classifier = classifier.fit(X_train, y_train)

    tweeter_text = _remove_punctuation(tweeter_text)
    tweeter_text = tweeter_text.lower()
    vector_tweet_input = vectorizer.transform([tweeter_text])

    result = classifier.predict(vector_tweet_input)
    print(vector_tweet_input)
    print(result)
    if result > 0.5:
        return True
    return False