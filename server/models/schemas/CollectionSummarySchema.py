# used in home feed to display public collections

from marshmallow import Schema, fields

class CollectionSummarySchema(Schema):
  id = fields.Int()
  title = fields.Str()
  collection_img = fields.Url()
  description = fields.Str()
  is_public = fields.Bool()
  username = fields.Str(attribute='user.username', dump_only=True)