from app.blueprints.users import users_bp
from .schemas import user_schema, users_schema, login_schema
from flask import request, jsonify
from sqlalchemy import select
from marshmallow import ValidationError
from app.models import Users, db
from app.extensions import limiter, cache
from app.utils.util import encode_token, token_required
from werkzeug.security import check_password_hash, generate_password_hash

@users_bp.route('/register', methods=['POST'])
@limiter.limit("3 per hour")
def register_user():
    try:
        data = user_schema.load(request.json)
    except ValidationError as e:
        return jsonfiy(e.messages), 400

    taken = db.session.query(Users).where(Users.email==data['email']).first()
    if taken:
        return jsonfiy({'message': 'email is taken'}), 400
    
    data['password'] = generate_password_hash(data['password'])

    new_user = Users(**data)
    db.session.add(new_user)
    db.session.commit()
    return user_schema.jsonify(new_user), 201

@users_bp.route('/login', methods=['POST'])
def login():
    try:
        credentials = login_schema.load(request.json)
    except KeyError:
        return jsonify({'messages': 'Invalid payload, expecting email and password'})
    
    query = select(Users).where(Users.email == credentials['email'])
    user = db.session.execute(query).scalar_one_or_none() # Query user table for a user with this username
    
    if user and check_password_hash(user.password, credentials['password']):
        auth_token = encode_token(user.id)
        
        response = {
            'status': 'success',
            'message': 'Successfully Logged in',
            'auth_token': auth_token,
            'user': user_schema.dump(user)
        }
        
        return jsonify(response), 200
    else:
        return jsonify({'messages': 'Invalid email or password'})

#Update a User
@users_bp.route('', methods=['PUT'])
@token_required
def update_user(user_id):
    user = db.session.get(Users, user_id) #Query for our user to update

    if not user: #Checking if I got a user
        return jsonify({"message": "user not found"}), 404  #if not return error message
    
    try:
        user_data = user_schema.load(request.json) #Validating updates
    except ValidationError as e:
        return jsonify({"message": e.messages}), 400
    
    user_data['password'] = generate_password_hash(user_data['password']) #resetting the password key's value, to the hash of the current value
    
    for key, value in user_data.items(): #Looping over attributes and values from user data dictionary
        setattr(user, key, value) # setting Object, Attribute, Value to replace

    db.session.commit()
    return user_schema.jsonify(user), 200