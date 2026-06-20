from django.db import models
from django.conf import settings

# Create your models here.
class Borrower(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='borrowers')
    name = models.CharField(max_length=100, help_text="Ingrese el nombre del prestatario")
    contact_info = models.TextField(blank=True, null=True, help_text="Ingrese la información de contacto del prestatario (opcional)")
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "prestatario"
        verbose_name_plural = "prestatarios"