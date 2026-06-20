from django.contrib import admin
from myapps.loan.models import Loan, LoanPhoto

class LoanPhotoInline(admin.TabularInline):
    model = LoanPhoto
    extra = 1

class LoanAdmin(admin.ModelAdmin):
    list_display = ('get_item', 'get_borrower', 'get_user', 'lent_at', 'due_at', 'returned_at', 'status', 'is_deleted')
    list_filter = ('is_deleted', 'returned_at')
    search_fields = ('item__name', 'borrower__name', 'user__username')
    ordering = ('-lent_at',)
    inlines = [LoanPhotoInline]

    @admin.display(description='Ítem')
    def get_item(self, obj):
        return obj.item.name if obj.item else '-'

    @admin.display(description='Prestatario')
    def get_borrower(self, obj):
        return obj.borrower.name if obj.borrower else '-'

    @admin.display(description='Usuario')
    def get_user(self, obj):
        return obj.user.username if obj.user else '-'

    @admin.display(description='Estado')
    def status(self, obj):
        return obj.status

admin.site.register(Loan, LoanAdmin)
admin.site.register(LoanPhoto)