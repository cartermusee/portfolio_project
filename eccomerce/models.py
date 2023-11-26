from eccomerce import db
from flask_login import UserMixin
from eccomerce import login

@login.user_loader
def load_user(id):
    return User.query.get(int(id))

class User(db.Model,UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64),index=True,unique=True)
    email = db.Column(db.String(124),index=True,unique=True)
    image_file = db.Column(db.String(20), nullable=False, default="default.jpg")
    password = db.Column(db.String(128))
    


class Trousers(db.Model,UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    trousers_name = db.Column(db.String(64),index=True)
    description = db.Column(db.String(124),index=True)
    price = db.Column(db.Integer)

class shorts(db.Model,UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    shorts_name = db.Column(db.String(64),index=True)
    description = db.Column(db.String(124),index=True)
    price = db.Column(db.Integer)
    quantity = db.Column(db.Integer)
    img = db.Column(db.String(255))


class Shirts(db.Model,UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    shirt_name = db.Column(db.String(64),index=True)
    description = db.Column(db.String(124),index=True)
    price = db.Column(db.Integer)

class Order(db.Model,UserMixin):
    id = db.Column(db.Integer, primary_key=True)
