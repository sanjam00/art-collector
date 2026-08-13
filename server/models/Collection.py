
from config import db

class Collection(db.Model):
  __tablename__ = "collections"

  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String, nullable=False)
  collection_img = db.Column(db.String)
  description = db.Column(db.String)

  user_id = db.Column(db.Integer(), db.ForeignKey('users.id'), nullable=False)

  user = db.relationship('User', back_populates='collections')
  collection_items = db.relationship('CollectionItem', back_populates='collection', cascade="all, delete-orphan")

  def __repr__(self):
    return f'<Collection {self.id}. Description: "{self.description}">'