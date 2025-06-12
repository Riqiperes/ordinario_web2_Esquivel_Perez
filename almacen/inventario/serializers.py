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
    producto = ProductoSerializer(read_only=True)  # para la respuesta
    producto_id = serializers.PrimaryKeyRelatedField(
        queryset=Producto.objects.all(),
        source='producto',  # ← muy importante
        write_only=True
    )

    class Meta:
        model = MovimientoInventario
        fields = [
            'id', 'producto', 'producto_id', 'usuario',
            'tipo', 'cantidad', 'comentario', 'fecha'
        ]

    def create(self, validated_data):
        producto = validated_data['producto']
        tipo = validated_data['tipo']
        cantidad = validated_data['cantidad']

        # Lógica de stock
        if tipo == 'entrada':
            producto.stock += cantidad
        elif tipo == 'salida':
            producto.stock -= cantidad
        elif tipo == 'ajuste':
            producto.stock = cantidad

        producto.save()

        return super().create(validated_data)
    producto = ProductoSerializer(read_only=True)
    
    
    class Meta:
        model = MovimientoInventario
        fields = '__all__'


