
from config import app, api

from controllers.SignUp import SignUp
from controllers.LogIn import LogIn
from controllers.WhoAmI import WhoAmI
from controllers.CollectionFeed import CollectionFeed
from controllers.UserCollectionIndex import UserCollectionIndex
from controllers.CollectionById import CollectionById
from controllers.ArtworkReviewIndex import ArtworkReviewIndex
from controllers.ArtworkReviewById import ArtworkReviewById
from controllers.ArtistReviewIndex import ArtistReviewIndex
from controllers.ArtistReviewById import ArtistReviewById
from controllers.ArtworkCollectionLink import ArtworkCollectionLink
from controllers.ArtistCollectionLink import ArtistCollectionLink

# landing page/home page
# alternatively, landing page is user's own collections to avoid a typical social media setup
api.add_resource(CollectionFeed, '/')

api.add_resource(SignUp, '/signup')
api.add_resource(LogIn, '/login')
api.add_resource(WhoAmI, '/whoami')

api.add_resource(UserCollectionIndex, '/collections')

api.add_resource(CollectionById, '/collections/<int:collection_id>')

api.add_resource(ArtworkReviewIndex, '/artwork-reviews')
api.add_resource(ArtworkReviewById, '/artwork-reviews/<int:artwork_review_id>')

api.add_resource(ArtistReviewIndex, '/artist-reviews')
api.add_resource(ArtistReviewById, '/artist-reviews/<int:artist_review_id>')

api.add_resource(ArtworkCollectionLink, '/collections/<int:collection_id>/artwork-reviews/<int:artwork_review_id>')
api.add_resource(ArtistCollectionLink, '/collections/<int:collection_id>/artist-reviews/<int:artist_review_id>')