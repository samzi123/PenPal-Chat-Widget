import { CLOSE_ICON, TICK_ICON, setColorsFromThemeName } from "./assets15.js";
import { initializeRiveAnimation } from "./rive-animation.js"; // Import the Rive animation initialization function

let loadInterval;
var chatbotID = "";
const BASE_URL = "https://sswj8m0la3.execute-api.af-south-1.amazonaws.com/dev/";
let messageWidget;
var chatbotInfo = {};

function sendMessage() {
  const inputField = document.getElementById("penpal-chatbot-widget-input");
  const input = inputField.value.trim();
  input != "" && chatbotID && handleMessageSend(input);
  inputField.value = "";
}

window.setDataFromPage = function (data) {
  chatbotID = data.id;
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
  console.log("requesting chatbot");

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestInfo),
  })
    .then((res) => res.text())
    .then((body) => {
      try {
        const bodyJson = JSON.parse(body);
        console.log("chatbot info: ", bodyJson);
        chatbotInfo = bodyJson;
        document.getElementsByClassName("penpal-header")[0].innerHTML =
          chatbotInfo.chatTitle;
        document.getElementsByClassName("penpal-first-message")[0].innerHTML =
          chatbotInfo.welcomeMessage;
        setColorsFromThemeName(chatbotInfo.colorScheme);
        messageWidget.injectStyles();
        messageWidget.setIsVisible(true);
      } catch {
        console.log("Error fetching");
        throw Error(body);
      }
    })
    .catch((error) => {
      console.log("Error fetching chatbot info:", error);
    });
};

function listenForMessageSend() {
  const inputField = document.getElementById("penpal-chatbot-widget-input");
  inputField.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
      sendMessage();
    }
  });

  const sendButton = document.getElementById(
    "penpal-chatbot-widget-send-button"
  );
  sendButton.addEventListener("click", function (e) {
    sendMessage();
  });
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

async function handleMessageSend(input) {
  addChatMessage(false, input, generateUniqueID());
  let botDiv = addChatMessage(true, "", generateUniqueID());
  loader(botDiv);
  var scroll = document.getElementById("penpal-chatbot-widget-message-section");
  scroll.scrollTop = scroll.scrollHeight;

  await getBotResponse(input)
    .then((res) => res.text())
    .then((body) => {
      try {
        const botResponse = JSON.parse(body).response;
        clearInterval(loadInterval);
        botDiv.innerHTML = `<span id="penpal-chatbot-widget-bot-response">${botResponse}</span>`;
        scrollToBottom();
      } catch {
        throw Error(body);
      }
    })
    .catch((error) => {
      console.log("Error fetching chatbot info:", error);
    });
}

const getBotResponse = async (input) => {
  const url = BASE_URL + "chatbot/generate";
  const requestInfo = {
    input: input,
    chatbotID: chatbotID,
  };

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestInfo),
  });
};

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

const generateUniqueID = () => {
  const timestamp = new Date().getTime();
  const random = Math.floor(Math.random() * 1000000000);
  return `id-${timestamp}-${random}`;
};

const loader = (element) => {
  element.textContent = ".";

  loadInterval = setInterval(() => {
    element.textContent += ".";

    if (element.textContent.length > 3) {
      element.textContent = ".";
    }
  }, 300);
};

class MessageWidget {
  constructor(position = "bottom-right") {
    this.position = this.getPosition(position);
    this.open = false;
    this.initialize();
    this.injectStyles();
    listenForMessageSend();
    window.setDataFromPage({ id: "646330d6c251f7689abd9eb8" });
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
    const container = document.createElement("div");
    container.classList.add("penpal-chatbot-widget-container");
    this.mainContainer = container;
    container.style.position = "fixed";
    Object.keys(this.position).forEach(
      (key) => (container.style[key] = this.position[key])
    );
    document.body.appendChild(container);

    this.widgetContainer = document.createElement("div");
    this.widgetContainer.classList.add(
      "penpal-chatbot-widget-hidden",
      "widget__container"
    );

    this.createWidgetContent();

    container.appendChild(this.widgetContainer);

    this.setIsVisible(false);
  }

  createWidgetContent() {
    // Use Rive animation in place of message icon
    initializeRiveAnimation("riveCanvas");

    // Rest of your chatbot widget content
    this.widgetContainer.innerHTML = `
      <div class="penpal-chatbot-widget-card">
        <!-- Your chatbot widget content -->
      </div>
    `;
  }

  injectStyles() {
    // Your style injection code
  }

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
      // Handle widget opening
    } else {
      // Handle widget closing
    }
  }
}

function initializeWidget() {
  return new MessageWidget();
}

messageWidget = initializeWidget();
