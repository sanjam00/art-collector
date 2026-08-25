
from config import app, api

from controllers.SignUp import SignUp
from controllers.LogIn import LogIn
from controllers.WhoAmI import WhoAmI
from controllers.CollectionFeed import CollectionFeed
from controllers.UserCollectionIndex import UserCollectionIndex
from controllers.CollectionById import CollectionById

# landing page/home page
# alternatively, landing page is user's own collections to avoid a typical social media setup
api.add_resource(CollectionFeed, '/')

api.add_resource(SignUp, '/signup')
api.add_resource(LogIn, 'login')
api.add_resource(WhoAmI, '/whoami')

api.add_resource(UserCollectionIndex, '/collections')

api.add_resource(CollectionById, '/collections/<int:collection_id>')