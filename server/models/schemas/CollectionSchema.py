from marshmallow import Schema, fields

from .ArtworkReviewSchema import ArtworkReviewSchema
from .ArtistReviewSchema import ArtistReviewSchema

class CollectionSchema(Schema):
  id = fields.Int()
  title = fields.Str()
  collection_img = fields.Url()
  description = fields.Str()
  is_public = fields.Bool()

  artwork_reviews = fields.Nested(ArtworkReviewSchema, many=True)
  artist_reviews = fields.Nested(ArtistReviewSchema, many=True)