
from config import app, api

from controllers.SignUp import SignUp
from controllers.LogIn import LogIn
from controllers.WhoAmI import WhoAmI

api.add_resource(SignUp, '/signup')
api.add_resource(LogIn, 'login')
api.add_resource(WhoAmI, '/whoami')