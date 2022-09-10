let title = document.getElementById('productname');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let search = document.getElementById('search');
let searchtitle = document.getElementById('searchbytitle');
let searchcategory = document.getElementById('searchbycategory');

let mood = 'create';
let tmp ;



function gettotal(){
    if(price.value !=''){
        let result = (+price.value + +taxes.value) - +discount.value;

        total.innerHTML=result;
        total.style.background='green';
    }else{
        total.innerHTML='';
        total.style.background='red';
    }
}

let datapro;

if(localStorage.product != null){
    datapro = JSON.parse(localStorage.product)
}else{
    datapro=[];
}


submit.onclick = function(){
    let newpro ={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    }
    if(title.value!='' && price.value!='' && category.value!='' && newpro.count<101){
        if(mood ==='create'){
            if(newpro.count>1){
                for(let i=0 ;i<newpro.count;i++){
                    datapro.push(newpro);
    
                }
    
                
            }else{
                datapro.push(newpro);
                total.style.background='none';
    
    
            }
    
    
        }else{
            datapro[tmp]= newpro;
            localStorage.setItem('product',JSON.stringify(datapro));
            mood ='create';
            count.style.display='block';
            submit.innerHTML='Create';
            total.style.background='none';
        }
        cleardata()
        total.style.background='none';



    }



    showdata()
    localStorage.setItem('product',JSON.stringify(datapro));


}

function cleardata(){
    title.value='';
    price.value='';
    taxes.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';

}




function showdata(){
    let table='';
        for(let i = 0 ; i < datapro.length ; i++){
            table +=`   
            <tr>
            <td>${i+1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick='updatedata(${i})' id="update">update</button></td>
            <td><button onclick='deletedata(${i})' id="delete">delete</button></td>
            </tr>`
        }
        document.getElementById('tbody').innerHTML=table;

        let btn = document.getElementById("deleteall");
        if(datapro.length > 0){
            btn.innerHTML=`<button onclick='deleteall()'>Delete all (${datapro.length})</button>`;
        }else{
            btn.innerHTML='';
        }


    }
    showdata()

    function deletedata(i){
        datapro.splice(i,1)
        localStorage.product=JSON.stringify(datapro);
        showdata()

    }

    function deleteall(){
        datapro.splice(0);
        localStorage.clear();
        showdata();
    }

    function updatedata(i){
        title.value = datapro[i].title;
        price.value = datapro[i].price;
        taxes.value = datapro[i].taxes;
        discount.value = datapro[i].discount;
        count.style.display='none';
        category.value = datapro[i].category;
        submit.innerHTML='Update';
        gettotal();
        mood='update';
        tmp =i;
        scroll({
            top:0,
            behavior:'smooth'
        })




    }

    let searchmood= 'title';

    function getsearchmood(id){
        let search = document.getElementById('search');


        if(id == 'searchbytitle'){
            searchmood = 'title';
            search.placeholder ='search by Proname';

        }else{
            searchmood='category';
            search.placeholder ='search by category';

        }
        search.focus();
        search.value='';
        showdata();

    }

    function getseardata(value){
        let table='';
        if(searchmood == 'title'){
            for(let i =0 ; i <datapro.length;i++){
                if(datapro[i].title.includes(value.toLowerCase())){
                    table +=`   
                    <tr>
                    <td>${i+1}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick='updatedata(${i})' id="update">update</button></td>
                    <td><button onclick='deletedata(${i})' id="delete">delete</button></td>
                    </tr>`

                }

            }



        }else{
            for(let i =0 ; i <datapro.length;i++){
                if(datapro[i].category.includes(value.toLowerCase())){
                    table +=`   
                    <tr>
                    <td>${i+1}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick='updatedata(${i})' id="update">update</button></td>
                    <td><button onclick='deletedata(${i})' id="delete">delete</button></td>
                    </tr>`
                }
            }

        }
        document.getElementById('tbody').innerHTML=table;



    }
