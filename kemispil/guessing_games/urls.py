from django.urls import path

from . import views

app_name = 'guessing_games'
urlpatterns = [
    path('', views.GuessingGamesListView.as_view(), name='guessing_games_list'),
]
