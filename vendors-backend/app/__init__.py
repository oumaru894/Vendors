import os
from wtforms import  Form, StringField, TextAreaField, PasswordField, SubmitField, validators, EmailField, ValidationError
from flask_wtf import FlaskForm

from flask import Flask, flash, redirect, render_template, request, session
from flask_session import Session
from tempfile import mkdtemp
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import check_password_hash, generate_password_hash
from flask_restful import Api
from flask_jwt_extended import JWTManager
#from helpers import apology, login_required, lookup
from flask_login import LoginManager, login_user, current_user, logout_user, login_required
from flask_msearch import Search
from app.config import Config
from datetime import datetime, timezone
from flask_migrate import Migrate
from flask_uploads import configure_uploads
from flask_marshmallow import Marshmallow
from app.libs.image_helper import image_set
from flask_cors import CORS
from flask_socketio import SocketIO, emit



# Configure application

app = Flask(__name__)
CORS(app) 
api = Api(app)
app.config.from_object(Config)
db = SQLAlchemy(app)
ma = Marshmallow(app)
search = Search()
search.init_app(app)
jwt = JWTManager(app)
socketio = SocketIO(app)


login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view="login"
login_manager.needs_refresh_message_category = "danger"
login_manager.login_message = u"please login first"
migrate = Migrate(app, db)

# Create an application context
app_context = app.app_context()
app_context.push()

# fo upload configuration
configure_uploads(app, image_set)


'''with app.app_context():
    if db.engine.url.drivername == "sqlite":
        migrate.init_app(app, db, render_as_batch=True)
    else:
        migrate.init_app(app, db)'''





# Extend CSRF token lifetime (for testing, not recommended in production)
app.config['WTF_CSRF_TIME_LIMIT'] = 3600  # Set to a longer duration in seconds


# Configure session to use filesystem (instead of signed cookies) and setting secret key
app.config["SECRET_KEY"] = Config.SECRET_KEY 
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"

#database url
app.config["SQLALCHEMY_DATABASE_URI"] = Config.SQLALCHEMY_DATABASE_URI

#configuring session for app
Session(app)


# Make sure API key is set
"""if not os.environ.get("API_KEY"):
    raise RuntimeError("API_KEY not set")"""


@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

from app import route
'''from app.customer import route
from app.products import route
from app.message import route
from app.job import route
from app.schema import mode'''