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
    .then(responseJSON => displayDogImages(responseJSON));
}

function displayDogImages(data) {
  // adding to the dom
  let html = generateImageTemplates(data);
  $('#dogImages').html(html);
}

function generateImageTemplates(data) {
  let html = '';
  const images = data.message;
  images.forEach( image => {
    html += `<img src="${image}">`;
  });
  return html;
}

$(handleFormSubmit);