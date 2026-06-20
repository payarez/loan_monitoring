from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from myapps.loan.models import Loan
from myapps.loan.serializers import LoanSerializer

# Create your views here.

class LoanViewSet(viewsets.ModelViewSet):
    serializer_class = LoanSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Loan.objects.filter(user=self.request.user, is_deleted=False)
        status = self.request.query_params.get('status')
        now = timezone.now()

        if status == 'active':
            queryset = queryset.filter(returned_at__isnull=True, due_at__gte=now)
        elif status == 'returned':
            queryset = queryset.filter(returned_at__isnull=False)
        elif status == 'overdue':
            queryset = queryset.filter(returned_at__isnull=True, due_at__lt=now)

        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_destroy(self, instance):
        instance.is_deleted = True
        instance.save()

    @action(detail=True, methods=['post'])
    def return_loan(self, request, pk=None):
        loan = self.get_object()
        loan.returned_at = timezone.now()
        loan.save()
        return Response(LoanSerializer(loan).data)