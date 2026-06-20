from django.contrib import admin
from myapps.category.models import Category

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'get_user', 'is_deleted')
    list_filter = ('is_deleted',)
    search_fields = ('name', 'description')
    ordering = ('name',)

    @admin.display(description='Usuario')
    def get_user(self, obj):
        return obj.user.username if obj.user else '-'

admin.site.register(Category, CategoryAdmin)