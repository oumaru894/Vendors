from flask_restful import Resource
from flask_uploads import UploadNotAllowed
from flask import send_file, request
from flask_jwt_extended import jwt_required, get_jwt_identity
import traceback
import os

from app.libs import image_helper
from app.libs.strings import gettext
from app.schema.image import ImageSchema

image_schema = ImageSchema()


class ImageUpload(Resource):
    @classmethod
    # @jwt_required()
    def post(cls, user_id: int):
        data = image_schema.load(request.files)
        folder = f"user_{user_id}"
        try:
            image_path = image_helper.save_image(data["image"], folder=folder)
            basename = image_helper.get_basename(image_path)
            return {"message": gettext("image_uploaded").format(basename)}, 201
        except UploadNotAllowed:
            extenstion = image_helper.get_extension(data["image"])
            return {
                "message": gettext("image_illegal_extension").format(extenstion)
            }, 400


class Image(Resource):
    @classmethod
    # @jwt_required()
    def get(cls, filename: str, user_id: int):
        # returns the requested image if it exists; looks inside loggedin user's folder
        folder = f"product_{user_id}"
        if not image_helper.is_filename_safe(filename):
            return {"message": gettext("image_illegal_file_name").format(filename)}, 400
        try:
            return send_file("../" + image_helper.get_path(filename, folder=folder))
        except FileNotFoundError:
            return {"message": gettext("image_not_found").format(filename)}, 404

    @classmethod
    # @jwt_required()
    def delete(cls, filename: str, user_id: int):
        # user_id = get_jwt_identity()
        folder = f"user_{user_id}"
        if not image_helper.is_filename_safe(filename):
            return {"message": gettext("image_illegal_file_name").format(filename)}, 400
        try:
            res = os.remove(image_helper.get_path(filename, folder=folder))
            print(res)
            return {"message": gettext("image_deleted").format(filename)}
        except FileNotFoundError:
            return {"message": gettext("image_not_found").format(filename)}, 404
        except:
            traceback.print_exc()
            return {"message": gettext("image_delete_failed")}, 500


class AvatarUpload(Resource):
    # @jwt_required()
    def put(cls, user_id: int):
        # endpoint used to upload user avaters; named after user's ID.
        # new one overrides old one
        print(request.files)
        data = image_schema.load(request.files)
        filename = f"user_{user_id}"
        folder = "avatar"
        
        avatar_path = image_helper.find_image_any_format(filename, folder)
        if avatar_path:
            try:
                os.remove(avatar_path)
            except:
                return {"message": gettext("avatar_delete_failed")}, 500
        try:
            ext = image_helper.get_extension(data["image"].filename)
            avatar = filename + ext
            avatar_path = image_helper.save_image(
                data["image"], folder=folder, name=avatar
            )
            basename = image_helper.get_basename(avatar_path)
            return {"message": gettext("avatar_uploaded").format(basename)}, 200
        except UploadNotAllowed:
            extension = image_helper.get_extension(data["image"])
            return {
                "message": gettext("image_illegal_extension").format(extension)
            }, 400


class Avatar(Resource):
    @classmethod
    def get(cls, user_id: int):
        folder = "avatar"
        filename = f"user_{user_id}"
        avatar = image_helper.find_image_any_format(filename, folder)
        if avatar:
            print(send_file(
                "../" + avatar,
                mimetype="image/jpeg",
                #as_attachment=True,
                ))
            return send_file(
                "../" + avatar,
                mimetype="image/jpeg",
                as_attachment=True,
                #achment_filename=filename,
          
            )
        default = image_helper.find_image_any_format("default", "defaultUser")
        return send_file(
                "../" + default,
                mimetype="image/jpeg",
                as_attachment=True,
                #achment_filename=filename,
        )