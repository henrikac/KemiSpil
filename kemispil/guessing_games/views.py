from django.views import generic
from django.shortcuts import render

from . import models


class GuessingGamesListView(generic.ListView):
    model = models.GuessingGame
    template_name = 'guessing_games/guessing_games_list.html'
    context_object_name = 'guessing_game'
