from django.views import generic
from django.shortcuts import get_object_or_404, render

from . import models


def molar_mass_calculator(request):
    molar_mass = get_object_or_404(models.Calculator, url_title='molarmasse')
    field_descriptions = [
        'n = mol stofmængde (antal mol)',
        'm = masse i gram',
        'M = molarmasse (g/mol)'
    ]

    return render(request, 'calculators/molar_mass_calculator.html',
                  {'molar_mass': molar_mass, 'field_descriptions': field_descriptions})


class CalculatorListView(generic.ListView):
    model = models.Calculator
    context_object_name = 'calculators'
