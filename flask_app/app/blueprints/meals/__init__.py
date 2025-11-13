from flask import Blueprint

meals_bp = Blueprint('meals_bp', __name__)

from . import routes