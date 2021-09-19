from google.cloud import language_v1
from flask import Flask, request,jsonify
import os
import requests
import json
from facebook import GraphAPI

app=Flask(__name__)
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "socialsense-c8dcf7afe7fa.json"


def sentimentAnalyze(text_content):
    client = language_v1.LanguageServiceClient()
    type_ = language_v1.Document.Type.PLAIN_TEXT
    language = "en"
    document = {"content": text_content, "type_": type_, "language": language}
    encoding_type = language_v1.EncodingType.UTF8
    response = client.analyze_sentiment(request = {'document': document, 'encoding_type': encoding_type})
    return(response.document_sentiment.score)


def classifytxt(text_content):
    client = language_v1.LanguageServiceClient()

    type_ = language_v1.Document.Type.PLAIN_TEXT

    language = "en"
    document = {"content": text_content, "type_": type_, "language": language}

    response = client.classify_text(request={'document': document})
    # Loop through classified categories returned from the API
    categories = []
    for category in response.categories:
        if (category.confidence > .5):
            categories.append(category.name)
    return categories


def read_creds(filename):
    with open(filename) as f:
        credentials = json.load(f)
    return credentials


credentials = read_creds('Credentials.json')

graph = GraphAPI(access_token=credentials['access_token'])

userid=graph.get_object("/me?fields=id")
print (userid)

@app.route('/',methods=["GET","POST"])
def home():
    url="https://99b1-2607-fea8-2adf-81a0-a4df-fbaa-34c8-c8c.ngrok.io/api/users/create"

    userid = graph.get_object("/me?fields=id")
    grouping = graph.request(userid["id"] + "/groups")['data']
    print(grouping)
    Grp = []
    for group in grouping:
        groupsent = {"userID": userid['id'],"groupID":group["id"],"groupName":group["name"], "happyCount": 0, "neutralCount": 0, "sadCount": 0}
        datafb = graph.get_object(group['id'] + "/feed", page=True, retry=3, limit=10)
        gname=group['name']
        print(datafb)
        posts = []
        for post in datafb['data']:
            try:
                postsent = {"text": [], "sentiment": []}
                postsent["text"].append(post['message'])
                postsent["sentiment"].append(sentimentAnalyze(post['message']))
                posts.append(postsent)
            except(RuntimeError, TypeError, KeyError):
                pass
        for post in posts:
            if (post["sentiment"][0] > .25):
                groupsent["happyCount"] += 1
            elif (post["sentiment"][0] < -0.25):
                groupsent["sadCount"] += 1
            else:
                groupsent["neutralCount"] += 1
        Grp.append(groupsent)
    for G in Grp:
        print (G)

        requests.post(url, G)
    return jsonify(Grp)

if __name__ == '__main__':
   app.run()