from google.cloud import language_v1
from flask import Flask, request,jsonify
import os
import json
from facebook import GraphAPI
import psycopg2
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
print (userid);

@app.route('/',methods=["GET"])
def home():
    url="localhost:3000/api/users/group-counts"

    userid = graph.get_object("/me?fields=id")
    grouping = graph.request(userid["id"] + "/groups")['data']
    print(grouping)
    Grp = []
    for group in grouping:
        groupsent = {"user_id": userid['id'],"group_id":group["id"],"group_name":group["name"], "happy_count": 0, "neutral_count": 0, "sad_count": 0}
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
                groupsent["happy_count"] += 1
            elif (post["sentiment"][0] < -0.25):
                groupsent["sad_count"] += 1
            else:
                groupsent["neutral_count"] += 1
        Grp.append(groupsent)
    for G in Grp:
        print (G)
        J=jsonify(G)
        out=request.post(url,data=J)
    return True

if __name__ == '__main__':
   app.run()