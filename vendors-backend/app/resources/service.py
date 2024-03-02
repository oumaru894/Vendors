from datetime import datetime, timedelta
import json
from flask import request
from flask_jwt_extended import (
    get_jwt,
    get_jwt_identity,
    jwt_required
)

from app.schema.service import ServiceSchema
from flask_restful import Resource

service_schema = ServiceSchema()

class ServiceResource(Resource):
    '''handle http request from schema'''
    @classmethod
    def get(cls):
        service = service_schema.load(request.get_json()) #converting json from schema to python data
        
        service.save_to_db() #saving to database
        
        return {"message:""user created successfully "}, 201 #success message
    
    @classmethod
    def get(cls, id: int):
        service_data = service_schema.load(request.get_json())
        service = service_data.find_by_id(id)
        if service:
            return service
        return {"messsage", "service not available"}

