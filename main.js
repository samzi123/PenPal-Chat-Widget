import {
  CLOSE_ICON,
  MESSAGE_ICON,
  TICK_ICON,
  style,
  setColorsFromThemeName,
} from "./assets.js";

//let loadInterval;
var chatbotID = "";
// const BASE_URL = "http://localhost:5001/dev/";
const BASE_URL = "https://95qzvnunb8.execute-api.us-east-1.amazonaws.com/production/";
//const BASE_URL = "https://d63iu0tya8.execute-api.us-east-1.amazonaws.com/dev/";
let messageWidget;
var chatbotInfo = {};

function sendMessage() {
  const inputField = document.getElementById("penpal-chatbot-widget-input");
  const input = inputField.value.trim();
  input != "" && chatbotID && handleMessageSend(input);
  inputField.value = "";
}

//formats text to have newlines (they somehow get removed in GPT's responses)
function NewlineText(text) {
  let newText = "";
  const textSplit = text.split("\n");

  for (let i = 0; i < textSplit.length; i++) {
    if (textSplit[i] === undefined) continue;
    newText += `<p>${textSplit[i]}</p>`;
  }
  newText = `<p>${newText}</p>`;

  return newText;
}

// Function to receive and process data from the page
window.setDataFromPage = function (data) {
  // Process the data as needed
  chatbotID = data.id;
  //chatbotID = "646330d6c251f7689abd9eb8";
  getChatbotInfo();
};

const getChatbotInfo = async () => {
  if (!chatbotID) {
    console.log("No chatbot ID found.");
    return;
  }
  const url = BASE_URL + "chatbot/get_public_info";
  const requestInfo = {
    chatbotID: chatbotID,
  };

  // fetch chatbot info
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify(requestInfo),
    }).then(res => res.text())
      .then(body => {
        try {
          chatbotInfo = JSON.parse(body);

          if ((chatbotInfo?.status && chatbotInfo.status !== "active")) {
            return;
          }

          // check chatbot message limits
          if (chatbotInfo.messageLimit <= chatbotInfo.messageCount.count && new Date().getMonth() === chatbotInfo.messageCount.currentMonth) {
            console.log("Message limit reached. Not showing chatbot.");
            return;
          }

          document.getElementsByClassName("penpal-header")[0].innerHTML = chatbotInfo.chatTitle;
          document.getElementsByClassName("penpal-first-message")[0].innerHTML = chatbotInfo.welcomeMessage;
          setColorsFromThemeName(chatbotInfo.colorScheme);

        // need to inject styles after setting colors
        messageWidget.injectStyles();
        messageWidget.setIsVisible(true);
      } catch (error) {
        console.log("Error fetching. Error: " + error);
        throw Error(body);
      }
    })
    .catch((error) => {
      console.log("Error fetching chatbot info:", error);
    });
};

// adds event listeners on 'enter' key press and send button click
function listenForMessageSend() {
  // listen for enter key press on input field
  const inputField = document.getElementById("penpal-chatbot-widget-input");
  inputField.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
      sendMessage();
    }
  });

  // listen for send button click
  const sendButton = document.getElementById(
    "penpal-chatbot-widget-send-button"
  );
  sendButton.addEventListener("click", function (e) {
    sendMessage();
  });

  scrollToBottom();
}

async function handleMessageSend(input) {
  addChatMessage(false, input, generateUniqueID());

  let botDiv = addChatMessage(true, "", generateUniqueID());
  const loadInterval = loader(botDiv);
  var scroll = document.getElementById("penpal-chatbot-widget-message-section");
  scroll.scrollTop = scroll.scrollHeight;

  await getBotResponse(input)
    .then((res) => res.text())
    .then((body) => {
      try {
        const botResponse = JSON.parse(body).response;

        // remove "..." after loading message from bot
        clearInterval(loadInterval);
        botDiv.innerHTML = `<span id="penpal-chatbot-widget-bot-response">${NewlineText(
          botResponse
        )}</span>`;
      } catch {
        throw Error(body);
      }
    })
    .catch((error) => {
      console.log("Error fetching chatbot info:", error);
    });

  // Scroll to the bottom of the chat message container
  scrollToBottom();
}

const scrollToBottom = () => {
  const messageContainer = document.getElementById(
    "penpal-chatbot-widget-message-section"
  );
  if (messageContainer) {
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }
};

// returns bot's response to a particular user input (as promise)
const getBotResponse = async (input) => {
  const url = BASE_URL + "chatbot/generate";
  const requestInfo = {
    input: input,
    chatbotID: chatbotID,
    chatID: messageWidget.chatID,
    sourceUrl: window.location.href,
  };

  // generate bot response
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestInfo),
  });
};

// returns a new chat message, either from bot or user
const addChatMessage = (isBot, msg, uniqueId) => {
  const mainDiv = document.getElementById(
    "penpal-chatbot-widget-message-section"
  );
  let messageDiv = document.createElement("div");
  const botOrUser = isBot ? "bot" : "user";

  messageDiv.id = uniqueId;
  messageDiv.classList.add("penpal-chatbot-widget-message");
  messageDiv.classList.add("penpal-chatbot-widget-" + botOrUser);
  messageDiv.innerHTML = `<span id="penpal-chatbot-widget-${botOrUser}-response">${msg}</span>`;
  mainDiv.appendChild(messageDiv);

  return messageDiv;
};

// generates a unique id for each bot message to be able to select it while loading
const generateUniqueID = () => {
  const timestamp = new Date().getTime();
  const random = Math.floor(Math.random() * 1000000000);

  // combine both to generate unique id
  return `id-${timestamp}-${random}`;
};

// to show "..." while loading message from bot
const loader = (element) => {
  element.textContent = ".";

  const loadInterval = setInterval(() => {
    element.textContent += ".";

    if (element.textContent.length > 3) {
      element.textContent = ".";
    }
  }, 300);

  return loadInterval;
};

class MessageWidget {
  constructor(position = "bottom-right") {
    // TODO: remove before publishing
    //  window.setDataFromPage({id: "64e91363bdc85ca71626f200"});

    this.position = this.getPosition(position);
    this.open = false;
    this.chatID = generateUniqueID();
    this.initialize();
    this.injectStyles();
    listenForMessageSend();
  }

  position = "";
  open = false;
  widgetContainer = null;
  chatID = "";

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
    container.classList.add("penpal-chatbot-widget-container");
    this.mainContainer = container;
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
     * Create a span element for the close icon, give it a class of 'widget__icon' and 'penpal-chatbot-widget-hidden' which would be removed whenever the widget is closed, update it's innerHTML property to an icon which would serve as the widget icon during that state.
     */
    const closeIconElement = document.createElement("span");
    closeIconElement.innerHTML = CLOSE_ICON;
    closeIconElement.classList.add(
      "widget__icon",
      "penpal-chatbot-widget-hidden"
    );
    this.closeIcon = closeIconElement;

    /**
     * Append both icons created to the button element and add a `click` event listener on the button to toggle the widget open and close.
     */
    buttonContainer.appendChild(this.widgetIcon);
    buttonContainer.appendChild(this.closeIcon);
    buttonContainer.addEventListener("click", this.toggleOpen.bind(this));

    /**
     * Create a container for the widget and add the following classes:- "penpal-chatbot-widget-hidden", "widget__container"
     */
    this.widgetContainer = document.createElement("div");
    this.widgetContainer.classList.add(
      "penpal-chatbot-widget-hidden",
      "widget__container"
    );

    /**
     * Invoke the `createWidget()` method
     */
    this.createWidgetContent();

    /**
     * Append the widget's content and the button to the container
     */
    container.appendChild(this.widgetContainer);
    container.appendChild(buttonContainer);

    // not visible until load chatbot info
    this.setIsVisible(false);
  }

  createWidgetContent() {
    this.widgetContainer.innerHTML = `
      <div class="penpal-chatbot-widget-card">
        <div id="penpal-chatbot-widget-header">
            <h1 class="penpal-header">${chatbotInfo.chatTitle || ""}</h1>
        </div>
        <div id="penpal-chatbot-widget-message-section">
          <div class="penpal-chatbot-widget-message penpal-chatbot-widget-bot" id="penpal-chatbot-widget-bot"><span id="penpal-chatbot-widget-bot-response" class="penpal-first-message">${
            chatbotInfo && chatbotInfo?.welcomeMessage
          }</span></div>
        </div>
        <div id="penpal-chatbot-widget-input-section">
          <input id="penpal-chatbot-widget-input" class="penpal-input-class" type="text" placeholder="Type a message" autocomplete="off" autofocus="autofocus"/>
          <button class="penpal-chatbot-widget-send" id="penpal-chatbot-widget-send-button">
            ${TICK_ICON}
          </button>
        </div>
    </div>
    `;
  }

  injectStyles() {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = style();

    document.head.appendChild(styleTag);
  }

  // set whether the widget is visible or not
  // only visible once the chatbot info has been loaded
  setIsVisible(isVisible) {
    if (isVisible) {
      this.mainContainer.classList.remove("penpal-chatbot-widget-hidden");
    } else {
      this.mainContainer.classList.add("penpal-chatbot-widget-hidden");
    }
  }

  toggleOpen() {
    this.open = !this.open;
    if (this.open) {
      this.widgetIcon.classList.add("penpal-chatbot-widget-hidden");
      this.closeIcon.classList.remove("penpal-chatbot-widget-hidden");
      this.widgetContainer.classList.remove("penpal-chatbot-widget-hidden");
    } else {
      this.createWidgetContent();
      this.widgetIcon.classList.remove("penpal-chatbot-widget-hidden");
      this.closeIcon.classList.add("penpal-chatbot-widget-hidden");
      this.widgetContainer.classList.add("penpal-chatbot-widget-hidden");
      listenForMessageSend();
    }
  }
}

function initializeWidget() {
  return new MessageWidget();
}

messageWidget = initializeWidget();
