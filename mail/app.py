from flask import Flask
from flask_cors import CORS
from routes.mail import mail_bp, init_mail
from waitress import serve


def create_app() -> Flask:
    """
    Create a flask app
    :return: Flask app
    """
    app = Flask(__name__)
    CORS(app)

    init_mail(app)

    app.register_blueprint(mail_bp, url_prefix="/mail")

    return app


if __name__ == '__main__':
    app = create_app()

    HOST = "0.0.0.0"
    PORT = 5001

    print(f"Started listening {HOST}:{PORT}")
    serve(app, host=HOST, port=PORT)
