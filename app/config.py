import os


ROOT_PATH = BASE_DIR = os.path.join(os.path.dirname(__file__), '..')
APP_BASE_LINK = os.environ['APP_BASE_LINK']
PORT = int(os.environ.get('PORT', '7055'))
STATIC_FOLDER = os.path.join(ROOT_PATH, 'static')
TEMPLATE_FOLDER = os.path.join(ROOT_PATH, 'templates')
DEBUG = bool(os.environ.get('DEBUG', False))
