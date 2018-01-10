from django.contrib import admin

from . import models


class GameItemInline(admin.StackedInline):
    model = models.GameItem


class GuessingGameAdmin(admin.ModelAdmin):
    inlines = [
        GameItemInline,
    ]


admin.site.register(models.GuessingGame, GuessingGameAdmin)
