from app import ma
from app.model import Transaction

class TransactionSchema(ma.SQLAlchemyAutoSchema):
    '''auto generate marshmallow for a model'''
    class Meta:
        model = Transaction
        dump_only = ("id",)
        include_fk = True
        load_instance = True