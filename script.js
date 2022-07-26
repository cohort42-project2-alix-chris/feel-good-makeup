/* Pseudo code */
/* MVP goals */
    // On page load- provide user choice of makeup product type (bronzer, eyeliner, etc) combined with product tag (vegan, organic, etc)
    // After receiving user selection- capture selection values then make API call using captured values
    // After receiving API call result- randomize the result then return a randomized product on display field

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
            return response.json();
        })
        .then((jsonData) => {
            makeupApp.APIcall = jsonData;
            document.querySelector('#productContainer').innerHTML = '';
            makeupApp.randomizer(makeupApp.APIcall);
            // Error handling for empty API call result
            if (makeupApp.APIcall.length === 0) {
                const errorHeading = document.createElement('h2');
                errorHeading.innerText = `Sorry...`;
                const errorMessage = document.createElement('p');
                errorMessage.innerText = `We currently don't have any product that meets your selection. Please come back later!`;
                document.querySelector('#productContainer').append(errorHeading, errorMessage);
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
    const selectedTypeValue = document.getElementById('productType').value;
    const selectedTagValue = document.getElementById('productTag').value;
    // Error handling to eliminate empty value on product type and product tag
    if (selectedTypeValue.length > 0 && selectedTagValue.length > 0) {
        return makeupApp.getProducts(selectedTypeValue, selectedTagValue);
    }
}

// Display a randomized product on the page after user clicks on button
makeupApp.displayProducts = () => {
    const name = document.createElement('h2');
    name.innerText = makeupApp.APIcallRandom.name;
    name.classList.add('productName');

    const price = document.createElement('p');
    // Error handling for empty price value
    if (
        makeupApp.APIcallRandom.price !== null &&
        makeupApp.APIcallRandom.price !== "0.0" &&
        makeupApp.APIcallRandom.price !== 0.0
    ) {
        price.innerText = `Price: $${makeupApp.APIcallRandom.price}`;
    } else {
        price.innerText = `Price: unavailable`;
    }
    price.classList.add('productPrice');

    const rating = document.createElement('p');
    // Error handling for empty rating value
    if (makeupApp.APIcallRandom.rating !== null) {
        rating.innerText = `Rating: ${makeupApp.APIcallRandom.rating}`;
    } else {
        rating.innerText = `Rating: unrated`;
    }

    const image = document.createElement('img');
    image.classList.add('productImage');
    image.src = makeupApp.APIcallRandom.image_link;
    image.alt = `Picture of ${makeupApp.APIcallRandom.name}`;
    // Error handling to display a generic image for products without image
    image.addEventListener('error', function (event) {
        event.target.src = './assets/notfound_placeholder.svg';
        event.onerror = null;
    });

    document.getElementById('productContainer').append(name, price, rating, image);

    document.getElementById('productContainer').style.padding = '40px';
    document.getElementById('productContainer').style.border = '3px dotted #984638';
}

// Capture the selections from the form and add an event listener on the submit button
makeupApp.events = () => {
    makeupApp.form = document.querySelector('form');
    makeupApp.form.addEventListener('submit', function(e) {
        e.preventDefault();
        makeupApp.getUserSelection();
    })
}

makeupApp.init = () => {
    makeupApp.events();
}

makeupApp.init();