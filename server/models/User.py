from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt

class User(db.Model):
  __tablename__ = "users"

  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String, nullable=False)
  email = db.Column(db.String, nullable=False)
  _password_hash = db.Column(db.String, nullable=False)

  collections = db.relationship("Collection", back_populates="user", cascade="all, delete-orphan")

  # prevents the password hash from being viewed
  @hybrid_property
  def password_hash(self):
    raise AttributeError("Password hashes may not be viewed")

  # hashes the password
  @password_hash.setter
  def password_hash(self, password):
    password_hash = bcrypt.generate_password_hash(
      password.encode('utf-8')
    )
    self._password_hash = password_hash.decode('utf-8')

  # authenticates user by comparing password to stored password
  def authenticate(self, password):
    return bcrypt.check_password_hash(
      self._password_hash, password.encode('utf-8')
    )

  def __repr__(self):
    return f'<User {self.id}. Username: {self.username}. Email: {self.email}>'
