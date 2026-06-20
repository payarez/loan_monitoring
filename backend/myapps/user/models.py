from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):

    LANGUAGE_CHOICES = [
        ('es', 'Español'),
        ('en', 'English'),
    ]

    THEME_CHOICES = [
        ('light', 'Claro'),
        ('dark', 'Oscuro'),
    ]

    language = models.CharField(max_length=2, choices=LANGUAGE_CHOICES, default='es', help_text="Seleccione su idioma")
    theme = models.CharField(max_length=5, choices=THEME_CHOICES, default='light', help_text="Seleccione su tema")

    def __str__(self):
        return self.username
    
    class Meta:
        verbose_name = "usuario"
        verbose_name_plural = "usuarios"