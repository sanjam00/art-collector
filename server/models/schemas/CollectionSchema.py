from marshmallow import Schema, fields

from .CollectionItemSchema import CollectionItemSchema

class CollectionSchema(Schema):
  id = fields.Int()
  title = fields.Str()
  description = fields.Str()

  collection_items = fields.Nested(CollectionItemSchema, many=True)