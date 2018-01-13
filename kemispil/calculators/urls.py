from django.urls import path

from . import views

app_name = 'calculators'
urlpatterns = [
    path('lommeregnere/molarmasse/', views.molar_mass_calculator, name='calculator'),
    path('lommeregnere//', views.CalculatorListView.as_view(), name='calculator_list'),
]
