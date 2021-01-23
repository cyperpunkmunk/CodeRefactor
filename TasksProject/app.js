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
            {id:0, name: "steak dinner" , calories:1200},
            {id:1, name: "eggs" , calories:300}

        ],
        currentItem: null,
        totalCalories: 0
    }

    return{
        logData: function(){
            return data;
            
        }
    }

})();

//UI controller
const UICtrl = (function(){
    
})();

//App comtroller
const App = (function(ItemCtrl, UICtrl){
    return {
        init: function(){
            console.log('Intializing App...')
        }
    }
    
})(ItemCtrl , UICtrl);
// Initialize App
App.init();