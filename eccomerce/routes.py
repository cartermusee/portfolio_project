from eccomerce import app,db,bcrypt
from flask import jsonify,render_template,url_for, flash,redirect,request
from eccomerce.forms import LoginForm, RegistrationForm,UpdateAccountDetailsForm
from eccomerce.models import User,shorts,Shirts,Trousers
from flask_login import current_user,login_user,logout_user,login_required
import secrets
import os


@app.route('/')
@app.route("/home")
def home():
    shirts = Shirts.query.all()
    short=shorts.query.all()
    trousers=Trousers.query.all()
    
    return render_template('home.html',shirts=shirts,short=short,trousers=trousers)

@app.route("/register",methods=['GET','POST'])
def registration():
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    form = RegistrationForm()
    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(form.password.data)
        user = User(username=form.username.data,
                    email=form.email.data,
                    password=hashed_password)
        db.session.add(user)
        db.session.commit()
        return redirect(url_for('login'))
    return render_template('registration.html',form=form)

@app.route("/login",methods=['GET','POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    form = LoginForm()
    if form.validate_on_submit():
        user=User.query.filter_by(email=form.email.data).first()
        if user and bcrypt.check_password_hash(user.password, form.password.data):
            login_user(user,remember=form.remember_me.data)
            next_page=request.args.get('next')
            if next_page:
                return redirect(next_page)
            else:
                return redirect(url_for('home'))
        else:
            flash('Login failed! Email or Password entered is Incorrect','danger')
    return render_template('login.html',form=form)

@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('home'))

@app.route('/shop')
@login_required
def shop():
    return render_template('shop.html')

@app.route('/cart')
def cart():
    short = shorts.query.all()
    return render_template('cart.html',short=short)

# @app.route('/add-items', methods=["POST"])
# def additem():
#     return request.form['select_items']

def save_picture(form_profile):
    random_hex = secrets.token_hex(8)
    _, f_ext = os.path.splitext(form_profile.filename)
    picture_fn = random_hex + f_ext
    picture_path = os.path.join(app.root_path,'static/images', picture_fn)
    form_profile.save(picture_path)
    return picture_fn

@app.route('/account',methods=['GET','POST'])
def account():
    form = UpdateAccountDetailsForm()
    
    if form.validate_on_submit():
        if form.picture:
            picture_file = save_picture(form.picture.data)
            current_user.image_file = picture_file

        current_user.username = form.username.data
        current_user.email = form.email.data
        db.session.commit()
        flash("account has been updated",'success')
        return redirect(url_for('account'))
    elif request.method=='GET':
        form.username.data = current_user.username
        form.email.data = current_user.email
    image_file = url_for('static',filename='images/{}'.format(current_user.image_file))
    return render_template('account.html',image_file =image_file,form=form )


@app.route('/shirts',methods=['GET'])
def get_all_shirts():
    shirts = Shirts.query.all()
    shirts_data = []
    for shirt in shirts:
        shirts_data.append({
            'id':shirt.id,
            'shirt_name':shirt.shirt_name,
            'description':shirt.description,
            'price': shirt.price
        })
    return jsonify(shirts_data)

@app.route('/shirts/<int:shirt_id>',methods=['GET'])
def get_a_shirt(shirt_id):
    shirt = Shirts.query.get(shirt_id)
    
    if shirt:
        shirt_data = {
            'id':shirt.id,
            'shirt_name':shirt.shirt_name,
            'description':shirt.description,
            'price': shirt.price
        }
    return render_template('shirt.html',shirt_data=shirt_data) 

@app.route('/shorts/<int:short_id>',methods=['GET'])
def get_a_short(short_id):
    short = shorts.query.get(short_id)
    
    if short:
        short_data = {
            'id':short.id,
            'short_name':short.shorts_name,
            'description':short.description,
            'price': short.price,
            'img':short.img
        }
    return render_template('short.html',short_data=short_data) 