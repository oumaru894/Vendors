from app import ma
from app.model import User

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_only = ("password",)
        dumb_only = ("id",)
        load_instance = True
