/**
 * listens for form submission and requests from API
 */
function handleFormSubmit() {
  $('#dogForm').submit(function(e){
    e.preventDefault();
    let dogCount = $('#dogInput').val();
    
    requestDogs(dogCount);

  });
}

/**
 * fetches the list of dog images from the API
 * @param count the number of images to pull
 */
function requestDogs(count){
  fetch(`https://dog.ceo/api/breeds/image/random/${count}`)
    .then(response => response.json())
    .then(responseJSON => console.log(responseJSON));
}

$(handleFormSubmit);