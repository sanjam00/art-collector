from sqlalchemy.ext.hybrid import hybrid_property
from config import db

class User(db.Model):
  __tablename__ = "users"

  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String, nullable=False)
  email = db.Column(db.String, nullable=False)
  _password_hash = db.Column(db.String, nullable=False)

  collections = db.relationship("Collection", back_populates="user", cascade="all, delete-orphan")

