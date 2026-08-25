from flask_restful import Resource
from flask_jwt_extended import get_jwt_identity, jwt_required
from flask import request
from sqlalchemy.exc import IntegrityError

from config import db
from models import Collection
from models.schemas.CollectionSchema import CollectionSchema

class CollectionById(Resource):

  # get by id
  # don't need to define many-to-many for GET bc it's already handled automatically
  @jwt_required()
  def get(self, collection_id):
    user_id = int(get_jwt_identity())
    collec = Collection.query.filter_by(id=collection_id).first() # locates collection by id

    if not collec:
      return {'errors': ['404 Collection not found']}, 404

    # allows access if it's their collection or if it's public, and denies when both cases are true
    if collec.user_id != user_id and not collec.is_public:
      return {'errors': ['404 Collection not found']}, 404  # 404 not 403, to avoid confirming private collections exist

    return CollectionSchema().dump(collec), 200

  # edit a collection
  @jwt_required()
  def patch(self, collection_id):
    # identify user, ensure they're editing only their own collections
    user_id = int(get_jwt_identity())
    collec = Collection.query.filter(Collection.id == collection_id, Collection.user_id == user_id).first()

    if not collec:
      return {'errors': '404 Collection not found'}, 404

    request_json = request.get_json()

    if 'title' in request_json:
      collec.title = request_json['title']
    if 'collection_img' in request_json:
      collec.collection_img = request_json['collection_img']
    if 'description' in request_json:
      collec.description = request_json['description']
    if 'is_public' in request_json:
      collec.is_public = request_json['is_public']
    # no username bc a user shouldn't be able to change who owns the collection 
    #   (at least not for the MVP)

    db.session.commit()

    return CollectionSchema().dump(collec), 200

  # delete a collection
  @jwt_required()
  def delete(self, collection_id):
    user_id = int(get_jwt_identity())
    collec = Collection.query.filter(Collection.id == collection_id, Collection.user_id == user_id).first()

    if not collec:
      return {'errors': '404 Collection not found'}, 404

    db.session.delete(collec)
    db.session.commit()

    return {'message': 'Collection successfully deleted'}, 200