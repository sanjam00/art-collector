
from config import db

class CollectionItem(db.Model):
  __tablename__ = "collection_items"

  id = db.Column(db.Int, primary_key=True)
  title = db.Column(db.Str, nullable=False)
  date_created = db.Column(db.Date)
  description = db.Column(db.String)
  image = db.Column(db.Url)
  reason_for_liking = db.Column(db.Str)
  location_viewed = db.Column(db.Str, nullable=False)

  collection_id = db.Column(db.Int(), db.ForeignKey('collections.id'), nullable=False)

  collection = db.relationship('Collection', back_populates="collection_items")

  def __repr__(self):
    return (f'<Collection Item {self.id}, '
            f'Title {self.title}, '
            f'Date Created {self.date_created}, '
            f'Description "{self.description}", '
            f'Image {self.image}, '
            f'Reason for liking {self.reason_for_liking}, '
            f'Location viewed {self.location_viewed}>')
