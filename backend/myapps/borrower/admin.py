from django.contrib import admin
from myapps.borrower.models import Borrower

class BorrowerAdmin(admin.ModelAdmin):
    list_display = ('name', 'get_user', 'contact_info', 'is_deleted')
    list_filter = ('is_deleted',)
    search_fields = ('name', 'contact_info', 'user__username')
    ordering = ('name',)

    @admin.display(description='Usuario')
    def get_user(self, obj):
        return obj.user.username if obj.user else '-'

admin.site.register(Borrower, BorrowerAdmin)