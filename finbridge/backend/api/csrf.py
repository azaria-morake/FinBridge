# api/csrf.py

from django.utils.deprecation import MiddlewareMixin
from django.middleware.csrf import get_token

class CsrfMiddleware(MiddlewareMixin):
    def process_view(self, request, callback, callback_args, callback_kwargs):
        get_token(request)
        return None