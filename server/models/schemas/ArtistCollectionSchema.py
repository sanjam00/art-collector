
from marshmallow import Schema, fields

class ArtistCollectionSchema(Schema):
  id = fields.Int()
  artist_review_id = fields.Int()
  collection_id = fields.Int()