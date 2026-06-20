from django.urls import path
from rest_framework.routers import DefaultRouter
from myapps.category.views import CategoryViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')

urlpatterns = router.urls