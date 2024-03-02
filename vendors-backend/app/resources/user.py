from datetime import datetime, timedelta
import json
from flask_login import login_user, logout_user
from app.model import User, UserProfile
#from app.forms import CustomerRegistrationForm, CustomerLoginFrom
from flask import request
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    get_jwt,
    get_jwt_identity,
    jwt_required
)


from app.schema.user import UserSchema
from flask_restful import Resource

user_schema = UserSchema()

class UserRegisterResource(Resource):
    '''handle http request from schema'''
    @classmethod
    def post(cls):
        
        user = user_schema.load(request.get_json())
        
        if user:

            """ if user.find_by_username(user.username):
                return {"message": "A user with that username already exists."}, 400
             """
            if user.find_by_email(user.email):
                return {"message": "A user with that email already exists."}, 400
            
            user.set_password(user.password)

            user.save_to_db()
            return {"message":"user was created"}

        return {"message": "User not created"}, 500

class UserLogin(Resource):
    @classmethod
    def post(cls):
        
        user_data = user_schema.load(request.get_json())
        
        user = User.find_by_email(user_data.email)
        
        if user and user.check_password(user_data.password):
            access_token = create_access_token(identity=user.id)
            refresh_token = create_refresh_token(user.id)
            """ login_user(user) """
            
            return {
                "access_token":access_token,
                "refresh_token": refresh_token,
                "id": user.id,
                "email": user.email,
                "lastname": user.last_name,
                "firstname": user.first_name,
                "user_type": user.user_type
            }
        return {"message": "invalid user"}, 400


class UserProfileResource(Resource):
    @classmethod
    def get(cls, id):
        profile = User.find_by_id(id)
        
        if not profile:
            return {"message": "user not found"}, 404
        return user_schema.dump(profile), 200
    

class UserPasswordUpdateResource(Resource):
    @classmethod
    def put(cls):
        user_data = user_schema.load(request.get_json())

        user = User.find_by_email(user_data.email)

        if user: 
            user.set_password(user_data.password)
            user.save_to_db()
        else:
            return {"message": "user not found"}, 404
        return user_schema.dump(user), 200
    
class VendorRegistrationResource(Resource):
    @classmethod
    def put(cls):
        user_data = user_schema.load(request.get_json())

        user = User.find_by_email(user_data.email)
        print(user_data.user_type)
        if user and user.check_password(user_data.password): 
            user.user_type = "vendor"
            user.contact = user_data.contact
            
            user.save_to_db()
        else:
            return {"message": "user not found"}, 404
        return user_schema.dump(user), 200

