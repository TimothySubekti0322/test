const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store user's message
const API_KEY = "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"; // Paste your API key here
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
  // Create a chat <li> element with passed message and className
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", `${className}`);
  let chatContent =
    className === "outgoing"
      ? `<p></p>`
      : `<img class="object-contain h-20 w-20" src="../public/assets/Mascot/7.png"><p></p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi; // return chat <li> element
};

const generateResponse = (chatElement) => {
  const API_URL = "https://api.openai.com/v1/chat/completions";
  const messageElement = chatElement.querySelector("p");

  // Define the properties and message for the API request
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
    }),
  };

  // Send POST request to API, get response and set the reponse as paragraph text
  fetch(API_URL, requestOptions)
    .then((res) => res.json())
    .then((data) => {
      messageElement.textContent = data.choices[0].message.content.trim();
    })
    .catch(() => {
      messageElement.classList.add("error");
      messageElement.textContent =
        "Oops! Something went wrong. Please try again.";
    })
    .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
};

const handleChat = () => {
  userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
  if (!userMessage) return;

  // Clear the input textarea and set its height to default
  chatInput.value = "";
  chatInput.style.height = `${inputInitHeight}px`;

  // Append the user's message to the chatbox
  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);

  setTimeout(() => {
    // Display "Thinking..." message while waiting for the response
    const incomingChatLi = createChatLi("Thinking...", "incoming");
    chatbox.appendChild(incomingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);
    generateResponse(incomingChatLi);
  }, 600);
};

chatInput.addEventListener("input", () => {
  // Adjust the height of the input textarea based on its content
  chatInput.style.height = `${inputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
  // If Enter key is pressed without Shift key and the window
  // width is greater than 800px, handle the chat
  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleChat();
  }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () =>
  document.body.classList.remove("show-chatbot")
);
chatbotToggler.addEventListener("click", () =>
  document.body.classList.toggle("show-chatbot")
);

// reset message button feature
const resetBtn = document.getElementById("reset-button");

resetBtn.addEventListener("click", () => {
  // chatbox.innerHTML = "";
  // chatInput.value = "";
  // chatInput.style.height = `${inputInitHeight}px`;
  // chatbox.scrollTo(0, chatbox.scrollHeight);

  const outgoingMessage = document.querySelectorAll("li.chat.outgoing");
  const incomingMessage = document.querySelectorAll("li.chat.incoming");

  console.log("outgoing message: ");
  console.log(outgoingMessage);
  console.log("incoming message: ");
  console.log(incomingMessage);

  for (let i = 0; i < outgoingMessage.length; i++) {
    console.log("Masuk outgoing");
    outgoingMessage[i].remove();
  }
  for (let j = 1; j < incomingMessage.length; j++) {
    console.log("Masuk incoming");
    incomingMessage[j].remove();
  }
});

function createRiwayat() {
  const container = document.getElementById("container");
  const newRiwayat = document.createElement("div");
  newRiwayat.classList.add(
    "bg-[#F5F5F5]",
    "rounded-lg",
    "flex",
    "flex-row",
    "px-2",
    "justify-around",
    "items-center"
  );

  // Customize the content of the new "riwayat" here if needed
  newRiwayat.innerHTML = `
      <img src="../public/assets/Icon/Chat Message.png" alt="" class="object-scale-down w-12 h-12" />
      <p class="pl-4 text-xs">Saya merasa agak pusing dan lelah belakangan ini</p>
      <img src="../public/assets/Icon/Close.png" alt="" class="object-scale-down w-12 h-12" />
  `;

  container.appendChild(newRiwayat);

  // Change the button color after clicking
  const saveButton = document.getElementById("save-button");
  saveButton.style.backgroundColor = "#34A2BA";

  // Automatically reset button color after a delay (e.g., 1 second)
  setTimeout(function () {
    saveButton.style.backgroundColor = "#45B3CB";
  }, 100); // Adjust the delay (in milliseconds) as needed
}

// Add a click event listener to the "Save Message" button
const saveButton = document.getElementById("save-button");
saveButton.addEventListener("click", createRiwayat);
