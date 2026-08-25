from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required

from models import Collection
from models.schemas.CollectionSummarySchema import CollectionSummarySchema

class CollectionFeed(Resource):

  # get other users collections, using collectionsummaryschema as not to fetch unnecessary data
  @jwt_required
  def get(self):
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)

    pagination = Collection.query.filter(
      Collection.is_public == True
    ).order_by(Collection.id.desc()).paginate(page=page, per_page=per_page, error_out=False)

    collecs = pagination.items

    return {
      'collections': CollectionSummarySchema(many=True).dump(collecs),
      'total_pages': pagination.items,
      'current_page': page,
      'has_next': pagination.has_next,
      'has_prev': pagination.has_prev
    }, 200