import argparse


def flaskrun(app, default_host="127.0.0.1", default_port="5000"):

    parser = argparse.ArgumentParser(description='Manage Flask')
    parser.add_argument('--h', '--host', type=str, default=default_host,
                        help="Hostname of the Flask app " + \
                             "[default %s]" % default_host)

    parser.add_argument('--p', '--port', type=str, default=default_port,
                        help="Port for the Flask app " + \
                             "[default %s]" % default_port)
    args = parser.parse_args()

    app.run(
        debug=True,
        host=args.h,
        port=int(args.p)
    )
