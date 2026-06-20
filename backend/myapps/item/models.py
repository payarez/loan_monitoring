from django.db import models
from django.conf import settings
from myapps.category.models import Category

# Create your models here.
class Item(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='items')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, related_name='items')
    name = models.CharField(max_length=100, help_text="Ingrese el nombre del ítem")
    description = models.TextField(blank=True, null=True, help_text="Ingrese una descripción para el ítem (opcional)")
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "ítem"
        verbose_name_plural = "ítems"
