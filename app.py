from flask import Flask, request, Response, render_template
import json
import sys
import urlparse

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

if __name__ == '__main__':
    flaskrun(app)
  #app.run(debug=True)