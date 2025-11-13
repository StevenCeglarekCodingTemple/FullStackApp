from datetime import date, datetime
from app.blueprints.meals import meals_bp
from .schemas import meal_schema, meals_schema
from flask import request, jsonify
from sqlalchemy import select
from marshmallow import ValidationError
from app.models import Meals, FoodItems, db
from app.extensions import limiter, cache
from app.utils.util import token_required

@meals_bp.route('', methods=['POST'])
@limiter.limit("30 per hour")
@token_required
def log_meal(user_id):
    try:
        data = meal_schema.load(request.json)
    except ValidationError as e:
        return jsonify(e.messages), 400

    new_meal = Meals(
            meal_category=data['meal_category'], 
            total_calories=0,
            create_date=datetime.now(),
            user_id=user_id)

    db.session.add(new_meal)
    db.session.commit()
    return meal_schema.jsonify(new_meal), 201

@meals_bp.route('/<int:meal_id>/<int:food_item_id>', methods=['POST'])
@token_required
def add_food_item_to_meal(user_id, meal_id, food_item_id):
    meal = db.session.get(Meals, meal_id)
    food_item = db.session.get(FoodItems, food_item_id)
    meal.food_items.append(food_item)
    meal.total_calories += food_item.calories
    db.session.commit()
    return jsonify({'message': f"Successfully added {food_item.name} to Meal"})

@meals_bp.route('/<int:meal_id>', methods=['GET'])
@token_required
def view_meal(user_id, meal_id):
    meal = db.session.get(Meals, meal_id)

    if not meal:
        return jsonify({"message": f"There is no Meal with id of {meal_id}"}), 404
    output = []
    for food_item in meal.food_items:
        meal_format = {
            "Food Item": food_item.name,
            "Calories": food_item.calories
        }
        output.append(meal_format)
    
    output.append({"Total Calories": meal.total_calories})
        
    return jsonify({"Food Category": meal.meal_category,
                    "FoodItems": output})

@meals_bp.route('/<int:meal_id>/<int:food_item_id>', methods=["DELETE"])
@token_required
def remove_food_item_from_meal(user_id, meal_id, food_item_id):
    meal = db.session.get(Meals, meal_id)
    food_item = db.session.get(FoodItems, food_item_id)
    meal.food_items.remove(food_item)
    meal.total_calories -= food_item.calories
    if len(meal.food_items) == 0:
        db.session.delete(meal)
    db.session.commit()
    return jsonify({'message': f"Successfully removed {food_item.name} from Meal"})