
from config import db

class Collection(db.Model):
  __tablename__ = "collections"

  id = db.Column(db.Int, primary_key=True)
  title = db.Column(db.Str, nullable=False)
  collection_img = db.Column(db.Url)
  description = db.Column(db.Str)

  user_id = db.Column(db.Integer(), db.ForeignKey('users.id'), nullable=False)

  user = db.relationship('User', back_populates='collections')
  collection_items = db.relationship('CollectionItem', back_populates='collection')

  def __repr__(self):
    return f'<Collection {self.id}. Description: "{self.description}">'