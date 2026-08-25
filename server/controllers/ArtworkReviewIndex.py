from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import request

from config import db
from models import Collection, ArtworkReview
from models.schemas.ArtworkReviewSchema import ArtworkReviewSchema

class ArtworkIndex(Resource):

  # get all artwork reviews
  @jwt_required()
  def get(self, collection_id):
    user_id = int(get_jwt_identity())

    # pagination
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 15, type=int)

    # return reviews belonging to that user, same pattern as in collectionindex
    pagination = ArtworkReview.query.filter(
      ArtworkReview.user_id == user_id, Collection.id == collection_id
    ).order_by(ArtworkReview.id.desc()).paginate(page=page, per_page=per_page, error_out=False)

    reviews = pagination.items

    return {
      'reviews': ArtworkReviewSchema(many=True).dump(reviews),
      'total_pages': pagination.pages,
      'current_page': page,
      'has_next': pagination.has_next,
      'has_prev': pagination.has_prev
    }

  # create a new artwork review
  @jwt_required()
  def post(self):
    pass