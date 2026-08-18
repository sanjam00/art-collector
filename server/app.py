
from config import app, api

from controllers.SignUp import Signup
from controllers.Login import Login
from controllers.WhoAmI import WhoAmI

api.add_resource(Signup, '/signup')
api.add_resource(Login, 'login')
api.add_resource(WhoAmI, '/whoami')