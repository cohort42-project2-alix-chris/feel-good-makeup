// Pseudo Code
// Provide user choice of makeup product type (bronzer, eyliner, etc) combined with tag (vegan, organic) and return a randomized product upon user selection

// Create a namespace object to hold our app
const makeupApp = {};
// Create an empty object within our namespace to hold the API call results 
makeupApp.APIcall = {};
// Create an empty object within our namespace to hold the randomized result 
makeupApp.APIcallRandom = {};

// Make an API call to the Makeup API
makeupApp.getProducts = (type, tag) => {
    makeupApp.url = `http://makeup-api.herokuapp.com/api/v1/products.json/?product_type=${type}&product_tags=${tag}`;
    fetch(makeupApp.url)
        .then((response) => {
            // console.log(response);
            return response.json();
        })
        .then((jsonData) => {
            makeupApp.APIcall = jsonData;
            console.log(jsonData);
            document.querySelector('#product-container').innerHTML = '';
            makeupApp.randomizer(makeupApp.APIcall);
            if (makeupApp.APIcall.length === 0) {
                const errorHeading = document.createElement('h2');
                errorHeading.innerText = `Sorry...`;
                const errorMessage = document.createElement('p');
                errorMessage.innerText = `We currently don't have any product that meets your selection. Please come back later!`;
                document.querySelector("#product-container").append(errorHeading, errorMessage);
            } else {
                makeupApp.displayProducts();
            }
        })
}

makeupApp.randomizer = (makeupArray) => {
    makeupApp.APIcallRandom = makeupArray[Math.floor(Math.random() * makeupArray.length)];
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

    const brand = document.createElement('h3');
    brand.innerText = makeupApp.APIcallRandom.brand;

    const image = document.createElement('img');
    image.src = makeupApp.APIcallRandom.image_link;
    image.alt = makeupApp.APIcallRandom.description;

    document.querySelector('#product-container').append(name, brand, image);
};

// Capture the form and add an event listener on the submit button
makeupApp.events = () => {
    makeupApp.form = document.querySelector('form');
    makeupApp.form.addEventListener('submit', function(e) {
        e.preventDefault();
        makeupApp.getUserSelection();
    })
}

makeupApp.init = () => {
    makeupApp.events();
};

makeupApp.init();