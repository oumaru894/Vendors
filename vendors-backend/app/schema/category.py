from app.model import Category
from app import ma

class CategorySchema(ma.SQLAlchemyAutoSchema):
    '''generate a marshmallow for category model automatically'''
    class Meta:
        model = Category # generate marshmallow for this model
        dump_only = ("category_id",) # makes id read only
        load_instance = True
        