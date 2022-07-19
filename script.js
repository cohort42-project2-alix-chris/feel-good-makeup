// Pseudo Code

// Create a namespace object to hold our app
const makeupApp = {};
// Create an empty object within our namespace to hold the API call results 
makeupApp.APIcall = {};
// Create an empty object within our namespace to hold the randomized result 
makeupApp.APIcallRandom = {};

// Create an init method to run below methods on page load
makeupApp.init = () => {
    makeupApp.events();
}

// Make an API call to the Makeup API
makeupApp.getProducts = (type, tag) => {
    makeupApp.url = `http://makeup-api.herokuapp.com/api/v1/products.json/?product_type=${type}&product_tags=${tag}`;
    fetch(makeupApp.url)
        .then((response) => {
            return response.json();
        })
        .then((jsonData) => {
            makeupApp.APIcall = jsonData;
            console.log(jsonData);
            document.querySelector('#product-container').innerHTML = '';
        })
        .then(() => {
            makeupApp.APIcallRandom = makeupApp.APIcall[Math.floor(Math.random() * makeupApp.APIcall.length)];
            // error handling procedure will be added here
            if (makeupApp.APIcall.length !== 0) {
                makeupApp.displayProducts();
            } else {
                alert ("you lose again!");
            }
        });
}

// Capture the user selection on the dropdown menus
makeupApp.getUserSelection = () => {
    const selectedTypeValue = document.getElementById('product-type').value;
    const selectedTagValue = document.getElementById('product-tag').value;

    if (selectedTypeValue.length > 0 && selectedTagValue.length > 0) {
        return makeupApp.getProducts(selectedTypeValue, selectedTagValue);
    }
}

// Display randomized product on the page after user clicks on button
makeupApp.displayProducts = () => {
    const name = document.createElement('h2');
    name.innerText = makeupApp.APIcallRandom.name;
    console.log('haha');

    const brand = document.createElement('h3');
    brand.innerText = makeupApp.APIcallRandom.brand;

    const price = document.createElement('p');
    price.innerText = makeupApp.APIcallRandom.price;

    const liElement = document.createElement('li');
    liElement.classList.add('product-card');

    liElement.append(name, brand, price);
    document.querySelector('#product-container').appendChild(liElement);
};

// Capture the form and add an event listener on the submit button
makeupApp.events = () => {
    makeupApp.form = document.querySelector('form');
    makeupApp.form.addEventListener('submit', function(e) {
        e.preventDefault();
        makeupApp.getUserSelection();
        makeupApp.getProducts();
    })
}

makeupApp.init();