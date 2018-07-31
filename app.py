from flask import Flask, request, Response, render_template
import json
import sys
import urlparse
import logging

import requests

sys.path.append("..")
import proxypy
from flaskconfig import flaskrun

app = Flask(__name__)

@app.route('/')
def hello_world():
  return render_template('index.html')

@app.route("/crossdomain")
def crossdom():
    ##print('cors',request)
    reply = proxypy.get(request.query_string)
    return Response(reply, status=200, mimetype='application/json')

@app.route("/corspost")
def corspost():
    args = dict(urlparse.parse_qsl(request.query_string))
    data={
      "user": args["user"],
      "repo": args["repo"],
      "class": args["class"],
      "method": args["method"],
    }
    reply = proxypy.post(request.query_string, data)
    return Response(reply, status=200, mimetype='application/json')

@app.route("/cluster")
def cluster():
    return render_template('cluster.html')

@app.route("/groum")
def get_groum():
    return render_template('groum.html')

@app.route("/getsrc")
def get_src():
    args = dict(urlparse.parse_qsl(request.query_string));
    json_data={
      "githubUrl" : args["githubUrl"],
      "commitId" : args["commitId"],
      "declaringFile" : args["declaringFile"],
      "methodLine" : int(args["methodLine"]),
      "methodName" : args["methodName"],
    };

    headers = {"Content-type" : "application/json"}

    r = requests.post(args['url'],
                      data = json.dumps(json_data),
                      headers=headers)

    if r.status_code == 200:
      return Response(json.dumps(r.json()), status=200, mimetype='application/json')
    else:
      reply = {}
      reply["status"] = {}
      reply["content"] = None
      reply["status"]["http_code"] = r.status_code

      return Response(reply, status=r.status_code,
                      mimetype='application/json')

if __name__ == '__main__':
    flaskrun(app)
  #app.run(debug=True)
