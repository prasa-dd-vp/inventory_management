# Generated by Django 3.2.11 on 2022-01-14 23:39

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Inventory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField()),
                ('categoty', models.TextField()),
                ('stock', models.IntegerField()),
                ('price', models.FloatField()),
            ],
        ),
    ]