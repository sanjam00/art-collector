from config import db

class ArtistReview(db.Model):
  __tablename__ = "artist_reviews"

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, nullable=False)
  description = db.Column(db.String)
  item_img = db.Column(db.String)
  reason_for_liking = db.Column(db.String)
  location_viewed = db.Column(db.String)
  # external_api_id = db.Column(db.String) add in later if incorporating ext api

  user_id = db.Column(db.Integer, db.ForeginKey('users.id'), nullable=False)

  user = db.relationship('User', back_populates='artist_reviews')

  # add join table relationship here

  def __repr__(self):
    return (f'<Artist Review{self.id}, '
            f'Name {self.name}, '
            f'Description "{self.description}", '
            f'Image {self.item_img}, '
            f'Reason for liking {self.reason_for_liking}, '
            f'Location viewed {self.location_viewed}>')



