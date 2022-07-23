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
            return response.json();
        })
        .then((jsonData) => {
            makeupApp.APIcall = jsonData;
            document.querySelector('#productContainer').innerHTML = '';
            document.querySelector("#descriptionContainer").innerHTML = '';
            makeupApp.randomizer(makeupApp.APIcall);
            if (makeupApp.APIcall.length === 0) {
                const errorHeading = document.createElement('h2');
                errorHeading.innerText = `Sorry...`;
                const errorMessage = document.createElement('p');
                errorMessage.innerText = `We currently don't have any product that meets your selection. Please come back later!`;
                document.querySelector("#productContainer").append(errorHeading, errorMessage);
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

    const price = document.createElement('p');
    if (makeupApp.APIcallRandom.price !== null && makeupApp.APIcallRandom.price !== '0.0' && makeupApp.APIcallRandom.price !== 0.0) {
        price.innerText = `Price: $${makeupApp.APIcallRandom.price}`;
    } else {
        price.innerText = `Price: unavailable`;
    }

    const rating = document.createElement('p');
    if (makeupApp.APIcallRandom.rating !== null) {
        rating.innerText = `Rating: ${makeupApp.APIcallRandom.rating}`;
    } else {
        rating.innerText = `Rating: unrated`;
    };
    
    // const color = document.createElement('div');
    // color.innerText = makeupApp.APIcallRandom.product_colors.colour_name;
    // const color = document.createElement('p');
    // color.innerText = `${makeupApp.APIcallRandom.product_colors.hex_value} ${makeupApp.APIcallRandom.product_colors.colour_name}`;

    // const color = document.createElement("div");
    // color.innerText = `${nameObject.hex_value} ${nameObject.colour_name}`;

    // const arrayOfColours = makeupApp.APIcallRandom.product_colors.map((nameObject) => {
    //     return `${nameObject.hex_value} ${nameObject.colour_name}`;
    // })

    // console.log(arrayOfColours);

    const image = document.createElement('img');
    image.classList.add('productImage');

    image.src = makeupApp.APIcallRandom.image_link;
    image.alt = `Picture of ${makeupApp.APIcallRandom.name}`;
    image.addEventListener('error', function (event) {
        event.target.src = "./assets/notfound_placeholder.svg";
        event.onerror = null;
    })

    // const description = document.createElement('p');
    // description.innerText = `Description: ${makeupApp.APIcallRandom.description}`;

    document.getElementById('productContainer').append(name, brand, price, rating, image);

    document.getElementById('productContainer').style.padding = '80px'; 

    // document.querySelector('#descriptionContainer').append(description);
}

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
}

makeupApp.init();