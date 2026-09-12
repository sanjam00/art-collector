from flask_restful import Resource
from flask_jwt_extended import get_jwt_identity, jwt_required
from flask import request
from sqlalchemy.exc import IntegrityError

from config import db
from models import User
from models.schemas.UserSchema import UserSchema

class WhoAmI(Resource):

  # return identity of user, only accessible if logged in
  @jwt_required()
  def get(self):
    user_id = int(get_jwt_identity())
    user = User.query.filter(User.id == user_id).first()

    return UserSchema().dump(user), 200

  # edit user information
  @jwt_required()
  def patch(self):
    user_id = int(get_jwt_identity())
    user = User.query.filter_by(id=user_id).first()

    if not user:
      return {'errors': ['User not found']}, 404

    request_json = request.get_json()

    if 'username' in request_json:
      user.username = request_json['username']
    if 'email' in request_json:
      user.email = request_json['email']
    if 'profile_img' in request_json:
      user.profile_img = request_json['profile_img']

    try:
      db.session.commit()
    except IntegrityError:
      db.session.rollback()
      return {'errors': ['That username or email is already taken']}, 422

    return UserSchema().dump(user), 200