import twitter as ts
import nlp as pipeline
import database as db


if __name__ == '__main__':


    list_of_tweets = ts.getRecentTweets("python")
    for tweet in list_of_tweets:
        prediction = pipeline.pipeline(tweet)
        if prediction == True:
            db.save_to_db(tweet)

