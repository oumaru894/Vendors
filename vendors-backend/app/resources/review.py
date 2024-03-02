from datetime import datetime, timedelta
import json
from flask import request, jsonify
from flask_jwt_extended import (
    get_jwt,
    get_jwt_identity,
    jwt_required
)

from app.model import Review, User
from app.schema.review import ReviewSchema
from flask_restful import Resource
from app import db

review_schema = ReviewSchema()
review_list_schema = ReviewSchema(many=True)

class ReviewResources(Resource):
    '''handle http request from schema'''
    @classmethod
    def get(cls,product_id:int):
        reviews_with_username = db.session.query(Review, User.first_name, User.last_name).\
            join(User, Review.sender_id == User.id).\
            filter(Review.product_id == product_id).all()
        #print(reviews_with_username)
        if reviews_with_username:
            # Construct response data with review details and username
            response_data = [{
                'review_id': review.review_id,
                'sender_id': review.sender_id,
                'product_id': review.product_id,
                'content': review.content,
                'rating': review.rating,
                'date': review.date.strftime("%Y-%m-%d %H:%M:%S"),
                'username': first_name + last_name
            } for review, first_name,last_name in reviews_with_username]

            return response_data, 200
        return {"message": "No reviews available"}, 404

class ReviewUpdateResource(Resource):
    @classmethod
    def put(cls, _id: int):
        review_json = request.get_json()

        review = Review.find_by_id(_id)


        if review:
            review.content = review_json["content"]
            review.save_to_db()
        else:
            return {"message": "review not found"}, 404

        return review_schema.dump(review), 200

class ReviewDeleteResource(Resource):
    @classmethod
    def delete(cls, _id: int):
        review = Review.find_by_id(_id)
        if review:
            review.delete_from_db()
            return {"message": "review deleted."}
        return {"message": "review not found."}, 404
    

class AddReviewResources(Resource):
    @classmethod
    def post(cls):
        reviews = review_schema.load(request.get_json())
        if reviews:
            reviews.save_to_db()
            return {"message":"review added sucessfully"}
        


