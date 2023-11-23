from django.urls import path
from .views import LoginAPIView, LogoutAPIView

urlpatterns = [
    path('login', LoginAPIView.as_view(), name='authentication_login'),
    path('logout', LogoutAPIView.as_view(), name='authentication_logout'),
]
