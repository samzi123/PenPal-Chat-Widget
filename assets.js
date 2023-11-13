var primaryColorHexCode = "#000";
var secondaryColorHexCode = "#ffff";
var chatBackgroundHexCode = "#fff";

export const setPrimaryColorHexCode = (code) => {
  primaryColorHexCode = code;
};

export const setSecondaryColorHexCode = (code) => {
  secondaryColorHexCode = code;
};

export const setChatBackgroundHexCode = (code) => {
  chatBackgroundHexCode = code;
};

export const setColorsFromThemeName = (themeName) => {
  switch (themeName) {
    case "orange":
      setPrimaryColorHexCode("#eb520c");
      setSecondaryColorHexCode("#fcf0e8");
      setChatBackgroundHexCode("#ccc");
      break;
    case "green":
      setPrimaryColorHexCode("#12b32a");
      setSecondaryColorHexCode("#fff");
      setChatBackgroundHexCode("#ccc");
      break;
    case "blue":
      setPrimaryColorHexCode("#0066CC");
      setSecondaryColorHexCode("#D9EBFF");
      setChatBackgroundHexCode("#ccc");
      break;
    case "purple":
      setPrimaryColorHexCode("#b41bde");
      setSecondaryColorHexCode("#fff");
      setChatBackgroundHexCode("#ccc");
      break;
    case "pink":
      setPrimaryColorHexCode("#d6189d");
      setSecondaryColorHexCode("#fff");
      setChatBackgroundHexCode("#ccc");
      break;
    case "light-blue":
      setPrimaryColorHexCode("#1ca8d6");
      setSecondaryColorHexCode("#fff");
      setChatBackgroundHexCode("#ccc");
      break;
    case "red":
      setPrimaryColorHexCode("#cc0a1e");
      setSecondaryColorHexCode("#fff");
      setChatBackgroundHexCode("#ccc");
      break;
    default:
      setPrimaryColorHexCode("#000");
      setSecondaryColorHexCode("#ffffff");
      setChatBackgroundHexCode("#ffffff");
  }
};

export const style = () => {
  return `
    .penpal-chatbot-widget-container .widget__container * {
      box-sizing: border-box;
    }        

    .penpal-chatbot-widget-container {
      z-index: 999999;
    }

    .penpal-chatbot-widget-container h3, p, input {
      margin: 0;
      padding: 0;
      background-color: transparent;
    }

    .penpal-chatbot-widget-container .penpal-input-class::placeholder {
      color: ${primaryColorHexCode};
    }

    .penpal-chatbot-widget-container .widget__container {
      width: 400px;
      height: auto;
      overflow: auto;
      right: 1%;
      bottom: 1%;
      position: absolute;
      transition: max-height .2s ease;
      background-color: #ffffff;  /* Changed this line to full white */
      border-radius: 10px;
      box-sizing: border-box;
  }
  
    .penpal-chatbot-widget-container .widget__icon {
      cursor: pointer;
      width: 60%;
      height: auto;
      position: absolute;
      align-items: center;
      justify-content: center;
      display: flex;
      justify-content: center;
      border-radius: 50%;
      
      transition: transform .3s ease;
    }

    .penpal-chatbot-widget-hidden {
      transform: scale(0);
    }
    .penpal-chatbot-widget-container .button__container {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60px;
      height: 60px;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      background-color: transparent;
      position: absolute;
      bottom: 1%;
      right: 1%;
    }

    .penpal-chatbot-widget-container .button__container .chat-icon,
    .penpal-chatbot-widget-container .button__container .close-icon {
      width: 80px;
      height: auto;
      border-radius: 50%;
      object-fit: contain;
    }

    .penpal-chatbot-widget-container .widget__container.hidden {
      max-height: 0px;
    }

    .penpal-chatbot-widget-container * {
        font-size: 1vw;
        line-height: 1.2;
        // font-family: "Epilogue", sans-serif;
      }

      @media (min-width: 600px) and (max-width: 992px) {
        .penpal-chatbot-widget-container * {
          font-size: 1.6vw;
          line-height: 1.2;
        }
      }
      
      .penpal-chatbot-widget-container html {
        --scrollbarBG: #fff;
        --thumbBG: #90a4ae;
      }
      
      /* main chat section */
      body .penpal-chatbot-widget-container .penpal-chatbot-widget-card { 
        position: fixed;
        bottom: 100px;
        right: 30px;
        height: 35vw;
        max-height: 5ss00px;
        width: 25vw;
        /*max-width: 400px;*/
        min-width: 200px;
        background-color: #ffffff;
        margin-left: 30vw;
        margin-top: 5vw;
        box-shadow: 0 0 18px 8px rgba(0, 0, 0, 0.1), 0 0 32px 32px rgba(0, 0, 0, 0.08);
        z-index: 99999;
        border-radius: 10px;
      }
      @media (min-width: 600px) and (max-width: 992px) {
        body .penpal-chatbot-widget-container .penpal-chatbot-widget-card {
          height: 60vw;
          max-height: 1000px;
          width: 50vw;

        }
      }

      /* top section with Chat name */
      body .penpal-chatbot-widget-container .penpal-chatbot-widget-card #penpal-chatbot-widget-header{
        height: 5vw;
        margin-top: 0vh;
        background: ${primaryColorHexCode};
        padding: 0vw;
        border-radius: 10px 10px 0 0;
      }
      
      /*Company name*/
      body .penpal-chatbot-widget-container .penpal-chatbot-widget-card #penpal-chatbot-widget-header h1 {
        color: ${secondaryColorHexCode};
        font-size: 1.5vw;
        top: 100px;
        padding: 1vw;
        margin-top: -0.5vh;
      }
      body .penpal-chatbot-widget-container .penpal-chatbot-widget-card #penpal-chatbot-widget-message-section::-webkit-scrollbar {
        width: 10px;
      }
      body .penpal-chatbot-widget-container .penpal-chatbot-widget-card #penpal-chatbot-widget-message-section {
        height: 70%;
        padding: 0 2.5vw;
        overflow-y: auto;
        scrollbar-width: thin;
        scrollbar-color: var(--thumbBG) var(--scrollbarBG);
      }
      body .penpal-chatbot-widget-container .penpal-chatbot-widget-card #penpal-chatbot-widget-message-section::-webkit-scrollbar-track {
        background: var(--scrollbarBG);
      }
      body .penpal-chatbot-widget-container .penpal-chatbot-widget-card #penpal-chatbot-widget-message-section::-webkit-scrollbar-thumb {
        background-color: var(--thumbBG);
        border-radius: 6px;
        border: 3px solid var(--scrollbarBG);
      }
      body .penpal-chatbot-widget-container .penpal-chatbot-widget-card #penpal-chatbot-widget-message-section #penpal-chatbot-widget-bot-response #penpal-chatbot-widget-user-response,
      body .penpal-chatbot-widget-container .penpal-chatbot-widget-card #penpal-chatbot-widget-message-section .penpal-chatbot-widget-user
      {
        position: relative;
        bottom: 0;
        min-height: 1.5vw;
        line-height: 2.2vw;
        background-color: ${secondaryColorHexCode};
        margin: 1.5vw 0;
      }
      
      /* Message from Chatbot */
      body .penpal-chatbot-widget-container .penpal-chatbot-widget-bot {
          position: relative;
          bottom: 0;
          padding: 2vw 2vw;  /* Added padding for top/bottom and left/right */
          min-height: 1.5vw;
          background-color: ${secondaryColorHexCode};
          border-radius: 1.5vw 1.5vw 1.5vw 1.5vw;
          margin: 1.5vw 0;
      }
      
      body .penpal-chatbot-widget-container .penpal-chatbot-widget-card #penpal-chatbot-widget-message-section .penpal-chatbot-widget-user {
        border: 1.5px solid ${primaryColorHexCode};
        border-radius: 1.5vw 1.5vw 1.5vw 1.5vw;
        background-color: ${primaryColorHexCode};
        float: right;
      }
      body .penpal-chatbot-widget-container .penpal-chatbot-widget-card #penpal-chatbot-widget-message-section .penpal-chatbot-widget-user #penpal-chatbot-widget-user-response {
        color: ${secondaryColorHexCode};
      
      }
      body .penpal-chatbot-widget-container .penpal-chatbot-widget-card #penpal-chatbot-widget-message-section .penpal-chatbot-widget-message {
        color: ${primaryColorHexCode};
        clear: both;
        border: 1.5px solid ${primaryColorHexCode};
        line-height: 1.2vw;
        font-size: 1vw;
        padding: 12px;
        position: relative;
        margin: 8px 0;
        max-width: 85%;
        word-wrap: break-word;
        z-index: 9999;
      }

      /* For the type message section*/
      body .penpal-chatbot-widget-container .penpal-chatbot-widget-card #penpal-chatbot-widget-input-section {
        z-index: 0;
        padding: 0 2.5vw;
      
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        overflow: hidden;
        height: 8vw;
        width: 100%;
        position: absolute;
        bottom: 20px;
        background-color: #ffffff;
      }

      @media (max-width: 600px){
        body .penpal-chatbot-widget-container .penpal-chatbot-widget-card #penpal-chatbot-widget-input-section {
        min-height: 12vw;
        }

      }

      @media (max-width: 601px) and (max-width: 992px){
        body .penpal-chatbot-widget-container .penpal-chatbot-widget-card #penpal-chatbot-widget-input-section {
        min-height: 12vw;
        }

      }

      body .penpal-chatbot-widget-container .penpal-chatbot-widget-card #penpal-chatbot-widget-input-section input {
        color: ${primaryColorHexCode};
        min-width: 0.5vw;
        outline: none;
        width: 100%;
        height: 40%;
        padding: 1vw 1.5vw;
        border: none;
        border-radius: 1vw;
        border: 1px solid #ffffff;
        background-color: #f3f3f3;
        font-size: 1vw;
       
    }

    @media (max-width: 600px){
      body .penpal-chatbot-widget-container .penpal-chatbot-widget-card #penpal-chatbot-widget-input-section input {
        min-height: 8vw;
        min-width: 100%;
        font-size: 4vw;
        border-radius: 2vw;

      }
    }

    @media (min-width: 601px) and (max-width: 992px){
      body .penpal-chatbot-widget-container .penpal-chatbot-widget-card #penpal-chatbot-widget-input-section input {
        height: 60%;
        width: 100%;
        font-size: 2vw;

      }
    }


    

    
    
    body .penpal-chatbot-widget-container .penpal-chatbot-widget-card #penpal-chatbot-widget-input-section input:focus {
       
        border: 1px solid #7393B3;   
        background-color: #ffffff;  
        padding: 1vw 1.5vw;
    }
    
      @media screen and (max-width: 600px) {
        .penpal-chatbot-widget-container * {
            font-size: 4vw;
        }

        body .penpal-chatbot-widget-container .penpal-chatbot-widget-card #penpal-chatbot-widget-header {
            height: 8vw;
        }
        body .penpal-chatbot-widget-container .penpal-chatbot-widget-card #penpal-chatbot-widget-header h1 {
            font-size: 4vw;
        }

        body .penpal-chatbot-widget-container .penpal-chatbot-widget-card {
            height: 60vh;
            width: 80vw;
            max-height: none;
            min-width: none;
        }

        body .penpal-chatbot-widget-container .penpal-chatbot-widget-card #penpal-chatbot-widget-message-section {
            height: 45vh;
            width: 80vw;
        }

        body .penpal-chatbot-widget-container .penpal-chatbot-widget-card #penpal-chatbot-widget-input-section {
          overflow: visible;
        }
        
        body .penpal-chatbot-widget-container .penpal-chatbot-widget-card #penpal-chatbot-widget-input-section input {
          z-index: 99999;
          color: ${primaryColorHexCode};
          min-width: 0.5vw;
          outline: none;
          height: 5vw;
          width: 70vw;
        }

        body .penpal-chatbot-widget-container .penpal-chatbot-widget-card #penpal-chatbot-widget-message-section .penpal-chatbot-widget-message {
          line-height: 3vw;
        }

        body .penpal-chatbot-widget-container .penpal-chatbot-widget-card #penpal-chatbot-widget-message-section #penpal-chatbot-widget-bot-response #penpal-chatbot-widget-user-response,
        body .penpal-chatbot-widget-container .penpal-chatbot-widget-card #penpal-chatbot-widget-message-section .penpal-chatbot-widget-user {
          line-height: 5vw;
        }
      }

      body .penpal-chatbot-widget-container .penpal-chatbot-widget-card .penpal-chatbot-widget-send {
        background: transparent;
        border: 0;
        cursor: pointer;
        flex: 0 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 1.4vw;
        margin-right: 0vw;
        padding: 0;
        position: relative;
        outline: none;
        color: ${primaryColorHexCode};

      }
  

    /* For the send icon */
    body .penpal-chatbot-widget-send:hover .tick-icon path {
      stroke: ${primaryColorHexCode};  
  }

  body .tick-icon {
    width: 6vw;
    height: 3vw;
    max-width: 40px;
    min-width: 10px;
    max-height: 50px;
    min-height:10px;
    display: block;
    margin: auto;
}

@media (max-width: 600px){
  body .tick-icon {
    width: 8vw;
    height: 7vw;
  }
}

@media (min-width: 601px) and (max-width: 992px){
  body .tick-icon {
    width: 8vw;
    height: 4vw;
  }
}
  
    
      body .penpal-chatbot-widget-container .penpal-chatbot-widget-card .penpal-chatbot-widget-send .penpal-chatbot-widget-circle i {
        font-size: 3vw;
        margin-left: -1vw;
        margin-top: 1vw;
        color: ${primaryColorHexCode};
      }
    `;
};

// we will not be able to change the color of any of these svg icons
export const MESSAGE_ICON = `
<img src ="/assets/chat-01.png" class="chat-icon"/>
`;
export const CLOSE_ICON = `
<img src ="/assets/chat-02.png" class="close-icon"/>
`;
export const TICK_ICON = `
<svg class="tick-icon" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
<path d="M19.5 35.75C28.4746 35.75 35.75 28.4746 35.75 19.5C35.75 10.5254 28.4746 3.25 19.5 3.25C10.5254 3.25 3.25 10.5254 3.25 19.5C3.25 28.4746 10.5254 35.75 19.5 35.75Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19.5 25.1875V15.4375" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.625 18.6875L19.5 13.8125L24.375 18.6875" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
