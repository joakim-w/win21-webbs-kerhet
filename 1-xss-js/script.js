const form = document.querySelector('#messageForm');
const output = document.querySelector('#output');

const messages = [
  // {
  //   headline: 'En rubrik', 
  //   body: 'meddelande', 
  //   imageUrl: 'https://images.unsplash.com/photo-1661961112835-ca6f5811d2af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2344&q=80'
  // },
  {
    headline: 'Message Headline', 
    body: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque itaque illum quam! Error deserunt quaerat quam perspiciatis debitis consectetur quibusdam maxime quasi iusto, nam doloribus asperiores, soluta laborum, voluptates vitae?', 
    imageUrl: 'https://images.unsplash.com/photo-1666679643373-f2e184deefce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80'
  },
];

const htmlEncode = (dirty) => {
  const encoded = dirty.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/&/g, '&amp;').replace(/'/g, '&apos;').replace(/onerror/g, '')
  console.log(dirty);
  console.log(encoded);
  return encoded;
}

const createMessageElement = message => {

  const encodedBody = htmlEncode(message.body)

  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message');

  const messageHeader = document.createElement('header');
  messageHeader.classList.add('message-header');

  const imgContainer = document.createElement('div');
  imgContainer.classList.add('img-container');

  const img = document.createElement('img');
  img.setAttribute('src', message.imageUrl);

  const headline = document.createElement('h2');
  headline.innerText = message.headline;

  const messageBody = document.createElement('div');
  messageBody.classList.add('message-body');
  messageBody.innerHTML = encodedBody;

  imgContainer.appendChild(img);
  messageHeader.appendChild(imgContainer);
  messageHeader.appendChild(headline);
  messageDiv.appendChild(messageHeader);
  messageDiv.appendChild(messageBody);

  return messageDiv;
}

const renderMessage = (message) => {

  // output.insertAdjacentHTML('beforeend', `
  //   <div class="message">
  //     <header class="message-header">
  //       <div class="img-container">
  //         <img src="${message.imageUrl}" alt="">
  //       </div>
  //       <h2>${message.headline}</h2>
  //     </header>
  //     <div class="message-body">
  //       ${message.body}
  //     </div>
  //   </div>
  // `)

  output.appendChild(createMessageElement(message));

}

const renderMessages = () => {
  output.innerHTML = ''

  for(const message of messages) {
  //   output.insertAdjacentHTML('beforeend', `
  //   <div class="message">
  //     <header class="message-header">
  //       <div class="img-container">
  //         <img src="${message.imageUrl}" alt="">
  //       </div>
  //       <h2>${message.headline}</h2>
  //     </header>
  //     <div class="message-body">
  //       ${message.body}
  //     </div>
  //   </div>
  // `)
  output.appendChild(createMessageElement(message));
  }
}

renderMessages()

const submitHandler = (e) => {
  e.preventDefault();

  const headlineInput = e.target.querySelector('#messageHeadline');
  const messageBodyInput = e.target.querySelector('#messageBody');
  const imageInput = e.target.querySelector('#messageImage');

  const headline = headlineInput.value;
  const body = messageBodyInput.value;
  const imageUrl = imageInput.value;

  if(
    !headline ||
    !body ||
    !imageUrl ||
    headline.trim().length === 0 ||
    body.trim().length === 0 ||
    imageUrl.trim().length === 0
  ) {
    e.target.querySelector('#errorMessage').classList.remove('d-none');
    return
  }

  e.target.querySelector('#errorMessage').classList.add('d-none');

  const message = {
    headline,
    body,
    imageUrl
  }
  messages.push(message);
  console.log(messages);

  e.target.reset();

  renderMessage(message);

}

form.addEventListener('submit', submitHandler);