
from marshmallow import Schema, fields

class ArtworkCollectionSchema(Schema):
  id = fields.Int()
  artwork_review_id = fields.Int()
  collection_id = fields.Int()