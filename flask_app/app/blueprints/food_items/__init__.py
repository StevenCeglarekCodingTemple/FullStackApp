from flask import Blueprint

food_items_bp = Blueprint('food_items_bp', __name__)

from . import routes