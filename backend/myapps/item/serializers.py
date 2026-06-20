from rest_framework import serializers
from myapps.item.models import Item

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['id', 'category', 'name', 'description', 'is_deleted']
        read_only_fields = ['id']