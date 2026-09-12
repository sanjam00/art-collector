from config import db

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