
from config import db

class CollectionItem(db.Model):
  __tablename__ = "collection_items"

  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String, nullable=False)
  date_created = db.Column(db.Date)
  description = db.Column(db.String)
  item_img = db.Column(db.String)
  reason_for_liking = db.Column(db.String)
  location_viewed = db.Column(db.String)

  collection_id = db.Column(db.Int(), db.ForeignKey('collections.id'), nullable=False)

  collection = db.relationship('Collection', back_populates="collection_items")

  def __repr__(self):
    return (f'<Collection Item {self.id}, '
            f'Title {self.title}, '
            f'Date Created {self.date_created}, '
            f'Description "{self.description}", '
            f'Image {self.item_img}, '
            f'Reason for liking {self.reason_for_liking}, '
            f'Location viewed {self.location_viewed}>')
