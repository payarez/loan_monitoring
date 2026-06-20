from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, permissions
from myapps.item.models import Item
from myapps.item.serializers import ItemSerializer

# Create your views here.
class ItemViewSet(viewsets.ModelViewSet):
    serializer_class = ItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Item.objects.filter(user=self.request.user, is_deleted=False)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_destroy(self, instance):
        instance.is_deleted = True
        instance.save()