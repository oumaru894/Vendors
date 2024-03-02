import os
import re
from typing import Union
from werkzeug.datastructures import FileStorage
from flask_uploads import UploadSet, IMAGES, configure_uploads


image_set = UploadSet('images', IMAGES) 
 


def save_image(image: FileStorage, folder: str = None, name: str = None) -> str:
    # takes filestorage and saves it go a folder
    return image_set.save(image, folder, name)


def get_path(filename: str = None, folder: str = None) -> str:
    # takes image name and folder and return full path
    return image_set.path(filename, folder)


def find_image_any_format(filename: str, folder: str) -> Union[str, None]:
    # takes a filename and returns an image on any of the accepted formats
    for _format in IMAGES:
        image = f"{filename}.{_format}."
        image_path = image_set.path(filename=image, folder=folder)
        if os.path.isfile(image_path):
            return image_path
    return None


def _retrieve_filename(file: Union[str, FileStorage]) -> str:
    # checks our regex and returns whether the string matches or not
    if isinstance(file, FileStorage):
        return file.filename
    return file


def is_filename_safe(file: Union[str, FileStorage]) -> bool:
    # returns full name of image in the path: get_basename('some/folder/image.jpg') returns image.jpg
    filename = _retrieve_filename(file)

    allowed_format = "|".join(IMAGES)
    regex = (
        f"^[a-zA-Z0-9][a-zA-Z0-9_()-\.]*\.({allowed_format})$"  # file name characters
    )
    return re.match(regex, filename) is not None


def get_basename(file: Union[str, FileStorage]) -> str:
    # returns full name of image in the path
    filename = _retrieve_filename(file)
    return os.path.split(filename)[1]


def get_extension(file: Union[str, FileStorage]) -> str:
    # returns file extension
    filename = _retrieve_filename(file)
    return os.path.splitext(filename)[1]