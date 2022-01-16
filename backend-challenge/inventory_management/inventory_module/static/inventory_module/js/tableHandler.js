function add_data() {
    var inventory = {}
    inventory.item = document.getElementById("item").value;
    inventory.brand = document.getElementById("brand").value;
    inventory.category = document.getElementById("category").value;
    inventory.stock = parseInt(document.getElementById("stock").value);
    inventory.price = parseFloat(document.getElementById("price").value);

    document.getElementById("item").value = "";
    document.getElementById("brand").value = "";
    document.getElementById("category").value = "";
    document.getElementById("stock").value = "";
    document.getElementById("price").value = "";

    $.ajax({
        url: '/inventory/add/',
        method: 'POST',
        data: inventory,
        success: function (response) {
            add_to_table(JSON.parse(response.success))
            alert("Item added successfully");  
        },
        failure: function() {
            alert("Failed")
        }
    });
}

function add_to_table(data){
    var row = '<tr id=row-'+data.id+'> <td>' + data.id + '</td> <td>' + data.item + '</td> <td>' + data.brand + '</td> <td>' + data.category + '</td> <td>' + data.stock + '</td> <td>' + data.price + '</td> <td> <input type="button" onclick="edit_data('+data.id+');" value="Edit"> <input type="button" style="display:none;" onclick="save_data('+data.id+');" value="Save"> <input type="button" onclick="delete_data('+data.id+');" value="Delete"> </td> </tr>';
    $('#inventory-list-table').append(row);
}

function edit_data(id) {
    var row = document.getElementById("row-" + id);
    var columns = row.children;
    
    var item = columns[1].innerHTML;
    var brand = columns[2].innerHTML;
    var category = columns[3].innerHTML;
    var stock = columns[4].innerHTML;
    var price = columns[5].innerHTML;

    var buttons = columns[6].children;
    buttons[0].style.display = "none";
    buttons[1].style.display = "block";
    
    columns[1].innerHTML = "<input type='text' value='" + item + "'>";
    columns[2].innerHTML = "<input type='text' value='" + brand + "'>";
    columns[3].innerHTML = "<input type='text' value='" + category + "'>";
    columns[4].innerHTML = "<input type='text' value='" + stock + "'>";
    columns[5].innerHTML = "<input type='text' value='" + price + "'>";
}

function delete_data(id){
    $.ajax({
        url: '/inventory/delete/',
        method: 'DELETE',
        data: {
            "id": id
        },
        success: function () {
            var row = document.getElementById("row-" + id);
            row.remove();
            alert("Item deleted successfully");  
        },
        failure: function() {
            alert("Failed")
        }
    });
}

function save_data(id){
    var row = document.getElementById("row-" + id);
    var columns = row.children;

    var item = columns[1].firstElementChild.value;
    var brand = columns[2].firstElementChild.value;
    var category = columns[3].firstElementChild.value;
    var stock = columns[4].firstElementChild.value;
    var price = columns[5].firstElementChild.value;

    var inventory = {}
    inventory.id = id;
    inventory.item = item;
    inventory.brand = brand;
    inventory.category = category;
    inventory.stock = stock;
    inventory.price = price;

    var buttons = columns[6].children;
    buttons[0].style.display = "block";
    buttons[1].style.display = "none";

    columns[1].innerHTML = item;
    columns[2].innerHTML = brand;
    columns[3].innerHTML = category;
    columns[4].innerHTML = stock;
    columns[5].innerHTML = price;

    $.ajax({
        url: '/inventory/edit/',
        method: 'PUT',
        data: inventory,
        success: function () {
            alert("Item edited successfully");  
        },
        failure: function() {
            alert("Failed")
        }
    });

}

function get_data() {
    $.ajax({
        url: '/inventory/get/',
        method: 'GET',
        success: function (data) {
            show_data(data);              
        },
        failure: function() {
            alert("Failed")
        }
    });
}

function show_data(data){
    var list = '';
    for (var idx in data.inventories){
        var entry = data.inventories[idx];
        var id = entry.pk;
        var item = entry.fields.item;
        var brand = entry.fields.brand;
        var category = entry.fields.category;
        var stock = entry.fields.stock;
        var price = entry.fields.price;

        list += '<tr id=row-'+id+'> <td>' + id + '</td> <td>' + item + '</td> <td>' + brand + '</td> <td>' + category + '</td> <td>' + stock + '</td> <td>' + price + '</td> <td> <input type="button" onclick="edit_data('+id+');" value="Edit"> <input type="button" style="display:none;" onclick="save_data('+id+');" value="Save"> <input type="button" onclick="delete_data('+id+');" value="Delete"> </td> </tr>';
    }
    $('#inventory-list-table').append(list);
}

$(document).ready(function(){
    get_data();    
});