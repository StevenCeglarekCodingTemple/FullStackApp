from flask import Blueprint

workout_sessions_bp = Blueprint('workout_sessions_bp', __name__)

from . import routes