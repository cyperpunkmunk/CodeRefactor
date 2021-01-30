//Storage controller

//Item controller
const ItemCtrl = (function(){
    //Item Constructor
    const Item = function(id, name, calories){
        this.id = id
        this.name = name
        this.calories = calories
    }
    // Data Structure / State
    const data = {
        items : [
            //Hard coded list items
            //{id:0, name: "Steak dinner" , calories: 1200},
            //{id:1, name: "eggs" , calories: 300}

        ],
        currentItem: null,
        totalCalories: 0
    }
    //Public methods
    return {
        getItems: function(){
            return data.items

        },
        addItem: function(name, calories){
            let ID
            // Create ID
            if(data.items.length > 0 ){
                ID = data.items[data.items.length - 1 ].id + 1 

            } else {
                ID = 0;
            }

            //Calories to number
            calories = parseInt(calories);
            
            // Create new Item
            newItem = new Item(ID, name , calories)
           
            // Add to items array
            data.items.push(newItem)
            return newItem;

        },
        getTotalCalories: function(){
            //loop through items to get each calorie input
            let total = 0

            data.items.forEach(function(item){
                total += item.calories;

            })
            //Set total cal in data structure
            data.totalCalories = total

            //Return total
            return data.totalCalories;

        },
        logData: function(){
            return data;
            
        }
    }
})();

//UI controller
const UICtrl = (function(){
    const UISelectors = {
        itemList : '#item-list',
        addBtn : '.add-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories'
    }
    //Public methods
    return{
        populateitemList:function(items){
            let html = " ";

            items.forEach(function(item){
                html += `<li class="collection-item" id="item-${item.id}">
                <strong>${item.name}: </strong> 
                <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                  <i class="edit-item fa fa-pencil"></i>
                </a>
              </li>`
            });

            // Insert list items 

             document.querySelector(UISelectors.itemList).innerHTML = html ;
        },
        getItemInput: function(){
            return {
                name:document.querySelector(UISelectors.itemNameInput)
                .value,
                calories:document.querySelector(UISelectors.itemCaloriesInput)
                .value
            }
        },
        addListItem: function(item){
            // Show the list
            document.querySelector(UISelectors.itemList).getElementsByClassName.display = 'block'
            //Create li element
            const li = document.createElement('li')
            //Add class
            li.className = 'collection-item'
            // Add ID
            li.id = `item-${item.id}`
            //Add HTML
            li.innerHTML = `<strong>${item.name}: </strong> 
            <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
              <i class="edit-item fa fa-pencil"></i>
            </a>`;
            // Insert item
            document.querySelector(UISelectors.itemList).insertAdjacentElement
            ('beforeend', li)
        },
        clearInput: function(){
            document.querySelector(UISelectors.itemNameInput).value = '' 
            document.querySelector(UISelectors.itemCaloriesInput).value = ''
        },
        hideList: function(){
            document.querySelector(UISelectors.itemList).getElementsByClassName.display = 'none'
        },
        showTotalCalories: function(totalCalories){
            document.querySelector(UISelectors.totalCalories).textContent = 
            totalCalories
        },
        getSelectors: function(){
            return UISelectors;
        }

    }
})();

//App controller
const App = (function(ItemCtrl, UICtrl){
    // Load event Listeners
    const loadEventListeners = function(){
        // Get UI selectors
        const UISelectors = UICtrl.getSelectors();


        //Add item Event
        document.querySelector(UISelectors.addBtn).addEventListener
        ('click' , itemAddSubmit);
    }

    //Add item submit
    const itemAddSubmit  = function(e){
        //Get form input from UI controller
        const input = UICtrl.getItemInput();
       
        //check to see if input is empty
       if(input.name !== '' && input.calories !== '' ){
           const newItem = ItemCtrl.addItem(input.name, input.calories)
           //Add item to UI list
           UICtrl.addListItem(newItem)

           //Get total calories
           const totalCalories = ItemCtrl.getTotalCalories();
           //Add total calories to ui
           UICtrl.showTotalCalories(totalCalories);
           
           //Clear fields
           UICtrl.clearInput();
       }

        e.preventDefault()
    }


    //Public methods
    return {
        init: function(){
            // Fetch items from data structure
            const items = ItemCtrl.getItems();

            // Check if any items
            if(items.length === 0 ){
                UICtrl.hideList()

            } else {
            // populate list with items
            UICtrl.populateitemList(items);
            }
            
            
            //Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            //Add total calories to ui
            UICtrl.showTotalCalories(totalCalories);
           

            // Load event Listeners
            loadEventListeners()
        }
    }
    
})(ItemCtrl , UICtrl);
// Initialize App
App.init()