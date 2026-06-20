from django.db import models
from django.utils import timezone
from django.conf import settings
from myapps.item.models import Item
from myapps.borrower.models import Borrower

# Create your models here.
class Loan(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='loans')
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='loans')
    borrower = models.ForeignKey(Borrower, on_delete=models.CASCADE, related_name='loans')
    lent_at = models.DateTimeField(help_text="Fecha y hora en que se prestó el ítem")
    due_at = models.DateTimeField(help_text="Fecha y hora en que se debe devolver el ítem")
    returned_at = models.DateTimeField(blank=True, null=True, help_text="Fecha y hora en que se devolvió el ítem (opcional)")
    notes = models.TextField(blank=True, null=True, help_text="Ingrese notas adicionales sobre el préstamo (opcional)")
    created_at = models.DateTimeField(auto_now_add=True)
    is_deleted = models.BooleanField(default=False)

    @property
    def status(self):
        if self.returned_at:
            return 'returned'
        if self.due_at < timezone.now():
            return 'overdue'
        return 'active'

    def __str__(self):
        return f"{self.item.name} prestado a {self.borrower.name}"
    
    class Meta:
        verbose_name = "préstamo"
        verbose_name_plural = "préstamos"

class LoanPhoto(models.Model):
    
    MOMENT_CHOICES = [
        ('lent', 'Al prestar'),
        ('returned', 'Al devolver'),
    ]
    
    loan = models.ForeignKey(Loan, on_delete=models.CASCADE, related_name='photos')
    photo = models.ImageField(upload_to='loan_photos/', help_text="Suba una foto del ítem prestado (opcional)")
    moment = models.CharField(max_length=20, choices=MOMENT_CHOICES, help_text="Seleccione el momento en que se tomó la foto")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Foto del préstamo: {self.loan}"
    
    class Meta:
        verbose_name = "foto de préstamo"
        verbose_name_plural = "fotos de préstamos"