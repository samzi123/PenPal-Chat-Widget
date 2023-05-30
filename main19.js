import { CLOSE_ICON, MESSAGE_ICON, TICK_ICON, style } from "./assets4.js";

let loadInterval;

function sendMessage() {
  const inputField = document.getElementById("input");
  const input = inputField.value.trim();
  input != "" && output(input);
  inputField.value = "";
}

document.addEventListener("DOMContentLoaded", () => {
  listenForMessageSend();
});

// adds event listeners on 'enter' key press and send button click
function listenForMessageSend(){
  // listen for enter key press on input field
  const inputField = document.getElementById("input");
  inputField.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
      sendMessage();
    }
  });

  // listen for send button click
  const sendButton = document.getElementById("send-button");
  sendButton.addEventListener("click", function (e) {
    sendMessage();
  });
}

function output(input) {
  let botResponse;

  //botResponse = "botRepl dsf dfsiojdfij dsofij sdf sdf ds df dsf dsf dsf dsf ds fds fd sf dsf fds g fsg fsg fsd gds f dsgjd";
  botResponse = "Hi";
  addChat(input, botResponse);

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

async function addChat(input, botResponse) {
  addChatMessage(false, input, generateUniqueID());

  let botDiv = addChatMessage(true, "", generateUniqueID());
  loader(botDiv);

  // remove "..." after loading message from bot
  clearInterval(loadInterval);
  botDiv.innerHTML = `<span id="bot-response">${botResponse}</span>`;

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

class MessageWidget {
  constructor(position = "bottom-right") {
    this.position = this.getPosition(position);
    this.open = false;
    this.initialize();
    this.injectStyles();
  }

  position = "";
  open = false;
  widgetContainer = null;

  getPosition(position) {
    const [vertical, horizontal] = position.split("-");
    return {
      [vertical]: "30px",
      [horizontal]: "30px",
    };
  }

  async initialize() {
    /**
     * Create and append a div element to the document body
     */
    const container = document.createElement("div");
    container.style.position = "fixed";
    Object.keys(this.position).forEach(
      (key) => (container.style[key] = this.position[key])
    );
    document.body.appendChild(container);

    /**
     * Create a button element and give it a class of button__container
     */
    const buttonContainer = document.createElement("button");
    buttonContainer.classList.add("button__container");

    /**
     * Create a span element for the widget icon, give it a class of 'widget__icon', update it's innerHTML property to an icon which would serve as the widget icon.
     */
    const widgetIconElement = document.createElement("span");
    widgetIconElement.innerHTML = MESSAGE_ICON;
    widgetIconElement.classList.add("widget__icon");
    this.widgetIcon = widgetIconElement;

    /**
     * Create a span element for the close icon, give it a class of 'widget__icon' and 'widget__hidden' which would be removed whenever the widget is closed, update it's innerHTML property to an icon which would serve as the widget icon during that state.
     */
    const closeIconElement = document.createElement("span");
    closeIconElement.innerHTML = CLOSE_ICON;
    closeIconElement.classList.add("widget__icon", "widget__hidden");
    this.closeIcon = closeIconElement;

    /**
     * Append both icons created to the button element and add a `click` event listener on the button to toggle the widget open and close.
     */
    buttonContainer.appendChild(this.widgetIcon);
    buttonContainer.appendChild(this.closeIcon);
    buttonContainer.addEventListener("click", this.toggleOpen.bind(this));

    /**
     * Create a container for the widget and add the following classes:- "widget__hidden", "widget__container"
     */
    this.widgetContainer = document.createElement("div");
    this.widgetContainer.classList.add("widget__hidden", "widget__container");

    /**
     * Invoke the `createWidget()` method
     */
    this.createWidgetContent();

    /**
     * Append the widget's content and the button to the container
     */
    container.appendChild(this.widgetContainer);
    container.appendChild(buttonContainer);
  }

  createWidgetContent() {
    this.widgetContainer.innerHTML = `
      <div class="card">
        <div id="header">
            <h1>Chatbot</h1>
        </div>
        <div id="message-section">
          <div class="message bot" id="bot"><span id="bot-response">Hello. I am listening! Go on..</span></div>
        </div>
        <div id="input-section">
          <input id="input" type="text" placeholder="Type a message" autocomplete="off" autofocus="autofocus"/>
          <button class="send" id="send-button">
            ${TICK_ICON}
          </button>
        </div>
    </div>
    `;
  }

  injectStyles() {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = style;

    document.head.appendChild(styleTag);
  }

  toggleOpen() {
    this.open = !this.open;
    if (this.open) {
      this.widgetIcon.classList.add("widget__hidden");
      this.closeIcon.classList.remove("widget__hidden");
      this.widgetContainer.classList.remove("widget__hidden");
    } else {
      this.createWidgetContent();
      this.widgetIcon.classList.remove("widget__hidden");
      this.closeIcon.classList.add("widget__hidden");
      this.widgetContainer.classList.add("widget__hidden");
      listenForMessageSend();
    }
  }
}

function initializeWidget() {
  return new MessageWidget();
}

initializeWidget();
