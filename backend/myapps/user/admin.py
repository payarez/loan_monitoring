from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from myapps.user.models import User

class UserAdmin(BaseUserAdmin):
    list_display = ('username', 'email', 'language', 'theme', 'is_active', 'is_superuser')
    list_filter = ('is_active', 'language', 'theme')
    search_fields = ('username', 'email')
    ordering = ('username',)

    fieldsets = (
        ('Información Personal', {
            'fields': ('first_name', 'last_name', 'email', 'language', 'theme')
        }),
        ('Credenciales', {
            'fields': ('username', 'password')
        }),
        ('Estado', {
            'fields': ('is_active',)
        }),
    )

    # Formulario al CREAR un usuario nuevo
    add_fieldsets = (
        ('Crear Usuario', {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'language', 'theme')
        }),
    )

    readonly_fields = ('last_login',)

admin.site.register(User, UserAdmin)