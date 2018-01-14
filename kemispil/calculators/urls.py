from django.urls import path

from . import views

app_name = 'calculators'
urlpatterns = [
    path('molarmasse/', views.molar_mass_calculator, name='calculator'),
    path('', views.CalculatorListView.as_view(), name='calculator_list'),
]
