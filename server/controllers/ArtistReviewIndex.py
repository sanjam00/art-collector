from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import request
from sqlalchemy.exc import IntegrityError

from config import db
from models import ArtistReview
from models.schemas.ArtistReviewSchema import ArtistReviewSchema

class ArtistReviewIndex(Resource):

  # get all of the current user's artist reviews (their full review library)
  @jwt_required()
  def get(self):
    user_id = int(get_jwt_identity())

    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 15, type=int)
    search = request.args.get('search', '', type=str)
    sort = request.args.get('sort', 'newest', type=str)

    query = ArtistReview.query.filter(ArtistReview.user_id == user_id)

    if search:
        query = query.filter(ArtistReview.name.ilike(f'%{search}%'))

    if sort == 'oldest':
        query = query.order_by(ArtistReview.id.asc())
    elif sort == 'name':
        query = query.order_by(ArtistReview.name.asc())
    else:  # 'newest' default
        query = query.order_by(ArtistReview.id.desc())

    pagination = query.paginate(page=page, per_page=per_page, error_out=False)
    reviews = pagination.items

    return {
        'reviews': ArtistReviewSchema(many=True).dump(reviews),
        'total_pages': pagination.pages,
        'current_page': page,
        'has_next': pagination.has_next,
        'has_prev': pagination.has_prev
    }, 200

  # create a new artist review
  @jwt_required()
  def post(self):
    user_id = int(get_jwt_identity())
    request_json = request.get_json()

    if not request_json.get('name', '').strip():
      return {'errors': ['Name is required']}, 422

    review = ArtistReview(
      user_id = user_id,
      name = request_json.get('name'),
      description = request_json.get('description'),
      item_img = request_json.get('item_img'),
      reason_for_liking = request_json.get('reason_for_liking'),
      location_viewed = request_json.get('location_viewed')
    )

    try:
      db.session.add(review)
      db.session.commit()
      return ArtistReviewSchema().dump(review), 201
    except IntegrityError:
      db.session.rollback()
      return {'errors': ['422 Unprocessable Entity']}, 422