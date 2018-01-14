from django.urls import path

from . import views

app_name = 'guessing_games'
urlpatterns = [
    path('<topic>/<what_to_guess>/<int:level>/', views.play_game, name='play'),
    path('<topic>/levels/', views.display_levels, name='levels'),
    path('', views.GuessingGamesListView.as_view(), name='guessing_games_list'),
]
