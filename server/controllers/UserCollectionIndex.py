from flask_restful import Resource
from flask_jwt_extended import get_jwt_identity, jwt_required
from flask import request
from sqlalchemy.exc import IntegrityError

from config import db
from models import Collection
from models.schemas.CollectionSchema import CollectionSchema

class UserCollectionIndex(Resource):

  # get all trips
  @jwt_required()
  def get(self):
    user_id = int(get_jwt_identity())

    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    search = request.args.get('search', '', type=str)
    sort = request.args.get('sort', 'newest', type=str)

    query = Collection.query.filter(Collection.user_id == user_id)

    if search:
      query = query.filter(Collection.title.ilike(f'%{search}%'))

    if sort == 'oldest':
      query = query.order_by(Collection.id.asc())
    elif sort == 'title':
      query = query.order_by(Collection.title.asc())
    else:  # 'newest' default
      query = query.order_by(Collection.id.desc())

    pagination = query.paginate(page=page, per_page=per_page, error_out=False)
    collections = pagination.items

    return {
        'collections': CollectionSchema(many=True).dump(collections),
        'total_pages': pagination.pages,
        'current_page': page,
        'has_next': pagination.has_next,
        'has_prev': pagination.has_prev
    }, 200

  # add a new collection with only title- create-then-edit flow
  @jwt_required()
  def post(self):
    user_id = int(get_jwt_identity())
    request_json = request.get_json()

    title = request_json.get('title', '').strip() if request_json else ''
    if not title:
      return {'errors': ['Title is required']}, 422

    collec = Collection(
      user_id=user_id,
      title=title
    )

    try:
      db.session.add(collec)
      db.session.commit()
      return CollectionSchema().dump(collec), 201
    except IntegrityError:
      db.session.rollback()
      return {'errors': ['422 Unprocessable Entity']}, 422