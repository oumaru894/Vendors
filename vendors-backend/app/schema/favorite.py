from app import ma
from app.model import Favorite

class FavoriteSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Favorite
        dump_only = ("id",)
        include_fk = True
        load_instance = True
        #include_relatioship=True