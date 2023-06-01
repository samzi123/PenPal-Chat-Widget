var primaryColorHexCode = "#000";
var secondaryColorHexCode = "#fff";
var chatBackgroundHexCode = "#fff";

export const setPrimaryColorHexCode = (code) => {
  primaryColorHexCode = code;
}

export const setSecondaryColorHexCode = (code) => {
  secondaryColorHexCode = code;
}

export const setChatBackgroundHexCode = (code) => {
  chatBackgroundHexCode = code;
}

export const setColorsFromThemeName = (themeName) => {
  switch (themeName) {
    case "dark":
      setPrimaryColorHexCode("#00193b");
      setSecondaryColorHexCode("#e0e0e0");
      setChatBackgroundHexCode("#7b93b5");
      break;
    case "light":
      setPrimaryColorHexCode("#301500");
      setSecondaryColorHexCode("#fff");
      setChatBackgroundHexCode("#ccc");
      break;
    case "light-blue":
      setPrimaryColorHexCode("#005475");
      setSecondaryColorHexCode("#bfffef");
      setChatBackgroundHexCode("#ccc");
      break;
      default:
        setPrimaryColorHexCode("#000");
        setSecondaryColorHexCode("#fff");
        setChatBackgroundHexCode("#fff");
  }
}

export const style = () => {
  return `
    .widget__container * {
      box-sizing: border-box;
    }        

    h3, p, input {
      margin: 0;
      padding: 0;
      background-color: transparent;
    }

    .penpal-input-class::placeholder {
      color: ${primaryColorHexCode};
    }

    .widget__container {
      width: 400px;
      overflow: auto;
      right: -25px;
      bottom: 75px;
      position: absolute;
      transition: max-height .2s ease;
      background-color: #e6e6e6a6;
      border-radius: 10px;
      box-sizing: border-box;
    }

    .widget__icon {
      cursor: pointer;
      width: 60%;
      position: absolute;
      top: 18px;
      left: 16px;
      transition: transform .3s ease;
    }

    .widget__hidden {
      transform: scale(0);
    }
    .button__container {
      border: none;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      cursor: pointer;
      background-color: ${primaryColorHexCode};
    }

    .widget__container.hidden {
      max-height: 0px;
    }

    * {
        font-size: 1.3vw;
        font-family: "Epilogue", sans-serif;
      }
      
      html {
        --scrollbarBG: #fff;
        --thumbBG: #90a4ae;
      }
      
      body .card {
        position: fixed;
        bottom: 100px;
        right: 30px;
        height: 35vw;
        max-height: 400px;
        width: 35vw;
        /*max-width: 400px;*/
        min-width: 200px;
        background-color: ${chatBackgroundHexCode};
        margin-left: 30vw;
        margin-top: 5vw;
        box-shadow: 0 0 18px 8px rgba(0, 0, 0, 0.1), 0 0 32px 32px rgba(0, 0, 0, 0.08);
        z-index: -1;
        border-radius: 10px;
      }

      body .card #header {
        height: 5vw;
        margin-top: 0vh;
        background: ${primaryColorHexCode};
        padding: 0vw;
        border-radius: 10px 10px 0 0;
      }
      body .card #header h1 {
        color: ${secondaryColorHexCode};
        font-size: 2vw;
        top: 100px;
        padding: 1vw;
        margin-top: -0.5vh;
      }
      body .card #message-section::-webkit-scrollbar {
        width: 10px;
      }
      body .card #message-section {
        height: 60%;
        padding: 0 2.5vw;
        overflow-y: auto;
        scrollbar-width: thin;
        scrollbar-color: var(--thumbBG) var(--scrollbarBG);
      }
      body .card #message-section::-webkit-scrollbar-track {
        background: var(--scrollbarBG);
      }
      body .card #message-section::-webkit-scrollbar-thumb {
        background-color: var(--thumbBG);
        border-radius: 6px;
        border: 3px solid var(--scrollbarBG);
      }
      body .card #message-section #bot-response #user-response,
      body .card #message-section .user
      {
        position: relative;
        bottom: 0;
        min-height: 1.5vw;
        line-height: 2.2vw;
        background-color: ${secondaryColorHexCode};
        margin: 1.5vw 0;
      }
      
      body .bot
      {
        position: relative;
        bottom: 0;
        min-height: 1.5vw;
        border: 0.15vw solid #777;
        background-color: ${secondaryColorHexCode};
        border-radius: 0px 1.5vw 1.5vw 1.8vw;
        margin: 1.5vw 0;
      }
      body .card #message-section .user {
        border: 1.5px solid ${primaryColorHexCode};
        border-radius: 1.5vw 0vw 1.5vw 1.8vw;
        background-color: ${primaryColorHexCode};
        float: right;
      }
      body .card #message-section .user #user-response {
        color: ${secondaryColorHexCode};
      }
      body .card #message-section .message {
        color: ${primaryColorHexCode};
        clear: both;
        line-height: 1.2vw;
        font-size: 1.2vw;
        padding: 8px;
        position: relative;
        margin: 8px 0;
        max-width: 85%;
        word-wrap: break-word;
        z-index: 2;
      }
      body .card #input-section {
        z-index: 1;
        padding: 0 2.5vw;
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        overflow: hidden;
        height: 4vw;
        width: 100%;
        position: absolute;
        bottom: 25px;
      }

      body .card #input-section input {
        color: ${primaryColorHexCode};
        min-width: 0.5vw;
        outline: none;
        height: 5vw;
        width: 26vw;
        border-top: none;
        border-left: none;
        border-right: none;
        border-bottom: solid ${primaryColorHexCode} 0.1vw;
      }

      @media screen and (max-width: 600px) {
        * {
            font-size: 3vw;
        }

        body .card #header {
            height: 8vw;
        }
        body .card #header h1 {
            font-size: 4vw;
        }

        body .card {
            height: 60vh;
            width: 80vw;
            max-height: none;
            min-width: none;
        }

        body .card #message-section {
            height: 45vh;
            width: 80vw;
        }

        body .card #input-section {
          overflow: visible;
        }

        body .card #input-section input {
          color: ${primaryColorHexCode};
          min-width: 0.5vw;
          outline: none;
          height: 5vw;
          width: 70vw;
        }

        body .card #message-section .message {
          line-height: 3vw;
        }

        body .card #message-section #bot-response #user-response,
        body .card #message-section .user {
          line-height: 5vw;
        }
      }

      body .card .send {
        background: transparent;
        border: 0;
        cursor: pointer;
        flex: 0 0 auto;
        margin-left: 1.4vw;
        margin-right: 0vw;
        padding: 0;
        position: relative;
        outline: none;
        color: ${primaryColorHexCode};

      }
      body .card .send .circle {
        position: relative;
        width: 4.8vw;
        height: 4.8vw;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${primaryColorHexCode};

      }
      body .card .send .circle i {
        font-size: 3vw;
        margin-left: -1vw;
        margin-top: 1vw;
        color: ${primaryColorHexCode};
      }
    `;
}

// we will not be able to change the color of any of these svg icons
export const MESSAGE_ICON = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#FFFFFF"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
`;

export const CLOSE_ICON = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="#FFFFFF" stroke="#FFFFFF"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
`;

export const TICK_ICON = `
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none" 
    stroke="${primaryColorHexCode}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
  `;
