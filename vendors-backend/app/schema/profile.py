from app import ma
from app.model import UserProfile

class UserProfileSchema(ma.SQLAlchemyAutoSchema):
    '''auto generate marshmallow for a model'''
    class Meta:
        model = UserProfile
        dump_only = ("id",)
        load_instance = True