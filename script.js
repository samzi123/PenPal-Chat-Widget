let loadInterval;

function sendMessage() {
  const inputField = document.getElementById("input");
  let input = inputField.value.trim();
  input != "" && output(input);
  inputField.value = "";
}
document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input");
  inputField.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
      const input = inputField.value.trim();
      input != "" && output(input);
      inputField.value = "";
    }
  });
});

function output(input) {
  let product;

  //product = "botRepl dsf dfsiojdfij dsofij sdf sdf ds df dsf dsf dsf dsf ds fds fd sf dsf fds g fsg fsg fsd gds f dsgjd";
  product = "Hi";
  addChat(input, product);

  // generate bot response here

}

// returns a new chat message, either from bot or user
const addChatMessage = (isBot, msg, uniqueId) => {
  const mainDiv = document.getElementById("message-section");
  let messageDiv = document.createElement("div");

  const botOrUser = isBot ? "bot" : "user";

  messageDiv.id = uniqueId;
  messageDiv.classList.add("message");
  messageDiv.classList.add(botOrUser);
  messageDiv.innerHTML = `<span id="${botOrUser}-response">${msg}</span>`;
  mainDiv.appendChild(messageDiv);

  return messageDiv;
};

async function addChat(input, product) {
  addChatMessage(false, input, generateUniqueID());

  let botDiv = addChatMessage(true, "", generateUniqueID());
  loader(botDiv);

  // remove "..." after loading message from bot
  clearInterval(loadInterval);
  botDiv.innerHTML = `<span id="bot-response">${product}</span>`;

  //mainDiv.appendChild(botDiv);
  var scroll = document.getElementById("message-section");
  scroll.scrollTop = scroll.scrollHeight;
}

// generates a unique id for each bot message to be able to select it while loading
const generateUniqueID = () => {
  const timestamp = new Date().getTime();
  const random = Math.floor(Math.random() * 1000000000);

  // combine both to generate unique id
  return `id-${timestamp}-${random}`;
};

// to show "..." while loading message from bot
const loader = (element) => {
  element.textContent = '';

  loadInterval = setInterval(() => {
    element.textContent += '.';

    if (element.textContent.length > 3) {
      element.textContent = '';
    }
  }, 300);
};