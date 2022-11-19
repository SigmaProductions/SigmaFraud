from flask import Flask
from flask_pymongo import PyMongo
import twitter as ts
import nlp as pipeline
from flask import request
from bson import json_util, ObjectId


app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://mongo:mongo@localhost:27017/local?authSource=admin"

mongo = PyMongo(app)

list_of_tweets = ts.getRecentTweets("NBP")
for tweet in list_of_tweets:
    prediction = pipeline.pipeline(tweet)
    if prediction == True:
        tweet.state = 'sus'
        mongo.db.posts.insert_one(tweet.to_dict())


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/susposts")
def get_all_sus_posts():
    results = list(mongo.db.posts.find({}))
    for result in results:
        result['_id'] = str(result['_id'])
    return results

@app.route("/changestate", methods = ['POST'])
def set_post_state():
    print(request.form)
    postId = request.form.get('id')
    print(postId)
    state = request.form.get('state')
    mongo.db.posts.update_one({"_id" : ObjectId(postId)}, {"$set": {'state': state}})
    return {}