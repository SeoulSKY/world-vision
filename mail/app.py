from flask import Flask
from flask_cors import CORS
from routes.mail import init_mail
from waitress import serve


def create_app() -> Flask:
    """
    Create a flask app
    :return: Flask app
    """
    app = Flask(__name__)
    CORS(app)

    init_mail(app)

    return app


if __name__ == '__main__':
    app = create_app()

    HOST = "0.0.0.0"
    PORT = 5001

    print(f"Started listening {HOST}:{PORT}")
    serve(app, host=HOST, port=PORT)
