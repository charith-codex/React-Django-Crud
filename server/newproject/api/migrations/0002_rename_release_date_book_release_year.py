# Generated by Django 5.1.4 on 2024-12-25 08:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='book',
            old_name='release_date',
            new_name='release_year',
        ),
    ]
