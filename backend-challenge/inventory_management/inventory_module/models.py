from django.db import models

# Create your models here.
class Inventory(models.Model):
    class Meta:
        verbose_name = "Inventory"
        verbose_name_plural = "Inventories"
    item = models.TextField()
    brand = models.TextField()
    category = models.TextField()
    stock = models.IntegerField()
    price = models.FloatField()