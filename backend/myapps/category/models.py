from django.db import models
from django.conf import settings

# Create your models here.
class Category(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='categories')
    name = models.CharField(max_length=100, help_text="Ingrese el nombre de la categoría")
    description = models.TextField(blank=True, null=True, help_text="Ingrese una descripción para la categoría (opcional)")
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "categoría"
        verbose_name_plural = "categorías"