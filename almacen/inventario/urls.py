from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UsuarioViewSet, CategoriaViewSet, ProductoViewSet, MovimientoViewSet

router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)
router.register(r'categorias', CategoriaViewSet)
router.register(r'productos', ProductoViewSet)
router.register(r'movimientos', MovimientoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
