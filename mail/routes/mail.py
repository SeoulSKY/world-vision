import os
from flask import Blueprint, request, Response, Flask
from flask_mail import Mail, Message

_mail_bp = Blueprint("mail", __name__)

_mail = Mail()


def is_valid_json(json: dict) -> bool:
    """
    Check if the given json is valid for POST request
    :param json: The json to check
    :return: True if it is valid, False otherwise
    """
    return "senderEmail" in json and "title" in json and "message" in json


def init_mail(app: Flask) -> None:
    """
    Initialize flask mail
    :param app: Flask app
    """
    # Use Message and Mail with Flask-Mail imports to config SMTP settings
    app.config["MAIL_SERVER"] = "smtp.gmail.com"
    app.config["MAIL_PORT"] = 465
    app.config["MAIL_USE_SSL"] = True
    app.config["MAIL_USE_TLS"] = False
    app.config["MAIL_USERNAME"] = os.environ.get("MAIL_USERNAME")
    app.config["MAIL_PASSWORD"] = os.environ.get("MAIL_PASSWORD")
    app.config["MAIL_DEFAULT_SENDER"] = os.environ.get("MAIL_USERNAME")

    _mail.init_app(app)

    app.register_blueprint(_mail_bp, url_prefix="/mail")


@_mail_bp.route("/", methods=["GET"])
def get():
    """
    An endpoint for smoke test
    """
    return "Hello from mail"


@_mail_bp.route("/", methods=["POST"])
def post():
    """
    Send a mail
    """
    json = request.get_json()
    if not is_valid_json(json):
        return Response("Missing required parameters", 400)

    sender_email = json["senderEmail"]
    title = json["title"]
    message = json["message"]

    # Send message from contact page with specified recipient
    msg = Message(title, sender=sender_email, recipients=[os.environ.get("MAIL_USERNAME")])

    # for message format
    msg.body = """ From: %s 
    %s """ % (sender_email, message)

    _mail.send(msg)

    return Response("Sent", 201)
