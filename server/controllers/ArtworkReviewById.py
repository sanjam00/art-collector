from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import request

from config import db
from models import ArtworkReview
from models.schemas.ArtworkReviewSchema import ArtworkReviewSchema

class ArtworkById(Resource):

  # get an artwork review by id
  @jwt_required()
  def get(self, artwork_review_id):
    user_id = int(get_jwt_identity())
    review = ArtworkReview.query.filter_by(id=artwork_review_id, user_id=user_id).first() # find review by id

    if not review:
      return {'errors': ['Review not found']}, 404

    return ArtworkReviewSchema().dump(review), 200

  # edit a review
  @jwt_required()
  def patch(self, artwork_review_id):
    user_id = int(get_jwt_identity())
    review = ArtworkReview.query.filter(ArtworkReview.id == artwork_review_id, ArtworkReview.user_id == user_id).first()

    if not review:
      return {'errors': ['Review not found']}, 404
  
    request_json = request.get_json()

    if 'title' in request_json:
      review.title = request_json['title']
    if 'artist' in request_json:
      review.artist = request_json['artist']
    if 'date_completed' in request_json:
      review.date_completed = request_json['date_completed']
    if 'description' in request_json:
      review.description = request_json['description']
    if 'item_img' in request_json:
      review.item_img = request_json['item_img']
    if 'reason_for_liking' in request_json:
      review.reason_for_liking = request_json['reason_for_liking']
    if 'location_viewed' in request_json:
      review.location_viewed = request_json['location_viewed']

    db.session.commit()

    return ArtworkReviewSchema().dump(review), 200

  # delete a review
  @jwt_required()
  def delete(self, artwork_review_id):
    user_id = int(get_jwt_identity())
    review = ArtworkReview.query.filter(ArtworkReview.id == artwork_review_id, ArtworkReview.user_id == user_id).first()

    if not review:
      return {'errors': ['Review not found']}, 404

    db.session.delete(review)
    db.session.commit()

    return {'message': 'Review successfully deleted'}, 200