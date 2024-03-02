from app import app, db, login_manager
from werkzeug.security import generate_password_hash, check_password_hash
from flask import flash, render_template, url_for, redirect, request, session
from flask_login import login_required, login_user, logout_user, current_user
import secrets
from app.schema.model import UserProfile


#customer registration
@app.route('/c_register', methods=['GET','POST'])
def customer_register():
    from app.forms import CustomerRegistrationForm
    from app.model import Register
    form = CustomerRegistrationForm()
    if form.validate_on_submit():
        hash_password =generate_password_hash(form.password.data)
        register = Register(name=form.name.data, username=form.username.data, email=form.email.data,password=hash_password,country=form.country.data, region=form.region.data,contact=form.contact.data, address=form.address.data)
        db.session.add(register)
        flash(f'Welcome {form.name.data} Thank you for registering', 'success')
        db.session.commit()
        next = request.args.get('next')
        return redirect(next,url_for('login'))
    return render_template('c_register.html', form=form)


#customer login
@app.route("/login", methods=["GET","post"])
def login():
    from app.forms import CustomerLoginFrom
    from app.model import Register
    form = CustomerLoginFrom()
    if form.validate_on_submit():
        user = Register.query.filter_by(email=form.email.data).first()
        if user and check_password_hash(user.password, form.password.data):
            login_user(user)
            flash('you are login now', 'success')
            next = request.args.get('next')
            return redirect(next, url_for("store"))
        flash("your email or password is incorrect","danger")
        return redirect(request.referrer)
    redirect(url_for("store"))
    return render_template("/login.html", form=form)

#customer logout
@app.route("/logout")
def log_out():
    from app.model import Register
    logout_user()
    return redirect(url_for("login"))



@app.route("/user_profile/<int:id>", methods=["POST","GET"])
def user_profile(id):
    if request.method=="GET":
        profile = UserProfile.query.get(id)
        return render_template("user_profile.html",profile=profile)

 

#only get orders but does not display 
@app.route('/get_order')
@login_required
def get_order():
    from app.model import Register
    from app.model import CustomerOrder
    if current_user.is_authenticated:
        customer_id = current_user.id
        invoice = secrets.token_hex(5)
        try:    
            order = CustomerOrder(invoice=invoice, customer_id=customer_id,orders=session["Carts"])
            db.session.add(order)
            db.session.commit()
            flash("your order has been sent", "success")
            session.pop("Carts")
            return redirect(url_for('orders',invoice=invoice))
        except Exception as e:
        
            print(e)
            flash("something went wrong while getting order", "danger")
            return redirect(url_for('get_cart'))
        
#displaying customer orders
@app.route('/order/<invoice>')
@login_required
def orders(invoice):
    from app.model import Register
    from app.model import CustomerOrder

    if current_user.is_authenticated:
        grandtotal = 0
        subtotal = 0
        customer_id = current_user.id
        customer_name= Register.query.filter_by(name=current_user.name).first()
        customer = Register.query.filter_by(id=customer_id).first()
        order = CustomerOrder.query.filter_by(customer_id=customer_id).first()
        for key, product in order.orders.items():
            subtotal += float(product['price']) * int(product['quantity'])
    else:
        return redirect(url_for('login'))
    return render_template("order.html", invoice=invoice,subtotal=subtotal, customer_name=customer_name, customer=customer, order=order)


