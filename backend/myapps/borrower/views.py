from django.shortcuts import render
from rest_framework import viewsets, permissions
from myapps.borrower.models import Borrower
from myapps.borrower.serializers import BorrowerSerializer

# Create your views here.

class BorrowerViewSet(viewsets.ModelViewSet):
    serializer_class = BorrowerSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Borrower.objects.filter(user=self.request.user, is_deleted=False)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_destroy(self, instance):
        instance.is_deleted = True
        instance.save()