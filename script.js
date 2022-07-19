// Pseudo Code

// Create namespace object to hold our app
const makeupApp = {};
makeupApp.APIcall = {};
makeupApp.APIcallRandom = {};
// makeupApp.randomizer = () => { Math.floor(Math.random() * 100 + 1) };
// Create an init method
makeupApp.init = () => {
    makeupApp.events();
    // makeupApp.displayProducts();
}

makeupApp.displayProducts = function () {
    
    if (makeupApp.APIcall.length !== 0) {
        const name = document.createElement('h2');
        name.innerText = makeupApp.APIcallRandom.name;
        console.log('haha')
        const brand = document.createElement('h3');
        brand.innerText = makeupApp.APIcallRandom.brand;

        const price = document.createElement('p');
        price.innerText = makeupApp.APIcallRandom.price;

        const liElement = document.createElement('li');
        liElement.classList.add('product-card');

        liElement.append(name, brand, price);
        document.querySelector('#product-container').appendChild(liElement);
    } else if(makeupApp.APIcall.length === 0){
        alert("you lose");
    }
    }

// Make an API call to the Makeup API
makeupApp.getProducts = (type, tag) => {
    makeupApp.url = `http://makeup-api.herokuapp.com/api/v1/products.json/?product_type=${type}&product_tags=${tag}`;
    fetch(makeupApp.url)
    .then((response) => {
        // get the response object
        console.log(response);
        // parse the info into json
        return response.json();
    })
    .then((jsonData) => {
        // we now have the json data we can work with
        makeupApp.APIcall = jsonData;
        console.log(jsonData);
        // if (jsonData.length == 0) {
        //     alert("I lose");
        // }
        document.querySelector('#product-container').innerHTML = '';
        // makeupApp.displayProducts(jsonData.object);
        // call XXX method
    }).then(() => {
        makeupApp.APIcallRandom = makeupApp.APIcall[Math.floor(Math.random() * makeupApp.APIcall.length)];
    
        if (makeupApp.APIcallRandom){
            makeupApp.displayProducts();
        }

    // }).then(() => {
        
    });
}

// Capture the user selection
makeupApp.getUserSelection = () => {
    const selectedType = document.getElementById('product-type');
    const selectedTag = document.querySelector('#product-tag');

    const selectedTypeValue = selectedType.value;
    const selectedTagValue = selectedTag.value;

    if (selectedTypeValue.length > 0 && selectedTagValue.length > 0) {
        return makeupApp.getProducts(selectedTypeValue, selectedTagValue);

    }

    console.log(selectedTypeValue);
    console.log(selectedTagValue);


}

// Capture form and add event listener on submit button
makeupApp.events = function () {
    // let randomizer
    makeupApp.form = document.querySelector("form");

    makeupApp.form.addEventListener('submit', function(e){
        e.preventDefault();
        makeupApp.getUserSelection();
        makeupApp.getProducts();
        // randomizer = Math.floor(Math.random() * makeupApp.APIcall.length + 1);
        // console.log(makeupApp.APIcall.length);
    })
}


// Display products on page

// makeupApp.displayProducts = function () {
    
//         const name = document.createElement('h2');
//         name.innerText = makeupApp.APIcallRandom.name;

//         const brand = document.createElement('h3');
//         brand.innerText = makeupApp.APIcallRandom.brand;

//         const price = document.createElement('p');
//         price.innerText = makeupApp.APIcallRandom.price;

//         const liElement = document.createElement('li');
//         liElement.classList.add('product-card');

//         liElement.append(name, brand, price);
//         document.querySelector('#product-container').appendChild(liElement);
//     }
// // Add error handling


// Listen to the submit on button to capture the user selection (create event listener)



// Make an AJAX request to retrieve third party API data matching the user selection


// Build a randomizer to randomly select an animal from the returned array


// Display the returned product in a html text element










// Make an API call to zooaminal api
    // return a single random zoo animal object
    // use the / animals / rand endpoint

// A landing page with the app heading 'animalia' and a welcome message 'Learn more about wild animals'



// Calling the init method
makeupApp.init();



// console.log(makeupApp.APIcall[randomizer].name);
