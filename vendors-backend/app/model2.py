
from datetime import datetime
from app import db, login_manager
from flask_login import UserMixin
import json
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import Column, ForeignKey, Integer, String, TIMESTAMP, Boolean

@login_manager.user_loader
def user_loader(user_id):
    return Register.query.get(user_id)

class Register(db.Model, UserMixin):
    #pip install marshmallow-sqlalchemy
    '''creating register table'''
    id=db.Column(db.Integer, primary_key= True)
    name = db.Column(db.String(50), unique= False)
    username = db.Column(db.String(50), unique= True)
    email = db.Column(db.String(50), unique= True)
    password = db.Column(db.String(200), unique= False)
    country = db.Column(db.String(50), unique= False)
    region = db.Column(db.String(50), unique= False)
    contact = db.Column(db.Integer, unique= False)
    address = db.Column(db.String(50), unique= False)
    profile = db.Column(db.String(200), unique= False, default='profile.jpg')
    date_created = db.Column(db.DateTime, nullable= False, default=datetime.utcnow)




    def __repr__(self):
        return '<Register %r>' % self.name


    
    def process_bind_param(self, value, dialect):
        #if value is empty return dict in quotation or generate text format
        if value is None:
            return '{}'
        else:#otherwise dump the json with is this value or degenerate text format
            return json.dumps(value)
    
    def process_result_value(self,value, dialect):
        if value is None:
            return {}
        else:
            return json.loads(value)
        


class CustomerOrder(db.Model):
    id=db.Column(db.Integer, primary_key= True)
    invoice=db.Column(db.String(20), unique= True, nullable= False)
    status=db.Column(db.String(20), default='pending', nullable= False)
    customer_id=db.Column(db.Integer, ForeignKey("user.id"), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    orders=db.Column(db.String(500))
    
    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()
        
    @classmethod
    def find_by_id(cls, _id: int) -> "CustomerOrder":
        return cls.query.filter_by(id=_id).first()
    
    @classmethod
    def find_by_customer_id(cls, customer_id: int) -> "CustomerOrder":
        return cls.query.filter_by(customer_id=customer_id).first()
    

class User(db.Model):
    '''creating database table for user'''
    __tablename__= 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True)
    email = db.Column(db.String(50), unique=True)
    password = db.Column(db.String(200), unique=False)
    user_type = db.Column(db.String(50), nullable=True, default='client')
    first_name = db.Column(db.String(50), unique= False)
    last_name = db.Column(db.String(50), unique= False)
    country = db.Column(db.String(50), unique= False)
    region = db.Column(db.String(50), unique= False)
    contact = db.Column(db.Integer, unique= False)
    address = db.Column(db.String(50), unique= False)
    profile = db.Column(db.String(200), unique= False, default='profile.jpg')
    cover_pic = db.Column(db.String(50), unique= False,  default='profile.jpg')
    date_created = db.Column(db.DateTime, nullable= False, default=datetime.utcnow)
    
    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()

    def set_password(self, password: str):
        self.password = generate_password_hash(password)

    def check_password(self, password: str):
        return check_password_hash(self.password, password)
    
    @classmethod
    def find_by_id(cls, _id: int) -> "User":
        return cls.query.filter_by(id=_id).first()
    
    @classmethod
    def find_by_username(cls, username: str) -> "User":
        return cls.query.filter_by(username=username).first()
    
    @classmethod
    def find_by_email(cls, email: str) -> "User":
        return cls.query.filter_by(email=email).first()

    
class Product(db.Model):
    '''creating table for user'''
    __tablename__ = 'product'
    id = db.Column(db.Integer, primary_key=True)
    seller_id = db.Column(db.Integer, ForeignKey('user.id'))
    product_name =db.Column(db.String(50), nullable=True)
    desc = db.Column(db.String(500))
    quantity = db.Column(db.Integer, nullable=True)
    price = db.Column(db.Integer, nullable=True) 
    image_1 = db.Column(db.String(500),)
    image_2 = db.Column(db.String(500),)
    image_3 = db.Column(db.String(500),)
    category = db.Column(db.Integer, ForeignKey('category.category_id'))
    brand = db.Column(db.Integer, ForeignKey('brand.id'))
    review_id = db.column(db.Integer, ForeignKey('review.review_id'))
    availability_status = db.Column(db.Boolean(), nullable=True)
    discount = db.Column(db.Integer)
    colors = db.Column(db.String(300))
    brand = db.Column(db.String(50))
    
    
    
    date = db.Column(db.DateTime, default=datetime.utcnow)

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()
        
    @classmethod
    def find_by_id(cls, _id: int) -> "Product":
        return cls.query.filter_by(id=_id).first()
    
    @classmethod
    def find_by_seller_id(cls, seller_id: int) -> "Product":
        return cls.query.filter_by(seller_id=seller_id).all()
    
    
class Job(db.Model):
    '''Creating Job table'''
    __tablename__ = 'job'
    id = db.Column(db.Integer, primary_key=True)
    employer_id= db.Column(db.Integer, ForeignKey('user.id'))
    job_title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(500))
    location = db.Column(db.String(150), nullable=False)
    salary = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    
    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()
        
    @classmethod
    def find_by_id(cls, _id: int) -> "Job":
        return cls.query.filter_by(id=_id).first()
    
    @classmethod
    def find_by_jobtitle(cls, title: str) -> "Job":
        return cls.query.filter_by(title=title).first()
    
    @classmethod
    def find_by_seller_id(cls, seller_id: int) -> "Job": 
        return cls.query.filter_by(seller_id=seller_id).first()
    
class Service(db.Model):
    '''Creating table for service'''
    __tablename__ = 'service'
    id = db.Column(db.Integer, primary_key=True)
    provider_id = db.Column(db.Integer, ForeignKey('user.id'))
    Service_title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    category = db.Column(db.String(50))
    price  = db.Column(db.Integer, nullable=False)
    availability_status = db.Column(db.String(50), nullable=False)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    
    
    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()
        
    @classmethod
    def find_by_id(cls, _id: int) -> "Service":
        return cls.query.filter_by(id=_id).first()
    
    @classmethod
    def find_by_seller_id(cls, provider_id: int) -> "Service":
        return cls.query.filter_by(provider_id=provider_id).first()
    

class Transaction(db.Model):
    '''Creating table for transaction'''
    __tablename__ = 'transaction'
    id = db.Column(db.Integer, primary_key=True)
    buyer_id = db.Column(db.Integer, ForeignKey('user.id'))
    seller_id = db.Column(db.Integer, ForeignKey('user.id'))
    transaction_type =db.Column(db.Integer, ForeignKey('user.id'))
    transaction_amount = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    
    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()
        
    @classmethod
    def find_by_id(cls, _id: int) -> "Transaction":
        return cls.query.filter_by(id=_id).first()
    
    @classmethod
    def find_by_seller_id(cls, seller_id: int) -> "Transaction":
        return cls.query.filter_by(seller_id=seller_id).first()
    
    @classmethod
    def find_by_buyer_id(cls, buyer_id: int) -> "Transaction":
        return cls.query.filter_by(buyer_id=buyer_id).first()
    

    
class Brand(db.Model):
    '''creatig table for breands'''
    __tablename__ ='brand'
    
    id = db.Column(db.Integer, primary_key=True)
    brand_name = db.Column(db.String(50), nullable=False)
    
    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()
        
    @classmethod
    def find_by_id(cls, _id: int) -> "Brand":
        return cls.query.filter_by(id=_id).first()
    
    @classmethod
    def find_by_brandname(cls, name: str) ->"Brand":
        return cls.query.filter_by(brand_name=name).first()
    
    
    
class UserProfile(db.Model):
    '''creating table for user profile'''
    __tablename__ = 'profile'
    profile_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('user.id'))
    profile_pic = db.Column(db.String(50))
    bio = db.Column(db.String(500))
    cover_pic = db.Column(db.String(50))
    contact_info = db.Column(db.String(200))
    
    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()
        
    @classmethod
    def find_by_id(cls, _id: int) -> "UserProfile":
        return cls.query.filter_by(id=_id).first()
    
    @classmethod
    def find_by_user_id(cls, _id:int) -> "UserProfile":
        return cls.query.filter_by(profile_id=_id).first()
    
class Message(db.Model):
    '''Creeating table for messages'''
    __tablename__ = 'message'
    message_id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, ForeignKey('user.id'))
    receiver_id = db.Column(db.Integer, ForeignKey('user.id'))
    content = db.Column(db.String(1000))
    date = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    
    
    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()
        
    @classmethod
    def find_by_id(cls, _id: int) -> "Message":
        return cls.query.filter_by(message_id=_id).first()
    
    @classmethod
    def find_by_sender_id(cls, sender_id: int) -> "Message":
        return cls.query.filter_by(sender_id=sender_id).first()
    
    @classmethod
    def find_by_receiver_id(cls, receiver_id: int) -> "Message":
        return cls.query.filter_by(receiver_id=receiver_id).first()
    

class Review(db.Model):
    '''Creeating table for messages'''
    __tablename__ = 'review'
    review_id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, ForeignKey('user.id'))
    product_id = db.Column(db.Integer, ForeignKey('product.id'))
    content = db.Column(db.Text)
    rating= db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    
    
    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()
        
    @classmethod
    def find_by_id(cls, _id: int) -> "Message":
        return cls.query.filter_by(message_id=_id).first()
    
    @classmethod
    def find_by_sender_id(cls, sender_id: int) -> "Message":
        return cls.query.filter_by(sender_id=sender_id).first()
    
    @classmethod
    def find_by_procduct_id(cls, product_id: int) -> "Message":
        return cls.query.filter_by(product_id=product_id).first()


    
class Category(db.Model):
    '''Creating category table'''
    __tablename__ = 'category'
    category_id = db.Column(db.Integer, primary_key=True)
    category_name = db.Column(db.String(50), nullable=False, unique=True)
    #uri = db.Column(db.String(50))
    
    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()
        
    @classmethod
    def find_by_id(cls, _id: int) -> "Category":
        return cls.query.filter_by(id=_id).first()


'''class Cart(db.Model):
    ''''''Creating category table''''''
    __tablename__ = 'cart'
    
    '''
    

