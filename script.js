// Pseudo Code

// Create namespace object to hold our app
const makeupApp = {};
// Create an init method
makeupApp.init = () => {
    // console.log("It works!");
    makeupApp.getUserSelection();
}

// Make an API call to the Makeup API
makeupApp.getProducts = (type, tag) => {
    makeupApp.url = `http://makeup-api.herokuapp.com/api/v1/products.json/?product_type=${type}&product_tags=${tag}`;
    fetch(makeupApp.url)
    .then((response) => {
        // get the response object
        console.log("It work");
        console.log(response);
        // parse the info into json
        return response.json();
    })
    .then((jsonData) => {
        // we now have the json data we can work with
        console.log(jsonData);
        // makeupApp.displayProduct(jsonData.object);
        // call XXX method
    });
}

// Capture the user selection
makeupApp.getUserSelection = () => {
    const selectedType = document.getElementById('product-type');
    const selectedTag = document.querySelector('#product-tag');
    
    const selectedTypeValue = selectedType.value;
    const selectedTagValue = selectedTag.value;

    if (selectedTypeValue.length > 0 && selectedTagValue.length > 0) {

        console.log(selectedTypeValue);
        console.log(selectedTagValue);
        console.log('please work!')

        makeupApp.getProducts(selectedTypeValue, selectedTagValue);
    }
    
    console.log(selectedTypeValue);
    console.log(selectedTagValue);
    
    // const optionSelected = selectedType.selectedOptions[2];
    
    // console.log(optionSelected);
    
    // const userSizeSelection = document.querySelector("input[name=size]:checked");
    // const userPriceSelection = document.querySelector("input[name=price]:checked");
    
    // const selectedTypeValue = selectedType.option;
    // const selectedTagValue = selectedTag.option;
    
}

// Capture form and add event listener on submit button

makeupApp.form = document.querySelector("form");

makeupApp.form.addEventListener('submit', function(e){
    e.preventDefault();
    console.log('yayyyy');
    makeupApp.getUserSelection();
})

// Filter the original array from API call using user selections
// makeupApp.displayProduct = (makeupArray) => {
    
//     makeupArray.filter((makeupObject) => {
//         return makeupObject.price === "5.0";

//     });
//     console.log("tell me something");

// }


// Add error handling


//// Store the user selection into separate variables
// Capture the user selection (2 variables)





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