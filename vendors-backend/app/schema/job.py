from app import ma
from app.model import Job

class JobSchema(ma.SQLAlchemyAutoSchema):
    '''auto generate marshmallow for a model'''
    class Meta:
        model = Job
        dump_only = ("id",)
        include_fk = True
        load_instane = True