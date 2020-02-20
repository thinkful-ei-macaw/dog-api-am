/**
 * starts all listeners
 */
function init(){
  handleDogFormSubmit();
  handleDogBreedFormSubmit();
  handleRadioButton();
}

/**
 * detects radio button click to switch current view
 */
function handleRadioButton() {
  $('#screen input').on('change', function(e){
    let selected = $(e.currentTarget).val();
    $('section').addClass('hidden');
    $(selected).removeClass('hidden');
  })
}

/**
 * listens for form submission of dog number form and requests from API
 */
function handleDogFormSubmit() {
  $('#dogForm').submit(function(e){
    e.preventDefault();
    let dogCount = $('#dogInput').val();  
    requestDogs(dogCount, 'count', '#dogImages');
  });
}

/**
 * listens for form submission of dog breed form and requests from API
 */
function handleDogBreedFormSubmit() {
  $('#dogBreedForm').submit(function(e){
    e.preventDefault();
    let dogBreed = $('#dogBreed').val();  
    requestDogs(dogBreed, 'breed', '#dogBreedImages');
  });
}

/**
 * creates and submits a fetch request to the Dogs API
 * @param {*} value value to submit with fetch
 * @param {string} type 'count' or 'breed', determines type of request to be made
 * @param {string} element selector for element to hold images
 */
function requestDogs(value, type, element){
  let request = '';
  if (type === 'count') {
    request = `https://dog.ceo/api/breeds/image/random/${value}`;
  } else {
    request = `https://dog.ceo/api/breed/${value}/images/random`;
  }

  fetch(request)
    .then(response => response.json())
    .then(responseJSON => displayDogImages(responseJSON, element))
    .catch(() => alert('Something went wrong. Try again later.'));
}

/**
 * takes in JSON response and renders images to DOM
 * @param {JSON} data the returned JSON response
 * @param {string} element selector for element to hold images
 */
function displayDogImages(data, element) {
  if (data.status === 'error') {
    alert('Error: ' + data.message);
  } else {
    let html = generateImageTemplates(data);
    $(element).html(html);
  }
}

/**
 * converts a JSON object into a list of HTML images
 * @param {JSON} data the JSON data to be converted to HTML
 */
function generateImageTemplates(data) {
  let html = '';
  const images = typeof data.message === 'string' ? [data.message] : data.message;
  
  images.forEach( image => {
    html += `<img src="${image}">`;
  });
  return html;
}

$(init);