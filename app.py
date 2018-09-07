from flask import Flask, request, Response, render_template
import json
import sys
import urlparse
import logging
import urllib
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
  # Build the real query string, unpacking it in a single url
  args = dict(urlparse.parse_qsl(request.query_string));

  if 'url' in args:
    get_query_string = "%s?" % (args['url'])
  else:
    return Respose({}, status=400, mimetype='application/json')

  first = True
  for key, value in args.iteritems():
    if key != 'url':
      if first:
        get_query_string = "%s%s=%s" % (get_query_string, key, value)
      else:
        get_query_string = "%s&%s=%s" % (get_query_string, key, value)
      first = False

  real_query_string_map = {"url" : get_query_string}
  real_query_string = urllib.urlencode(real_query_string_map)

  reply = proxypy.get(real_query_string)
  return_code = reply["status"]["http_code"]

  if return_code == 200:
    return Response(reply['content'], status=200, mimetype='application/json')
  else:
    return Response({},
                    status=return_code,
                    mimetype='application/json')

@app.route("/corspost")
def corspost():
  args = dict(urlparse.parse_qsl(request.query_string))

  data = {}
  for key,value in args.iteritems():
    data[key] = value
  # data={
  #   "user": args["user"],
  #   "repo": args["repo"],
  #   "class": args["class"],
  #   "method": args["method"],
  # }
  reply = proxypy.post(request.query_string, data)
  return Response(reply, status=200, mimetype='application/json')

@app.route("/cluster")
def cluster():
  return render_template('cluster.html')

@app.route("/groum")
def get_groum():
  return render_template('groum.html')

def process_post(args, json_data):
  headers = {"Content-type" : "application/json"}

  r = requests.post(args['url'],
                    data = json.dumps(json_data),
                    headers=headers)

  if r.status_code == 200:
    return Response(json.dumps(r.json()),
                    status=200,
                    mimetype='application/json')
  else:
    reply = {}
    reply["status"] = {}
    reply["content"] = None
    reply["status"]["http_code"] = r.status_code

    return Response(reply, status=r.status_code,
                    mimetype='application/json')


@app.route("/get_groums")
def get_groums():
  args = dict(urlparse.parse_qsl(request.query_string));

  json_data={
    "app_key" : args["app_key"]
  };

  return process_post(args, json_data)


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

  return process_post(args, json_data)

@app.route("/search")
def search():
  args = dict(urlparse.parse_qsl(request.query_string));
  json_data={
    "groum_key" : args["groum_key"]
  };

  return process_post(args, json_data)


if __name__ == '__main__':
    flaskrun(app)
  #app.run(debug=True)
