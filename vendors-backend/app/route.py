from app import api
#from app.resources.brand import BrandResource
from app.resources.category import CategoryResource
#from app.resources.job import AddJobResource
#from app.resources.message import MessageResource
#from app.resources.brand import BrandResource
from app.resources.order import OrderResource
from app.resources.profile import ProffileResource
from app.resources.transaction import TransactionResource
from app.resources.product import AddProductResource, SingleProductResource,ProductView, SearchProduct, VendoersProductView, \
    CategoryProductView
from app.resources.user import UserRegisterResource, UserLogin, UserProfileResource, VendorRegistrationResource
from app.resources.image import Image, AvatarUpload, Avatar
from app.resources.review import ReviewResources,AddReviewResources,ReviewUpdateResource, ReviewDeleteResource
from app.resources.cart import CartResource, AddCartResourse, CartUpdateResource, CartDeleteResource
from app.resources.order import OrderResource, OrderDeleteResource, OrderUpdateResource, OrderAddResource
from app.resources.payment import PaymentResource, GetPaymentResource
from app.resources.favorite import AddFavoriteResourse,FavoriteDeleteResource, FavoriteResource,FavoriteUpdateResource






#product resource routes
api.add_resource(ProductView, '/product') #product route
api.add_resource(SearchProduct, '/search') #search route
api.add_resource(UserRegisterResource, '/register-user') #register user route
api.add_resource(UserLogin,'/login')
#api.add_resource(BrandResource, '/brand')
api.add_resource(AddProductResource, '/add-product')
api.add_resource(SingleProductResource, '/single-product/<int:id>')
api.add_resource(VendoersProductView, '/vendorsproduct/<int:id>')
api.add_resource(CategoryResource, '/category')
api.add_resource(Image, "/image/<string:filename>/<int:user_id>")
api.add_resource(ReviewResources, "/review/<int:product_id>")
api.add_resource(AddReviewResources, "/review-add")
api.add_resource(ReviewUpdateResource, "/review-update/<int:_id>")
api.add_resource(ReviewDeleteResource, "/review-delete/<int:_id>")
api.add_resource(AddCartResourse, "/cart-add")
api.add_resource(CartResource, "/cart/<int:_id>")
api.add_resource(CartUpdateResource, "/cart-update/<int:_id>")
api.add_resource(CartDeleteResource, "/cart-delete/<int:_id>")
api.add_resource(OrderResource, "/order/<int:_id>")
api.add_resource(OrderAddResource, "/order-add")
api.add_resource(OrderUpdateResource, "/order-update/<int:_id>")
api.add_resource(OrderDeleteResource, "/order-delete/<int:_id>")
api.add_resource(PaymentResource, "/add-payment")
api.add_resource(GetPaymentResource,"/payment/<int:_id>")
api.add_resource(Avatar,"/avatar/<int:user_id>")
api.add_resource(AvatarUpload,"/avatar-upload/<int:user_id>")
api.add_resource(UserProfileResource,"/vendor/<int:id>")
api.add_resource(AddFavoriteResourse,"/add-favorite")
api.add_resource(FavoriteResource,"/favorite/<int:_id>")
api.add_resource(FavoriteDeleteResource,"/delete-favorite/<int:_id>")
api.add_resource(FavoriteUpdateResource,"/update-favorite/<int:_id>")
api.add_resource(VendorRegistrationResource,"/vendor-register")
api.add_resource(CategoryProductView,"/category-products/<int:id>")
