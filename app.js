const ordersList = document.querySelector('#order-list'); 
const form = document.querySelector('#add-order-form'); //adding data

//create elements and render orders
function renderOrder(doc){
    let li = document.createElement('li'); //to call the doc
    let customer = document.createElement('span');
    let itemid = document.createElement('span');
    let cross =document.createElement('div');


    //set an attribute to the li tag (which is the doc id)
    li.setAttribute('data-id', doc.id)
    customer.textContent = doc.data().customer;
    itemid.textContent = doc.data().itemid;
    cross.textContent = 'x';

    li.appendChild(customer);
    li.appendChild(itemid);
    li.appendChild(cross); //deletes item

    ordersList.appendChild(li);

    //deleting orders
    cross.addEventListener('click', (e) => {
      e.stopPropagation();
      let id =e.target.parentElement.getAttribute('data-id'); //gets id from li tag
      db.collection('orders').doc(id).delete(); //grabs the doc and deletes
    })
}

//gets data
db.collection('orders').get().then((snapshot) => { //getting reference from order collection
  snapshot.docs.forEach(doc => {
    renderOrder(doc); //cycles through each doc to render the doc
  })

}) //reference to orders db 

// saving(adding) data
form.addEventListener('submit', (e) => {
  e.preventDefault();
  db.collection('orders').add({
    customer: form.customer.value,
    itemid: form.itemid.value
  });
  form.customer.value='';
  form.itemid.value='';
})




