#!/usr/bin/env python3
"""
seed.py

Populates the database with fake users, collections, artist reviews,
artwork reviews, and the join-table links between reviews and collections.

Usage:
  python seed.py
"""

import random
from faker import Faker

from config import app, db
from models.User import User
from models.Collection import Collection
from models.ArtistReview import ArtistReview
from models.ArtistCollection import ArtistCollection
from models.ArtworkReview import ArtworkReview
from models.ArtworkCollection import ArtworkCollection

fake = Faker()

# ---- tunable amounts ----
NUM_USERS = 8
COLLECTIONS_PER_USER = (2, 4)       # min, max
ARTIST_REVIEWS_PER_USER = (3, 6)
ARTWORK_REVIEWS_PER_USER = (4, 8)
LINKS_PER_COLLECTION = (1, 4)        # how many reviews to file into each collection

def make_users():
  users = []
  for _ in range(NUM_USERS):
    user = User(
      username=fake.unique.user_name(),
      email=fake.unique.email(),
    )
    # go through the setter so it actually gets hashed
    user.password_hash = "password123"
    users.append(user)

  db.session.add_all(users)
  db.session.commit()
  return users

def make_collections(users):
  collections = []
  for user in users:
    for _ in range(random.randint(*COLLECTIONS_PER_USER)):
      collection = Collection(
        title=fake.sentence(nb_words=3).rstrip("."),
        collection_img=fake.image_url(),
        description=fake.paragraph(nb_sentences=3),
        is_public=random.choice([True, True, False]),  # skew toward public
        user_id=user.id,
      )
      collections.append(collection)

  db.session.add_all(collections)
  db.session.commit()
  return collections

def make_artist_reviews(users):
  reviews = []
  for user in users:
    for _ in range(random.randint(*ARTIST_REVIEWS_PER_USER)):
      review = ArtistReview(
        name=fake.name(),
        description=fake.paragraph(nb_sentences=4),
        item_img=fake.image_url(),
        reason_for_liking=fake.paragraph(nb_sentences=2),
        location_viewed=f"{fake.city()} {random.choice(['Museum', 'Gallery', 'Art Fair'])}",
        user_id=user.id,
      )
      reviews.append(review)

  db.session.add_all(reviews)
  db.session.commit()
  return reviews

def make_artwork_reviews(users):
  reviews = []
  for user in users:
    for _ in range(random.randint(*ARTWORK_REVIEWS_PER_USER)):
      review = ArtworkReview(
        title=fake.sentence(nb_words=4).rstrip("."),
        artist=fake.name(),
        date_completed=fake.date_between(start_date="-200y", end_date="today"),
        description=fake.paragraph(nb_sentences=4),
        item_img=fake.image_url(),
        reason_for_liking=fake.paragraph(nb_sentences=2),
        location_viewed=f"{fake.city()} {random.choice(['Museum', 'Gallery', 'Art Fair'])}",
        user_id=user.id,
      )
      reviews.append(review)

  db.session.add_all(reviews)
  db.session.commit()
  return reviews

def link_reviews_to_collections(collections, artist_reviews, artwork_reviews):
  """
  Randomly files reviews into collections belonging to the SAME user,
  since a user shouldn't be adding their reviews to someone else's
  collection. Respects the unique (collection_id, review_id) constraint
  by tracking pairs we've already used.
  """
  artist_links = []
  artwork_links = []

  used_artist_pairs = set()
  used_artwork_pairs = set()

  # group reviews by owning user for quick lookup
  artist_reviews_by_user = {}
  for r in artist_reviews:
    artist_reviews_by_user.setdefault(r.user_id, []).append(r)

  artwork_reviews_by_user = {}
  for r in artwork_reviews:
    artwork_reviews_by_user.setdefault(r.user_id, []).append(r)

  for collection in collections:
    owner_artist_reviews = artist_reviews_by_user.get(collection.user_id, [])
    owner_artwork_reviews = artwork_reviews_by_user.get(collection.user_id, [])

    # mix of artist and artwork reviews per collection
    num_links = random.randint(*LINKS_PER_COLLECTION)

    if owner_artist_reviews:
      for review in random.sample(
        owner_artist_reviews, k=min(num_links, len(owner_artist_reviews))
      ):
        pair = (collection.id, review.id)
        if pair not in used_artist_pairs:
          used_artist_pairs.add(pair)
          artist_links.append(
            ArtistCollection(
              collection_id=collection.id,
              artist_review_id=review.id,
            )
          )

    if owner_artwork_reviews:
      for review in random.sample(
        owner_artwork_reviews, k=min(num_links, len(owner_artwork_reviews))
      ):
        pair = (collection.id, review.id)
        if pair not in used_artwork_pairs:
          used_artwork_pairs.add(pair)
          artwork_links.append(
            ArtworkCollection(
              collection_id=collection.id,
              artwork_review_id=review.id,
            )
          )

  db.session.add_all(artist_links + artwork_links)
  db.session.commit()
  return artist_links, artwork_links

def seed():
  print("Clearing tables...")
  # order matters: children before parents
  ArtistCollection.query.delete()
  ArtworkCollection.query.delete()
  ArtistReview.query.delete()
  ArtworkReview.query.delete()
  Collection.query.delete()
  User.query.delete()
  db.session.commit()

  print("Creating users...")
  users = make_users()

  print("Creating collections...")
  collections = make_collections(users)

  print("Creating artist reviews...")
  artist_reviews = make_artist_reviews(users)

  print("Creating artwork reviews...")
  artwork_reviews = make_artwork_reviews(users)

  print("Linking reviews to collections...")
  artist_links, artwork_links = link_reviews_to_collections(
    collections, artist_reviews, artwork_reviews
  )

  print("Done!")
  print(f"  {len(users)} users")
  print(f"  {len(collections)} collections")
  print(f"  {len(artist_reviews)} artist reviews")
  print(f"  {len(artwork_reviews)} artwork reviews")
  print(f"  {len(artist_links)} artist-collection links")
  print(f"  {len(artwork_links)} artwork-collection links")

if __name__ == "__main__":
  with app.app_context():
    seed()