from marshmallow import Schema, fields

class CollectionItemSchema(Schema):
  id = fields.Int()
  title = fields.Str()
  date_created = fields.Date()
  description = fields.Str()
  item_img = fields.Url()
  reason_for_liking = fields.Str()
  location_viewed = fields.Str()