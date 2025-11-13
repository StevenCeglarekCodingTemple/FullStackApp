from app.extensions import ma
from app.models import WorkoutSessions

class WorkoutSessionSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = WorkoutSessions #Creates a schema that validates the data as defined by our Loans Model
        include_fk = True

workout_session_schema = WorkoutSessionSchema(exclude=['user_id']) 
workout_sessions_schema = WorkoutSessionSchema(many=True) #Allows this schema to translate a list of User objects all at once