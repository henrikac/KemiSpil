from django.views import generic
from django.shortcuts import render

import json

from . import models


def display_levels(request, topic):
    title = topic
    return render(request, 'guessing_games/guessing_games_levels.html', {
        'levels': range(1, 5),
        'title': title
    })


def play_game(request, topic, what_to_guess, level):
    level = level
    what_to_guess = what_to_guess
    game_items = models.GameItem.objects.filter(guessing_game__url_title=topic)

    items = []

    for item in game_items:
        items.append({"name": item.item_key, "formula": item.item_value})

    return render(request, 'guessing_games/guessing_games_play.html', {
        'what_to_guess': what_to_guess,
        'level': level,
        'items': items
    })


class GuessingGamesListView(generic.ListView):
    model = models.GuessingGame
    template_name = 'guessing_games/guessing_games_list.html'
    context_object_name = 'guessing_game'
