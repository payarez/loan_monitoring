from rest_framework import serializers
from myapps.borrower.models import Borrower

class BorrowerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Borrower
        fields = ['id', 'name', 'contact_info', 'is_deleted']
        read_only_fields = ['id']