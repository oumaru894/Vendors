from datetime import datetime, timedelta
import json
from flask import request
from flask_jwt_extended import (
    get_jwt,
    get_jwt_identity,
    jwt_required
)
from app.schema.user import UserSchema
from app.model import User
from app.schema.message import MessageSchema
from flask_restful import Resource
from app import socketio
from flask_socketio import emit

message_schema = MessageSchema()



@socketio.on('message')
class MessageResource(Resource):
    '''handle http request from schema'''
    @classmethod
    def get(cls,):
        """ sender_username = data.get('username')
        message_content = data.get('message')

        sender = User.query.filter_by(username=sender_username).first()
        
        if not sender:
            return {"error": "User not found"}, 404
 """
    # Broadcast the message to all connected clients
        emit('message', {'username': "sender_username, 'message': message_content"}, broadcast=True)
        print("sender_username")

        return {"message:""user created successfully "}, 201 #success message
    
    @classmethod
    def get(cls, id:int):
        message_data = message_schema.load(request.get_json())
        
        message = message_data.find_by_id(id)
        if message:
            return message
        return {"message", "message not available"}
    
        

