# Fixr-Groum

For the quick and dirty setup, install your dependencies:

```
pip install -r requirements.txt
npm install -g webpack; npm install
```

Then in two separate tabs run `python app.py` and `webpack --watch`.

These steps are explained in more detail below.

## Prerequisites

You'll need some package managers. `npm` requires `node` installed.

- `npm`
- `pip`

## Setup

For the backend:

```
pip install -r requirements.txt
```

For the frontend:

If you don't have webpack, install it:

```
npm install -g webpack
```

Then, use `npm` to install the remaining JavaScript dependencies.

```
npm install
```

The dependencies configured in `webpack.config.js` might not complete at this time, use the following command to install the missing modules.
```
npm install [module]
```

*Note*: Please install `react-graph-vis` separately. After installed, replace the original file `index.js` with the one in `./modded-lib`.
This will be fixed in the future. 

## Development

The entry points for the app are `js/app.js` and `js/groum/groum.js` respectively.

While developing on the frontend, run `webpack --watch` to keep re-compiling your JavaScript code.

Running `webpack` creates a file in `static/bundle.js` for entry `app.js`, and `static/groum.js` for entry `groum.js`. They're the bundled version of your frontend code.

The "backend" here is a bare-bones Flask app.

To run the application, follow the steps in the next section.

## Running the app


If you run the app for the first time, do a setup then run `webpack --watch` before run the app.
To check if there's any updates, run `webpack --watch` to regenerate the bundle files.
Otherwise, run the Flask app:

```
python app.py
```

The default address and port number are 127.0.0.1:5000, you can specify them by adding arguments `--p`/`--port` and `--h`/`--host`
