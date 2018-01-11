from django.db import models


class GuessingGame(models.Model):
    game_title = models.CharField(max_length=50)
    game_description = models.TextField()
    url_title = models.CharField(max_length=25, default='')

    class Meta:
        ordering = ['game_title']
        verbose_name_plural = 'Vendespil'

    def __str__(self):
        return 'Game: {}'.format(self.game_title)


class GameItem(models.Model):
    guessing_game = models.ForeignKey(GuessingGame, on_delete=models.CASCADE)
    item_key = models.CharField(max_length=50)
    item_value = models.CharField(max_length=50)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return '{}: {}'.format(self.item_key, self.item_value)
