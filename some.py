import pandas as pd

import twitter as ts


tweets = ts.getRecentTweets("NBP", 100)
texts = [tweet.text for tweet in tweets]
df =  pd.DataFrame(texts, columns=["text"])
df['scam'] = 0
df.to_csv("twitterNoScam.csv")