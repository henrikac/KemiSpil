from django.db import models


class GuessingGame(models.Model):
    game_title = models.CharField(max_length=50)
    game_description = models.TextField()

    class Meta:
        ordering = ['game_title']

    def __str__(self):
        return 'Game: {}'.format(self.game_title)


class GameItem(models.Model):
    item_key = models.CharField(max_length=50)
    item_value = models.CharField(max_length=50)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return '{}: {}'.format(self.item_key, self.item_value)
