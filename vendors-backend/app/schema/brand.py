from app import ma
from app.model import Brand

class BrandSchema(ma.SQLAlchemyAutoSchema):
    '''auto generate marshmallow for a model'''
    class Meta:
        model = Brand
        dump_only = ("id",)
        load_instance = True