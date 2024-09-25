from django.urls import path
from .views import UserListCreateView, UserDetailView
from rest_framework_simplejwt.views import TokenObtainPairView  # Import the JWT token view

urlpatterns = [
    path('', UserListCreateView.as_view(), name='user-list-create'),  # User registration
    path('<int:pk>/', UserDetailView.as_view(), name='user-detail'),  # User detail
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # JWT token endpoint
]
