from app import ma
from app.model import Payment

class PaymentSchema(ma.SQLAlchemyAutoSchema):
    '''auto generate marshmallow for a model'''
    class Meta:
        model = Payment
        dump_only = ("id",)
        include_fk = True
        load_instance = True