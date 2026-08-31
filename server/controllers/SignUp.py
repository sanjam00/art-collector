from flask import make_response, jsonify, request
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import create_access_token

from config import db
from models import User
from models.schemas.UserSchema import UserSchema

class SignUp(Resource):

  # create new users
  def post(self):
    request_json = request.get_json()

    username = request_json.get('username')
    email = request_json.get('email')
    password = request_json.get('password')

    # password confirmation
    password_confirmation = request_json.get('password_confirmation')
    if password != password_confirmation:
      return {'error': 'Passwords do not match'}, 400

    user = User(
      username = username,
      email = email
    )
    user.password_hash = password

    try:
      db.session.add(user)
      db.session.commit()
      access_token = create_access_token(identity=user.id)
      return make_response(jsonify(token=access_token, user=UserSchema().dump(user)), 200)
    except IntegrityError:
      db.session.rollback()

      username_exists = User.query.filter_by(username=username).first() is not None
      email_exists = User.query.filter_by(email=email).first() is not None

      if username_exists:
          return {'errors': ['Username is already taken']}, 422
      if email_exists:
          return {'errors': ['Email is already registered']}, 422

      return {'errors': ['User could not be created']}, 422