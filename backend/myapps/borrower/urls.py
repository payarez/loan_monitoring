from django.urls import path
from rest_framework.routers import DefaultRouter
from myapps.borrower.views import BorrowerViewSet

router = DefaultRouter()
router.register(r'borrowers', BorrowerViewSet, basename='borrower')

urlpatterns = router.urls