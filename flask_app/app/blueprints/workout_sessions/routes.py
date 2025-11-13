from datetime import date, datetime
from app.blueprints.workout_sessions import workout_sessions_bp
from .schemas import workout_session_schema, workout_sessions_schema
from flask import request, jsonify
from sqlalchemy import select
from marshmallow import ValidationError
from app.models import WorkoutSessions, db
from app.extensions import limiter, cache
from app.utils.util import token_required

@workout_sessions_bp.route('', methods=['POST'])
@limiter.limit("10 per hour")
@token_required
def log_workout(user_id):
    try:
        data = workout_session_schema.load(request.json)
    except ValidationError as e:
        return jsonify(e.messages), 400

    print(data)
    new_workout = WorkoutSessions(
            name=data['name'], 
            duration=data["duration"],
            workout_type=data["workout_type"],
            calories_burned=data["calories_burned"],
            create_date=datetime.now(),
            user_id=user_id)

    db.session.add(new_workout)
    db.session.commit()
    return workout_session_schema.jsonify(new_workout), 201

@workout_sessions_bp.route('<int:workout_sessions_id>', methods=['GET'])
@token_required
def read_workout_session(user_id, workout_sessions_id):
    workout_session = db.session.get(WorkoutSessions, workout_sessions_id)
    return workout_session_schema.jsonify(workout_session), 200

@workout_sessions_bp.route('<int:workout_sessions_id>', methods=['DELETE'])
@token_required
def delete_workout_sessions(user_id, workout_sessions_id):
    workout_session = db.session.get(WorkoutSessions, workout_sessions_id)
    db.session.delete(workout_session)
    db.session.commit()
    return jsonify({"message": f"Successfully deleted workout session {workout_sessions_id}"}), 200
