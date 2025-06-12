from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Usuario, Categoria, Producto, MovimientoInventario

class CustomUsuarioAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ('Rol del usuario', {'fields': ('rol',)}),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Rol del usuario', {'fields': ('rol',)}),
    )

    list_display = ['username', 'email', 'rol', 'is_staff']

admin.site.register(Usuario, CustomUsuarioAdmin)
admin.site.register(Categoria)
admin.site.register(Producto)
admin.site.register(MovimientoInventario)
    