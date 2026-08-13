
from random import choice, randint
from datetime import timedelta, time

from faker import Faker
from config import app, db
from models import User, Collection, CollectionItem

with app.app_context():

  print("Clearing database...")
  CollectionItem.query.delete()
  Collection.query.delete()
  User.query.delete()
  db.session.commit()

  print("Seeding database...")

  # create and initialize faker generator
  fake = Faker()

  
