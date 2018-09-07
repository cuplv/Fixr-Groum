# Install dependencies
```
pip install -r requirements.txt
npm install
```

You need `npm`, `pip` and `python` on your system.


# Develop:

The web app is built automatically with `webpack`. Run `npm run-script develop` to continuously update the app after every change.

The app uses a web server that can be started as: 
```
python /home/biggroum/fixr_groum_search_frontend/app.py --host 0.0.0.0 --port 5000
```

The web interface is then on `localhost:5000`

You also need to start additional services to run the interface (see http://github.com/cuplv/biggroum, and the docker compose file there).
