from marshmallow import Schema, fields

class CollectionItemSchema(Schema):
  id = fields.Int()
  title = fields.Str()
  date_created = fields.Date()
  description = fields.Str()
  image = fields.Url()