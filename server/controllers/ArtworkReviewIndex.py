from flask_restful import Resource
from flask_jwt_extended import jwt_required

class ArtworkIndex(Resource):

  # get all artwork reviews
  @jwt_required()
  def get(self):
    pass

  # create a new artwork review
  @jwt_required()
  def post(self):
    pass