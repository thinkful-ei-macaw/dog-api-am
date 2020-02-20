/**
 * Starts all listeners
 */
function init(){
  handleDogFormSubmit();
  handleDogBreedFormSubmit();
  handleRadioButton();
}

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
 * fetches the list of dog images from the API
 * @param count the number of images to pull
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

function displayDogImages(data, element) {
  if (data.status === 'error') {
    alert('Error: ' + data.message);
  } else {
    let html = generateImageTemplates(data);
    $(element).html(html);
  }
}

function generateImageTemplates(data) {
  let html = '';
  const images = typeof data.message === 'string' ? [data.message] : data.message;
  
  images.forEach( image => {
    html += `<img src="${image}">`;
  });
  return html;
}

$(init);