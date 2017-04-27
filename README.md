<<<<<<< HEAD
# Fixr-Groum

For the quick and dirty setup, install your dependencies:

```
pip install virtualenv
virtualenv venv; source venv/bin/activate
pip install -r requirements.txt
npm install -g webpack; npm install
```

Then in two separate tabs run `python app.py` and `webpack --watch`.

These steps are explained in more detail below.

## Prerequisites

You'll need some package managers.

- `npm`
- `pip`

## Setup

For the backend:

```
virtualenv venv
source venv/bin/activate
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

## Development

The entry points for the app are `js/app.js` and `js/groum/groum.js` respectively.

While developing on the frontend, run `webpack --watch` to keep re-compiling your JavaScript code.

Running `webpack` creates a file in `static/bundle.js` for entry `app.js`, and `static/groum.js` for entry `groum.js`. They're the bundled version of your frontend code.

The "backend" here is a bare-bones Flask app.

To run the application, follow the steps in the next section.

## Running the app

If you're using a virtualenv, activate it.

```
source venv/bin/activate
```

Then run the Flask app:

```
python app.py
```
