from app import ma
from app.model import Review

class ReviewSchema(ma.SQLAlchemyAutoSchema):
    '''auto generate marshmallow for a model'''
    class Meta:
        model = Review
        dump_only = ("review_id",)
        include_fk = True
        load_instance = True
        #include_relatioship=True
        