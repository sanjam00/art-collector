# creating a review inside a collection in one shot

from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import request

from config import db
from models import Collection, ArtistReview, ArtistCollection 
from models.schemas.ArtistReviewSchema import ArtistReviewSchema

class CollectionArtistReviewCreate(Resource):

  @jwt_required()
  def post(self, collection_id):
    user_id = int(get_jwt_identity())

    collec = Collection.query.filter_by(id=collection_id, user_id=user_id).first()

    if not collec:
      return {'errors': ['Collection not found']}, 404

    request_json=request.get_json(silent=True) or {}
    if not request_json.get('title', '').strip():
      return {'errors': ['Title is required']}, 422

    review = ArtistReview(
      user_id=user_id,
      title=request_json.get('title'),
      artist = request_json.get('artist'),
      date_completed = request_json.get('date_completed'),
      description = request_json.get('description'),
      item_img = request_json.get('item_img'),
      reason_for_liking = request_json.get('reason_for_liking'),
      location_viewed = request_json.get('location_viewed')
    )

    db.session.add(review)
    db.session.flush() # "stages" the changes so review.id actually exists and can be used in the next line

    link = ArtistCollection(collection_id=collection_id, artist_review_id=review.id)
    db.session.add(link)

    db.session.commit()

    return ArtistReviewSchema().dump(review), 201