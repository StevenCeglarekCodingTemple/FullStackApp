from flask import Flask
from .models import db
from .extensions import ma, limiter, cache
from .blueprints.users import users_bp
from .blueprints.workout_sessions import workout_sessions_bp
from .blueprints.meals import meals_bp
from .blueprints.food_items import food_items_bp

def create_app(config_name):

    app = Flask(__name__)
    app.config.from_object(f'config.{config_name}')

    # Initialize extensions for our instance of app
    db.init_app(app)
    ma.init_app(app)
    limiter.init_app(app)
    cache.init_app(app)

    # Register Blueprints when created
    app.register_blueprint(users_bp, url_prefix='/users')
    app.register_blueprint(workout_sessions_bp, url_prefix='/workout_sessions')
    app.register_blueprint(meals_bp, url_prefix='/meals')
    app.register_blueprint(food_items_bp, url_prefix='/food_items')


    return app