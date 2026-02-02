from django.urls import path
from .views import (
    ContactListCreateView,
    ContactRetrieveUpdateDestroyView,
)

urlpatterns = [
    path('contacts/', ContactListCreateView.as_view()),
    path('contacts/<int:pk>/', ContactRetrieveUpdateDestroyView.as_view()),
]
