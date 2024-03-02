from datetime import datetime, timedelta
import json
from flask import request
from sqlalchemy.orm import joinedload
from sqlalchemy import desc
from flask_jwt_extended import (
    get_jwt,
    get_jwt_identity,
    jwt_required
)

from app.model import Order, OrderItem, ShippingAddress
from app.schema.order import OrderSchema
from flask_restful import Resource

order_schema = OrderSchema()
order_list_schema = OrderSchema(many=True)

class OrderAddResource(Resource):
    @classmethod
    def post(cls):
        order_data = request.get_json()

        # Extract order details
        client_id = order_data['client_id']
        invoice = order_data['invoice']
        total_price = order_data['total_price']
        items = order_data['items']  # List of item details
        shipping_address = order_data['shipping_address']  # Shipping address details

        if shipping_address['street'] and shipping_address['city'] and shipping_address['state'] and shipping_address['zip_code'] and shipping_address['country']:
            
            # Create a new Order instance
            new_order = Order(
                client_id=client_id,
                invoice=invoice,
                total_price=total_price,  
            )
            
            # getting individual items
            for item in items:
                new_item = OrderItem(
                product_id=item['product_id'],
                quantity=item['quantity'],
                vendor_id=item['vendor_id'],
                price=item['price'],
                product_name=item['product_name'],
                image_url=item['image_url'],
                cart_id=item['cart_id']
            )
                new_order.items.append(new_item)
                
                
            # Adding shipping address to the order
            new_shipping_address = ShippingAddress(
                street=shipping_address['street'],
                city=shipping_address['city'],
                state=shipping_address['state'],
                zip_code=shipping_address['zip_code'],
                country=shipping_address['country']
        )
            new_order.shipping_address = new_shipping_address

            try:
                new_order.save_to_db()
                return {'message': 'Order created successfully'}, 201
            except Exception as e:
            
                return {'error': str(e)}, 500
        return{"message":"no data for items of shipping address"},500
      
class OrderResource(Resource):
    @classmethod
    def get(cls, _id: int):
        order = Order.find_by_client_id(_id)
        if order:
            # Eagerly load the order items and shipping address
            order_with_items_and_address = Order.query.options(joinedload(Order.items), joinedload(Order.shipping_address)).filter_by(client_id=_id).order_by(desc(Order.order_date)).first()
            #print("check",order_with_items_and_address.items)
            if order_with_items_and_address:
                order_data = order_schema.dump(order_with_items_and_address)
                items_data = order_data["items"]
                for item_data in items_data:
                    item = OrderItem.find_by_id(item_data["id"])
                    item_data["product_id"] = item.product_id
                    item_data["vendor_id"] = item.vendor_id
                return order_data
        return {"message": "no order available"}, 400
    
class OrderUpdateResource(Resource):
    @classmethod
    def put(cls, _id):
        order_json = request.get_json()
        order = Order.find_by_id(_id)
        if order:
            order.status = order_json["status"]
            order.save_to_db()
            return {"message":"order updated."}
        else:
            return {"message":"order not available."}
    
class OrderDeleteResource(Resource):
    @classmethod
    def delete(cls,_id:int):
        order = Order.find_by_id(_id)
        if order:
            order.delete_from_db()
            return {"message": "order deleted."}
        return {"message": "order not found."}, 404

