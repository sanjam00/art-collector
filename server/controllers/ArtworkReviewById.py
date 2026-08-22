from flask_restful import Resource
from flask_jwt_extended import jwt_required

class ArtworkById(Resource):

  # get an artwork review by id
  @jwt_required()
  def get(self, artwork_review_id):
    pass

  # edit a review
  @jwt_required()
  def patch(self, artwork_review_id):
    pass

  # delete a review
  @jwt_required()
  def delete(self, artwork_review_id):
    pass