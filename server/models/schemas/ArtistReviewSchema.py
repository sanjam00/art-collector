
from marshmallow import Schema, fields

class ArtistReviewSchema(Schema):
  id = fields.Int()
  name = fields.Str()
  description = fields.Str()
  item_img = fields.Url()
  reason_for_liking = fields.Str()
  location_viewed = fields.Str()