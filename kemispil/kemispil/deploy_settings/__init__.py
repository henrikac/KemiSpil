import dj_database_url

from kemispil.settings import *

DEBUG = False

ALLOWED_HOSTS = [
    'localhost',
    '.herokuapp.com',
    'kemispil.henrikac.com'
]

INSTALLED_APPS += (
    'gunicorn',
)

SECRET_KEY = get_env_variable("SECRET_KEY")

db_from_env = dj_database_url.config()
DATABASES['default'].update(db_from_env)

STATICFILES_STORAGE = 'whitenoise.django.GzipManifestStaticFilesStorage'
