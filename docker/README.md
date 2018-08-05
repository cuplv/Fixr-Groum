- build the image:
```docker build -t biggroum_frontend .```

- run the docker container:
```docker run -di -p 30073:5000 --name=biggroum_frontend biggroum_frontend```

```--link=biggroum_solr --mount type=bind,source=$SEARCH_GROUM_DIR,target=/persist --name=biggroum_search biggroum_search```

- test the web search:

Open the browser at `http://localhost:30073`
