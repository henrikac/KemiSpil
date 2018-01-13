from django.db import models


class Calculator(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField()
    url_title = models.CharField(max_length=25)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return '/lommeregnere/{}/'.format(self.url_title)
