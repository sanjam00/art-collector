from marshmallow import Schema, fields

class ArtworkReviewSchema(Schema):
  id = fields.Int()
  title = fields.Str()
  artist = fields.Str()
  date_completed = fields.Date()
  description = fields.Str()
  item_img = fields.Url()
  reason_for_liking = fields.Str()
  location_viewed = fields.Str()