from datetime import date, datetime
from app.blueprints.food_items import food_items_bp
from .schemas import food_items_schema
from flask import request, jsonify
from sqlalchemy import select
from marshmallow import ValidationError
from app.models import FoodItems, db
from app.extensions import limiter, cache
from app.utils.util import token_required

@food_items_bp.route('', methods=['GET'])
@token_required
def get_all_food_items(user_id):
    try:
        page = int(request.args.get('page'))
        per_page = int(request.args.get('per_page'))
        query = select(FoodItems)
        food_items = db.paginate(query, page=page, per_page=per_page) # Handles out pagination
        return food_items_schema.jsonify(food_items), 200
    except: # Defaulting to our regular if they don't send a page or page number  
        food_items = db.session.query(FoodItems).all()
        print("Default")
        return food_items_schema.jsonify(food_items), 200
