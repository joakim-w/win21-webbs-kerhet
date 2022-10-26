const form = document.querySelector('#messageForm');

const messages = [];

const submitHandler = (e) => {
  e.preventDefault();

  const headlineInput = e.target.querySelector('#messageHeadline');
  const messageBodyInput = e.target.querySelector('#messageBody');
  const imageInput = e.target.querySelector('#messageImage');

  const headline = headlineInput.value;
  const body = messageBodyInput.value;
  const imageUrl = imageInput.value;

  console.log(headline, body, imageUrl);
}

form.addEventListener('submit', submitHandler);