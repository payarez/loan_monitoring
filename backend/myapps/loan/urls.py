from django.urls import path
from rest_framework.routers import DefaultRouter
from myapps.loan.views import LoanViewSet

router = DefaultRouter()
router.register(r'loans', LoanViewSet, basename='loan')

urlpatterns = router.urls
