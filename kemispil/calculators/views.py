from django.views import generic

from . import models


class CalculatorListView(generic.ListView):
    model = models.Calculator
    context_object_name = 'calculators'
