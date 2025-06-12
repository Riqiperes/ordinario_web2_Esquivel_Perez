from rest_framework import serializers
from .models import Usuario, Categoria, Producto, MovimientoInventario

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

class ProductoSerializer(serializers.ModelSerializer):
    categoria = CategoriaSerializer(read_only=True)
    categoria_id = serializers.PrimaryKeyRelatedField(
        queryset=Categoria.objects.all(), source='categoria', write_only=True
    )

    class Meta:
        model = Producto
        fields = ['id', 'nombre', 'descripcion', 'precio', 'stock', 'disponible', 'fecha_creacion', 'categoria', 'categoria_id']

class MovimientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovimientoInventario
        fields = '__all__'
