import os


ROOT_PATH = BASE_DIR = os.path.join(os.path.dirname(__file__), '..')
APP_BASE_LINK = os.environ.get('APP_BASE_LINK', 'localhost')
PORT = int(os.environ.get('PORT', '7055'))
REDIS_PORT = int(os.environ.get('REDIS_PORT', '6379'))
STATIC_FOLDER = os.path.join(ROOT_PATH, 'static')
TEMPLATE_FOLDER = os.path.join(ROOT_PATH, 'static')
DEBUG = bool(os.environ.get('DEBUG', True))
SECRET_KEY = os.environ.get('SECRET_KEY', 'test')
