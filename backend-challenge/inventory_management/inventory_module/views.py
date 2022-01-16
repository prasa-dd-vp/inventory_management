from django.shortcuts import render
from django.http import JsonResponse
from django.core import serializers
from inventory_module.models import Inventory
from django.http import QueryDict
import json

# Create your views here.
def home(request):
    return render(request, 'inventory_module/index.html')

def add_data(request):
    inventoryObj = Inventory.objects.create(item = request.POST.get('item'),
                                            brand = request.POST.get('brand'),
                                            category = request.POST.get('category'),
                                            stock = request.POST.get('stock'),
                                            price = request.POST.get('price'))
    inventoryObj.save()

    entry = {
        "id": inventoryObj.pk,
        "item": request.POST.get('item'),
        "brand": request.POST.get('brand'),
        "category": request.POST.get('category'),
        "stock": request.POST.get('stock'),
        "price": request.POST.get('price')
    }
    return JsonResponse({"success":json.dumps(entry)},status=200)

def edit_data(request):
    put = QueryDict(request.body)
    id = put.get('id')
    inventoryObj = Inventory.objects.get(pk=id)
    
    inventoryObj.item = put.get('item')
    inventoryObj.brand = put.get('brand')
    inventoryObj.category = put.get('category')
    inventoryObj.stock = put.get('stock')
    inventoryObj.price = put.get('price')
    
    inventoryObj.save()
    return JsonResponse({"success":True},status=200)

def get_data(request):
    inventoryObj = serializers.serialize("json",Inventory.objects.all())
    response = json.loads(inventoryObj)
    return JsonResponse({"inventories":response},status=200)

def delete_data(request):
    id = QueryDict(request.body).get('id')
    inventoryObj = Inventory.objects.get(pk=id)
    inventoryObj.delete()
    return JsonResponse({"success":True},status=204)
