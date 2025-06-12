from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, permissions
from .models import Usuario, Categoria, Producto, MovimientoInventario
from .serializers import UsuarioSerializer, CategoriaSerializer, ProductoSerializer, MovimientoSerializer

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [permissions.IsAuthenticated]

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [permissions.IsAuthenticated]

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all().order_by('-fecha_creacion')
    serializer_class = ProductoSerializer
    permission_classes = [permissions.IsAuthenticated]

class MovimientoViewSet(viewsets.ModelViewSet):
    queryset = MovimientoInventario.objects.all().order_by('-fecha')
    serializer_class = MovimientoSerializer
    permission_classes = [permissions.IsAuthenticated]
