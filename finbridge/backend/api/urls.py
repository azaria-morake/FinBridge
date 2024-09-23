# api/urls.py
from django.urls import path
from .views import RegisterView, LoginView, LogoutView, UserDetailView, api_root

urlpatterns = [
    path('', api_root, name='api-root'),  # Add this line
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('user/', UserDetailView.as_view(), name='user-detail'),
]
