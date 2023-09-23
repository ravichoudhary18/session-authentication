from django.contrib import admin
from django.urls import path, include
from .views import ServerTest


urlpatterns = [
    path('admin/', admin.site.urls),
    path('test/', ServerTest.as_view()),
    path('api/authentication/', include('authentication.urls'), name='authentication'),
    path("__debug__/", include("debug_toolbar.urls")),
]
