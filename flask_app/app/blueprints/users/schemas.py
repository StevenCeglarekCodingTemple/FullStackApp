from app.extensions import ma
from app.models import Users

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Users

user_schema = UserSchema() 
users_schema = UserSchema(many=True) #Allows this schema to translate a list of User objects all at once
login_schema = UserSchema(exclude=['first_name', 'last_name', 'DOB', 'is_paid', 'create_date', 'weight', 'height', 'goal_weight', 'sex'])