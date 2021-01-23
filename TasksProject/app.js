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
            {id:0, name: "Steak dinner" , calories: 1200},
            {id:1, name: "eggs" , calories: 300}

        ],
        currentItem: null,
        totalCalories: 0
    }
    //Public methods
    return {
        getItems: function(){
            return data.items

        },
        logData: function(){
            return data;
            
        }
    }
})();

//UI controller
const UICtrl = (function(){
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

             document.querySelector('#item-list').innerHTML = html ;
        }

    }
})();

//App comtroller
const App = (function(ItemCtrl, UICtrl){
    //Public methods
    return {
        init: function(){
            console.log('Intializing App...');
            const items = ItemCtrl.getItems();

            // populate list with items
            UICtrl.populateitemList(items)
        }
    }
    
})(ItemCtrl , UICtrl);
// Initialize App
App.init();