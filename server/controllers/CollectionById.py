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
    # locate the collection using its id, making sure the user is verified
    collec = Collection.query.filter(Collection.id == collection_id, Collection.user_id == int(get_jwt_identity())).first()

    if not collec:
      return {'errors': '404 Collection not found'}, 404

    return CollectionSchema().dump(collec), 200

  # edit a collection
  @jwt_required()
  def patch(self, collection_id):
    collec = Collection.query.filter(Collection.id == collection_id, Collection.user_id == int(get_jwt_identity())).first()

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

    db.session.commit()

    return CollectionSchema().dump(collec), 200

  # delete a collection
  @jwt_required()
  def delete(self, collection_id):
    collec = Collection.query.filter(Collection.id == collection_id, Collection.user_id == int(get_jwt_identity())).first()

    if not collec:
      return {'errors': '404 Collection not found'}, 404

    db.session.delete(collec)
    db.session.commit()

    return {'200': 'Collection successfully deleted'}, 200