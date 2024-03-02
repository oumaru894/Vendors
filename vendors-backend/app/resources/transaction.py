from datetime import datetime, timedelta
import json
from flask import request
from flask_jwt_extended import (
    get_jwt,
    get_jwt_identity,
    jwt_required
)

from app.schema.transaction import TransactionSchema
from flask_restful import Resource

transaction_schema = TransactionSchema()

class TransactionResource(Resource):
    '''handle http request from schema'''
    @classmethod
    def post(cls):
        transaction = transaction_schema.load(request.get_json()) #converting json from schema to python data
        
        transaction.save_to_db() #saving to database
        
        return {"message:""user created successfully "}, 201 #success message

