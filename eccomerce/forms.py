from collections.abc import Mapping, Sequence
from typing import Any
from flask_wtf import FlaskForm
from wtforms import StringField,EmailField, PasswordField,ValidationError, BooleanField, SubmitField
from wtforms.validators import DataRequired,EqualTo
from eccomerce.models import User
from flask_login import current_user
from flask_wtf.file import FileField,FileAllowed


class RegistrationForm(FlaskForm):
    username = StringField("Username",validators=[DataRequired()])
    email = EmailField('Email',validators=[DataRequired()])
    password = PasswordField('Password',validators=[DataRequired()])
    confirm_password = PasswordField("Confirm Password",validators=[EqualTo('password')])
    submit = SubmitField("Create Account")

    def validate_username(self,username):
        user=User.query.filter_by(username=username.data).first()
        if user:
            raise ValidationError("Username already exists please pick another username")

    def validate_email(self,email):
        email=User.query.filter_by(email=email.data).first()
        if email:
            raise ValidationError("Email already exists pick another one")

class LoginForm(FlaskForm):
    email = EmailField('Email',validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    remember_me = BooleanField('Remember Me')
    submit = SubmitField('Login')


class UpdateAccountDetailsForm(FlaskForm):
    username = StringField("Username",validators=[DataRequired()])
    picture = FileField('Update Profile Picture',validators=[FileAllowed(['jpg','png'])])
    email = EmailField('Email',validators=[DataRequired()])
    submit = SubmitField("Update Account Details")

    def validate_username(self,username):
        if username.data != current_user.username:
            user=User.query.filter_by(username=username.data).first()
            if user:
                raise ValidationError("Username already exists please pick another username")

    def validate_email(self,email):
        if email.data != current_user.email:
            email=User.query.filter_by(email=email.data).first()
            if email:
                raise ValidationError("Email already exists pick another one")