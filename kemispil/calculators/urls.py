from django.urls import path

from . import views

app_name = 'calculators'
urlpatterns = [
    path('udregnere/', views.CalculatorListView.as_view(), name='calculator_list'),
]
