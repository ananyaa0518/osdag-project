from django.urls import path
from . import views

urlpatterns = [
    path('states/', views.get_states, name='get_states'),
    path('districts/<str:state>/', views.get_districts, name='get_districts'),
    path('data/', views.get_location_data, name='get_location_data'),
]
