from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Usuario, Categoria, Producto, MovimientoInventario
from django.contrib.auth.admin import UserAdmin

admin.site.register(Usuario, UserAdmin)
admin.site.register(Categoria)
admin.site.register(Producto)
admin.site.register(MovimientoInventario)
