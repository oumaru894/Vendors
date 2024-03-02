from app import ma
from app.model import Service

class ServiceSchema(ma.SQLAlchemyAutoSchema):
    '''auto generate marshmallow for a model'''
    class Meta:
        model = Service
        dump_only = ("id",)
        include_fk = True
        load_instane = True