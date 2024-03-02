from datetime import datetime, timedelta
import json
from flask import request
from flask_jwt_extended import (
    get_jwt,
    get_jwt_identity,
    jwt_required
)

from app.schema.profile import UserProfile
from flask_restful import Resource

profile_schema = UserProfile()

class ProffileResource(Resource):
    '''handle http request from schema'''
    @classmethod
    def get(id):
        
        profile = profile_schema.load(request.get_json()) #converting json from schema to python data
        
        profile.save_to_db() #saving to database
        
        return {"message:""user created successfully "}, 201 #success message

