from app import ma
from app.model import Cart

class CartSchema(ma.SQLAlchemyAutoSchema):
    '''auto generate marshmallow for a model'''
    class Meta:
        model = Cart
        dump_only = ("cart_id",)
        include_fk = True
        load_instance = True
     