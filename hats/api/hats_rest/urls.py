from django.urls import path
from .views import api_hat, api_hats

urlpatterns = [
    path("hats/", api_hats, name="api_hats"),
    path("hats/<int:pk>", api_hat, name="api_hat"),
]
