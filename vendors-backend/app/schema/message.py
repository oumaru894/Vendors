from app import ma
from app.model import Message

class MessageSchema(ma.SQLAlchemyAutoSchema):
    '''auto generate marshmallow for a model'''
    class Meta:
        model = Message
        load_only = ("content",)
        dump_only = ("id",)
        include_fk = True
        load_instane = True