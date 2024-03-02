from app import ma
from app.model import Order, OrderItem, ShippingAddress
from marshmallow import fields

class OrderItemSchema(ma.SQLAlchemyAutoSchema):
    price = fields.Decimal(as_string=True)
    class Meta:
        model = OrderItem
        
class ShippingAddressSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = ShippingAddress
        
        
class OrderSchema(ma.SQLAlchemyAutoSchema):
    items = ma.Nested(OrderItemSchema, many=True)
    shipping_address = ma.Nested(ShippingAddressSchema)
    
    total_price = fields.Decimal(as_string=True)
    class Meta:
        model = Order
        dump_only = ("order_id",)
        include_fk = True
        load_instance = True
        include_relationship = True
