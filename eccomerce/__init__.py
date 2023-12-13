# module for alll app  initialization

from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_cors import CORS
from flask_mail import Mail


app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)

login = LoginManager(app)
login.login_view = 'login'
login.login_message_category='info'
CORS(app)
app.config['MAIL_SERVER'] = 'smtp.googlemail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'eccomerce202@gmail.com'
app.config['MAIL_PASSWORD'] = 'zxap fybk qqgf ounq'
mail = Mail(app)


from eccomerce import routes,models
