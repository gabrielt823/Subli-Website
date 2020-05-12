
const guideList = document.querySelector('.guides'); //setups guides(orders)
const loggedOutLinks = document.querySelectorAll('.logged-out');//toggles loggedin content
const loggedInLinks = document.querySelectorAll('.logged-in'); //toggles loggedout content
const accountDetails = document.querySelector('.account-details');//admin account details
const adminItems = document.querySelectorAll('.admin');//toggles admin tools

const setupUI = (user) => {
  if (user) { //logged in
    if(user.admin){
      adminItems.forEach(item => item.style.display = 'block');
    }
    //acount information
    db.collection('users').doc(user.uid).get().then(doc => {
     const html = `
      <div>Logged In as ${user.email}</div>
      <div class="pink-text">${user.admin ? 'Admin' : ''}</div>  
    `;
    accountDetails.innerHTML = html; //display account
    })
    
    //ui elements
    loggedInLinks.forEach(item => item.style.display = 'block'); //item is every link, shown if logged in
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else { //logged out 
    adminItems.forEach(item => item.style.display = 'none');
    accountDetails.innerHTML = '';
    //  ui elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
}


//setups orders to be displayed/hidden
const setupGuides = (data) => {

  if(data.length){
  let html =  '';
  data.forEach(doc => {
    const guide = doc.data();
    //backticks are used to create a temp string to dynamiccaly output data outside thcurly bracelts
    const li = `
      <li>
      <div class="collapsible-header grey lighten-4">${guide.title}</div> 
        <div class="collapsible-body white">${guide.content}</div>
      </li>
    `;
    //This displays the data on the li lines
    html += li 
  });

  guideList.innerHTML = html;
  } else {
    guideList.innerHTML = '<h5 class="center-allign">Login to View your Orders</h5>'
  }
}
// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});

