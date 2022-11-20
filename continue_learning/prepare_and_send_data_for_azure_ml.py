from pymongo import MongoClient
import json
CONNECTION_STRING = "mongodb://mongo:mongo@model:27017/local?authSource=admin"
client = MongoClient(CONNECTION_STRING)



all_posts = list(client.local.posts.find({}))

f = open('dataset/labels.json')
  
# returns JSON object as 
# a dictionary
json_to_load = json.load(f)
f.close()


documents = []

i = 0
for post in all_posts:
    with open(f'dataset/{str(i)}.txt', encoding='utf-8', mode="w") as f:
        f.write(post['text'])
        documents.append(
            {
                "location":f"{str(i)}.txt",
                "language": "pl-pl",
                "class": {"category": post['state']}
            })
        f.close()
    i+=1

json_to_load['assets']["documents"] = documents
print(json_to_load)
with open('result.json', 'w') as fp:
    json.dump(json_to_load, fp, indent=4)