const itemForm = document.getElementById('form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const itemClear = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formButton = itemForm.querySelector('button');
let isEditMode = false;

function addItem(e) {
    e.preventDefault();

    const newItem = itemInput.value;
    if(itemInput.value === '' || itemInput.value === null){
        alert('Please Enter an Input');
        return;
    }
    
    // Create list item
    const li = document.createElement('li');
    li.className = 'list-group-item font-weight-bold';

    li.appendChild(document.createTextNode(newItem));
    
    const button = createButton('btn btn-danger float-right');
    li.appendChild(button);

    itemList.appendChild(li);
    checkUI();
    itemInput.value = '';

}

function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}

function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

function removeItem(e) {
    if(e.target.parentElement.classList.contains('btn-danger')) {
        if(confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();
            checkUI();
        }
    } else {
        setItemToEdit(e.target);
    }
}

function clearItems(e) {
   while(itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
   }
}

function filterItems(e) {
    const text = e.target.value.toLowerCase();
    const items = itemList.querySelectorAll('li');

    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase();
        
        if(itemName.indexOf(text) != -1) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function checkUI() {
    const items = itemList.querySelectorAll('li');
    if(items.length === 0) {
        itemFilter.style.display = 'none';
        itemClear.style.display = 'none';
    } else {
        itemFilter.style.display = 'block';
        itemClear.style.display = 'block';
    }
}

// Event listners
itemForm.addEventListener('submit' , addItem);
itemList.addEventListener('click' , removeItem);
itemClear.addEventListener('click' , clearItems);
itemFilter.addEventListener('input' , filterItems);
checkUI();