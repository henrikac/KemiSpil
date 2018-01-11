from django.views import generic
from django.shortcuts import render

from . import models


def display_levels(request, topic):
    title = topic
    return render(request, 'guessing_games/guessing_games_levels.html', {
        'levels': range(1, 5),
        'title': title
    })


class GuessingGamesListView(generic.ListView):
    model = models.GuessingGame
    template_name = 'guessing_games/guessing_games_list.html'
    context_object_name = 'guessing_game'
