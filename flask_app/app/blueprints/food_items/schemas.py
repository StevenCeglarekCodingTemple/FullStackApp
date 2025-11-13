from app.extensions import ma
from app.models import FoodItems

class FoodItemSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = FoodItems

food_item_schema = FoodItemSchema() 
food_items_schema = FoodItemSchema(many=True)