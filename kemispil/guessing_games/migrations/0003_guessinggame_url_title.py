# Generated by Django 2.0 on 2018-01-11 17:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('guessing_games', '0002_auto_20180111_1755'),
    ]

    operations = [
        migrations.AddField(
            model_name='guessinggame',
            name='url_title',
            field=models.CharField(default='', max_length=25),
        ),
    ]
