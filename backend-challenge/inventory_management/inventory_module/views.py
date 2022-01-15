from django.shortcuts import render
from django.http import JsonResponse
from django.core import serializers
from inventory_module.models import Inventory
import json

# Create your views here.

def home(request):
    return render(request, 'inventory_module/index.html')

def add_data(request):
    dbObj = Inventory.objects.create(item = request.POST.get('item'),
                                     brand = request.POST.get('brand'),
                                     category = request.POST.get('category'),
                                     stock = request.POST.get('stock'),
                                     price = request.POST.get('price'))
    dbObj.save()
    return JsonResponse({"success":True},status=200)

def edit_data(request, id):
    dataObj = Inventory.objects.get(id=id)
    
    dataObj.item = request.POST.get('item')
    dataObj.brand = request.POST.get('brand')
    dataObj.category = request.POST.get('category')
    dataObj.stock = request.POST.get('stock')
    dataObj.price = request.POST.get('price')
    
    dataObj.save()
    return JsonResponse({"success":True},status=200)
