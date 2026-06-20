from django.urls import path
from rest_framework.routers import DefaultRouter
from myapps.item.views import ItemViewSet

router = DefaultRouter()
router.register(r'items', ItemViewSet, basename='item')

urlpatterns = router.urls