from rest_framework import serializers
from myapps.category.models import Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'is_deleted']
        read_only_fields = ['id']