from django.contrib import admin
from myapps.item.models import Item

class ItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'get_user', 'get_category', 'is_deleted')
    list_filter = ('is_deleted', 'category')
    search_fields = ('name', 'description', 'user__username', 'category__name')
    ordering = ('name',)

    @admin.display(description='Usuario')
    def get_user(self, obj):
        return obj.user.username if obj.user else '-'

    @admin.display(description='Categoría')
    def get_category(self, obj):
        return obj.category.name if obj.category else '-'

admin.site.register(Item, ItemAdmin)