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

  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

  user = db.relationship('User', back_populates='artist_reviews')

  collection_joins = db.relationship('ArtistCollection', back_populates='artist_review', cascade='all, delete-orphan')

  def __repr__(self):
    return (f'<Artist Review{self.id}, '
            f'Name {self.name}, '
            f'Description "{self.description}", '
            f'Image {self.item_img}, '
            f'Reason for liking {self.reason_for_liking}, '
            f'Location viewed {self.location_viewed}>')

# ~~ ArtistCollection join table ~~
class ArtistCollection(db.Model):
  __tablename__ = "artist_collection_join"

  id = db.Column(db.Integer, primary_key=True)
  artist_review_id = db.Column(db.Integer, db.ForeignKey('artist_reviews.id'), nullable=False)
  collection_id = db.Column(db.Integer, db.ForeignKey('collections.id'), nullable=False)

  artist_review = db.relationship('ArtistReview', back_populates='collection_joins') # connects to ArtistReview
  collection = db.relationship('Collection', back_populates='artist_joins') # connects to Collection

  # the combination of collection_id and artist_review_id must be unique across the whole table
  # (one review can't be in the same table twice)
  __table_args__ = (db.UniqueConstraint('collection_id', 'artist_review_id', name='uq_collection_artist'),)