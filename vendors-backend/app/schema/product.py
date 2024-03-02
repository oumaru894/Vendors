from app import ma
from app.model import Product
        
class ProductSchema(ma.SQLAlchemyAutoSchema):
    '''auto generate marshmallow for a model'''
    class Meta:
        model = Product
        many=True
        dump_only = ("id",)
        include_fk = True
        load_instane = True
        