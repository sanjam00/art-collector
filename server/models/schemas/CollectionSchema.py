from marshmallow import Schema, fields

from .CollectionItemSchema import CollectionItemSchema

class CollectionSchema(Schema):
  id = fields.Int()
  title = fields.Str()
  collection_img = fields.Url()
  description = fields.Str()
  is_public = fields.Bool()

  collection_items = fields.Nested(CollectionItemSchema, many=True)