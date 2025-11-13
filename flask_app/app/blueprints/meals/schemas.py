from app.extensions import ma
from app.models import Meals

class MealSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Meals #Creates a schema that validates the data as defined by our Loans Model
        include_fk = True

meal_schema = MealSchema(exclude=['user_id', "total_calories", "create_date"]) 
meals_schema = MealSchema(many=True) #Allows this schema to translate a list of User objects all at once