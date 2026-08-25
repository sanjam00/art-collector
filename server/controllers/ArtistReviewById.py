from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import request

from config import db
from models import ArtistReview
from models.schemas.ArtistReviewSchema import ArtistReviewSchema

class ArtistReviewById(Resource):

  # get an artist review by id
  @jwt_required()
  def get(self, artist_review_id):
    user_id = int(get_jwt_identity())
    review = ArtistReview.query.filter_by(id=artist_review_id, user_id=user_id).first() # find review by id

    if not review:
      return {'errors': ['Review not found']}, 404

    return ArtistReviewSchema().dump(review), 200

  # edit a review
  @jwt_required()
  def patch(self, artist_review_id):
    user_id = int(get_jwt_identity())
    review = ArtistReview.query.filter(ArtistReview.id == artist_review_id, ArtistReview.user_id == user_id).first()

    if not review:
      return {'errors': ['Review not found']}, 404
  
    request_json = request.get_json()

    if 'name' in request_json:
      review.title = request_json['name']
    if 'description' in request_json:
      review.description = request_json['description']
    if 'item_img' in request_json:
      review.item_img = request_json['item_img']
    if 'reason_for_liking' in request_json:
      review.reason_for_liking = request_json['reason_for_liking']
    if 'location_viewed' in request_json:
      review.location_viewed = request_json['location_viewed']

    db.session.commit()

    return ArtistReviewSchema().dump(review), 200

  # delete a review
  @jwt_required()
  def delete(self, artist_review_id):
    user_id = int(get_jwt_identity())
    review = ArtistReview.query.filter(ArtistReview.id == artist_review_id, ArtistReview.user_id == user_id).first()

    if not review:
      return {'errors': ['Review not found']}, 404

    db.session.delete(review)
    db.session.commit()

    return {'message': 'Review successfully deleted'}, 200