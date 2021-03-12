window.onload = function(){
   myform = document.getElementById('myform')
   
   dynamicHere = document.getElementById('dynamicHere')
    cardBody = document.getElementsByClassName("card-body")[0]
   myform.addEventListener('submit',function(e){
       e.preventDefault();
       passengerId = document.getElementById('passengerId').value
       passengerName = document.getElementById('passengerName').value
       address = document.getElementById('address').value
       age = document.getElementById('age').value
       gender = document.getElementById('gender').value
       distination = document.getElementById('distination').value


       if(passengerId == "" || passengerName == "" ||  address == "" || age == "" || gender == "" || distination == ""){
        UI.messages("Must Enter All Feilds Before Submit", "Danger");
        return
       }else{
        var book = new Book(passengerId, passengerName, address, age, gender, distination)
    //    console.log(book)
       UI.displayData(book)
       Store.setStored(book)
       
       UI.clearfields()
       UI.messages("Data Inserted", "Success")
    //    alert("You clicked Submit")
       }
       })


       dynamicHere.addEventListener("click",function(e){
        //    e.target.classList.contains("removeIt")
        UI.removeRow(e.target)
       })




   class Book {
    constructor(passengerId, passengerName, address, age, gender, distination){
        this.passengerId = passengerId
        this.passengerName = passengerName
        this.address = address
        this.age = age
        this.gender = gender
        this.distination = distination
    }
   }
   class UI {
       static clearfields(){
        document.getElementById('passengerId').value = ""
        document.getElementById('passengerName').value = ""
        document.getElementById('address').value = ""
        document.getElementById('age').value = ""
        document.getElementById('gender').value = ""
        document.getElementById('distination').value = ""

       }
       static displayData(book) {
// get the value from localStorage here
        let record = Store.getStored()
        record.push(book)
        UI.populateRow(record)
       }
       static populateRow(record) {
        // clear before inserting
        // while(dynamicHere.firstChild){
        //     dynamicHere.firstChild.remove(dynamicHere.firstChild)
        // }
        //    array
        record.forEach(onebyone=> {
        dynamicHere.innerHTML += '<tr>\
        <td>'+onebyone.passengerId+'</td>\
        <td>'+onebyone.age+'</td>\
        <td>'+onebyone.passengerName+'</td>\
        <td>'+onebyone.address+'</td>\
        <td>'+onebyone.gender+'</td>\
        <td>'+onebyone.distination+'</td><td>\
        <button class="btn btn-danger removeIt">X</button></td></tr>';

        })
        
        
       }


       


       static messages(txt,className){
           let div = document.createElement('div')
           div.className = "alert alert-"+className;
           div.innerText = txt;
           cardBody.insertBefore(div, myform)


           setTimeout(function(){
               div.remove()
           },2000)

       }
       static removeRow(element){
           if(element.classList.contains("removeIt")){
              let age = element.parentElement.parentElement.firstElementChild.innerText;
               Store.removeStoredValue(age)
               element.parentElement.parentElement.remove();
           }
       }
   }



   class Store{
    static getStored(){
        let record = ""
        if(localStorage.getItem("book") == null){
             record = []
        }else{
             record = JSON.parse(localStorage.getItem("book"))
        }
        return record
    }

    static setStored(obj) {
        let recordFromLocal = Store.getStored()
        recordFromLocal.push(obj)
        localStorage.setItem("record",JSON.stringify(recordFromLocal))
    }

    static removeStoredValue (age){
        // remove the value which has same age
        let Allrecord = Store.getStored()
        Allrecord.forEach(function(onebyone,index){
            if(onebyone.age == age){
                Allrecord.splice(index, 1)
            }
            
        })
        localStorage.setItem("record",JSON.stringify(Allrecord))
    }

   }
   UI.populateRow(Store.getStored())

}