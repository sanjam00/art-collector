from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy.exc import IntegrityError

from config import db
from models import Collection, ArtworkReview, ArtworkCollection
from models.schemas.CollectionSchema import CollectionSchema

class ArtworkCollectionLink(Resource):
  # attach or detach an *existing* review to or from a collection
  # does not create, edit, or delete a review outright, only the connection

  # add an artwork review to a collections, doesn't create the review itself
  @jwt_required()
  def post(self, collection_id, artwork_review_id):
    user_id = int(get_jwt_identity())

    # confirm the user owns both the collection and review before linking
    collec = Collection.query.filter_by(id=collection_id, user_id=user_id).first()
    review = ArtworkReview.query.filter_by(id=artwork_review_id, user_id=user_id).first()

    if not collec or not review:
      return {'errors': ['404 Collection or review not found']}, 404

    link = ArtworkCollection(collection_id=collection_id, artwork_review_id=artwork_review_id)

    try:
      db.session.add(link)
      db.session.commit()
    except IntegrityError:
      db.session.rollback()
      return {'errors': ['This review is already in that collection']}, 409

    return CollectionSchema().dump(collec), 201

  # remove an artwork review from a collection, doesn't delete the review itself
  @jwt_required()
  def delete(self, collection_id, artwork_review_id):
    user_id = int(get_jwt_identity())

    collec = Collection.query.filter_by(id=collection_id, user_id=user_id).first()

    if not collec:
      return {'errors': ['404 Collection not found']}, 404

    link = ArtworkCollection.query.filter_by(
      collection_id=collection_id, artwork_review_id=artwork_review_id
    ).first()

    if not link:
      return {'errors': ['404 That review is not in this collection']}, 404

    db.session.delete(link)
    db.session.commit()

    return CollectionSchema().dump(collec), 200