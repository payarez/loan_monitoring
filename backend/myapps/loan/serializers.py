from rest_framework import serializers
from myapps.loan.models import Loan, LoanPhoto

class LoanPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanPhoto
        fields = ['id', 'photo', 'moment', 'created_at']
        read_only_fields = ['id', 'created_at']

class LoanSerializer(serializers.ModelSerializer):
    photos = LoanPhotoSerializer(many=True, read_only=True)
    status = serializers.SerializerMethodField()

    class Meta:
        model = Loan
        fields = ['id', 'item', 'borrower', 'lent_at', 'due_at', 'returned_at', 'notes', 'status', 'photos', 'is_deleted', 'created_at']
        read_only_fields = ['id', 'created_at', 'status']

    def get_status(self, obj):
        return obj.status