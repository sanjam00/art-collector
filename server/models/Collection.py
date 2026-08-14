
from config import db
from sqlalchemy.ext.associationproxy import association_proxy

class Collection(db.Model):
  __tablename__ = "collections"

  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String, nullable=False)
  collection_img = db.Column(db.String)
  description = db.Column(db.String)
  is_public = db.Column(db.Boolean, default=False, nullable=False)

  user_id = db.Column(db.Integer(), db.ForeignKey('users.id'), nullable=False)

  user = db.relationship('User', back_populates='collections')
  artwork_joins = db.relationship('ArtworkCollection', back_populates='collection', cascade='all, delete-orphan')
  artist_joins = db.relationship('ArtistCollection', back_populates='collection', cascade='all, delete-orphan')

  artwork_reviews = association_proxy('artwork_joins', 'artwork_review')
  artist_reviews = association_proxy('artist_joins', 'artist_review')

  def __repr__(self):
    return (f'<Collection {self.id}, '
            f'Title {self.title}, '
            f'Image {self.collection_img}, '
            f'Description "{self.description}", '
            f'Public? {self.is_public}>')