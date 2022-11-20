from datetime import date, timedelta
import datetime
from flask import Flask
from flask_pymongo import PyMongo
import twitter as ts
import nlp as pipeline
from flask import request
from bson import json_util, ObjectId
from flask_cors import CORS, cross_origin
app = Flask(__name__)
CORS(app)
app.config["MONGO_URI"] = "mongodb://mongo:mongo@mongo:27017/local?authSource=admin"

mongo = PyMongo(app)

list_of_tweets = ts.getRecentTweets("NBP")
for tweet in list_of_tweets:
    prediction = pipeline.pipeline(tweet)
    if prediction == True:
        tweet.state = None
        mongo.db.posts.insert_one(tweet.to_dict())


@app.route("/susposts")
def get_all_sus_posts():
    results = list(mongo.db.posts.find({}))
    for result in results:
        result['_id'] = str(result['_id'])
    return results

@app.route("/susposts/users/<user_id>")
def get_user_sus_posts(user_id):
    results = list(mongo.db.posts.find({'author_id': user_id}))
    for result in results:
        result['_id'] = str(result['_id'])
    return results


@app.route("/changestate", methods = ['POST'])
def set_post_state():
    postId = request.form.get('id')
    state = request.form.get('state')
    mongo.db.posts.update_one({"_id" : ObjectId(postId)}, {"$set": {'state': state}})
    return {}

@app.route("/susposts/distribution")
def get_sustribution():
    results=[]
    for i in range(0,30):
        day= datetime.datetime.now() - timedelta(i)
        day=datetime.datetime.strftime(day, '%Y-%m-%d')
        results.append( len(list(mongo.db.posts.find({'created_at': {'$regex': day.__str__()}}))))
    return results