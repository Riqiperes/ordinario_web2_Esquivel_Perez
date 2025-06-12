from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import AbstractUser

# Usuario extendido con roles
class Usuario(AbstractUser):
    ROLES = (
        ('admin', 'Administrador'),
        ('operador', 'Operador'),
    )
    rol = models.CharField(max_length=10, choices=ROLES, default='operador')

    def __str__(self):
        return f"{self.username} ({self.rol})"

# Categoría de productos
class Categoria(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

# Producto del almacén
class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, related_name='productos')
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)
    disponible = models.BooleanField(default=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombre

# Movimiento de inventario (entrada/salida)
class MovimientoInventario(models.Model):
    TIPOS = (
        ('entrada', 'Entrada'),
        ('salida', 'Salida'),
        ('ajuste', 'Ajuste'),
    )
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name='movimientos')
    usuario = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True, blank=True)
    tipo = models.CharField(max_length=10, choices=TIPOS)
    cantidad = models.PositiveIntegerField()
    comentario = models.TextField(blank=True)
    fecha = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.tipo.title()} - {self.producto.nombre} ({self.cantidad})"
