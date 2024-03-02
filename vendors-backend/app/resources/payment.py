from datetime import datetime, timedelta
import json
from flask import request
from flask_jwt_extended import (
    get_jwt,
    get_jwt_identity,
    jwt_required
)

from app.schema.payment import PaymentSchema
from flask_restful import Resource
from app.model import Payment

payment_schema = PaymentSchema()

class PaymentResource(Resource):
    '''handle http request from schema'''
    @classmethod
    def post(cls):
        payment = payment_schema.load(request.get_json()) #converting json from schema to python data
        payment.save_to_db() #saving to database
        return {"message":"payment created successfully "}, 201 #success message
    
    

class GetPaymentResource(Resource):
    @classmethod
    def get(cls, _id):
        payment = Payment.find_by_seller_id(_id)
        if payment:
            return payment_schema.dump(payment)
        return {"mesage":"No payment available"}
         

