

const toggleButton = document.getElementById('chatbotToggle');
const chatbotPanel = document.getElementById('chatbotPanel');


toggleButton.addEventListener('click', () => {
  toggleButton.classList.toggle('open');
  chatbotPanel.classList.toggle('open');
});

// Optional: Simulate typing indicator
const typingIndicator = document.getElementById('typingIndicator');


// console.log("test",process.env.API_TOKEN_KEY)

const API_TOKEN = "KEY"; // ← Replace with your token
// const API_TOKEN =  ""
const MODEL = "zephyr-7b-beta"; // Default model

// Add message to chat
function addMessage(text, isUser) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.className = isUser ? 'user-message' : 'bot-message';
    messageDiv.textContent = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
}




let chatHistory = [];

async function getBotResponse(userInput) {
    chatHistory.push({ role: "user", content: userInput });

    // Build prompt with roles
    let prompt = "<|system|>\nYou are a helpful assistant.\n";
    chatHistory.forEach(turn => {
        if (turn.role === "user") {
            prompt += `<|user|>\n${turn.content}\n`;
        } else if (turn.role === "assistant") {
            prompt += `<|assistant|>\n${turn.content}\n`;
        }
    });
    prompt += "<|assistant|>\n";

    try {
        const response = await fetch(
            `https://api-inference.huggingface.co/models/HuggingFaceH4/${MODEL}`,
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${API_TOKEN}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    inputs: prompt,
                    parameters: {
                        temperature: 0.7,
                        top_p: 0.9,
                        max_new_tokens: 100,
                        repetition_penalty: 1.1
                    }
                })
            }
        );

        const data = await response.json();
        const fullOutput = data[0]?.generated_text || "Exceeded the token limit.";
        const assistantReply = fullOutput.replace(prompt, "").trim();

        // Save assistant reply in history
        chatHistory.push({ role: "assistant", content: assistantReply });

        return assistantReply;

    } catch (error) {
        console.error("Error:", error);
        return "Something went wrong. Please try again.";
    }
}




function scrollToBottom() {
    const messagesContainer = document.getElementById('chat-box');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

// Handle user input
async function sendMessage() {
    const inputField = document.getElementById('user-input');
    const userInput = inputField.value.trim();
    
    if (!userInput) return;
    
    inputField.value = ""; // Clear input
    addMessage(userInput, true);
    
    // Show typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.textContent = "...";
    typingIndicator.className = 'bot-message';
    document.getElementById('chat-box').appendChild(typingIndicator);
    
    // Get and show response
    const botResponse = await getBotResponse(userInput);
document.getElementById('chat-box').removeChild(typingIndicator);


// Replace this line:

addGradualMessage(botResponse, false);

function addGradualMessage(text, isUser) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.className = isUser ? 'user-message' : 'bot-message';

    // Check for Markdown-style code block
    const codeBlockMatch = text.match(/```(?:\w+)?\n([\s\S]*?)```/);

    if (codeBlockMatch) {
        const codeContent = codeBlockMatch[1];
        messageDiv.innerHTML = `<pre><code>${escapeHTML(codeContent)}</code></pre>`;
    } else {
        // Otherwise, display as plain text with typing effect
        chatBox.appendChild(messageDiv);
        let index = 0;
        function typeCharacter() {
            if (index < text.length) {
                messageDiv.textContent += text.charAt(index);
                index++;
                setTimeout(typeCharacter, 20);
            }
        }
        typeCharacter();
        scrollToBottom();
        return;
    }

    chatBox.appendChild(messageDiv);
    scrollToBottom();
}


}
function escapeHTML(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}


// Enable Enter key
document.getElementById('user-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});



const command = document.getElementById('command');
const text = 'echo "Unleash cybersecurity, shield with encryption, guard the digital world."';
let index = 0;


const originalMessage = "010011001010101";
const encryptedMessage = btoa(originalMessage);
let isEncrypted = false;

function encryptText() {
  const textElement = document.querySelector('.encrypted-text');
  const message = isEncrypted ? originalMessage : encryptedMessage;

  textElement.innerHTML = message
    .split('')
    .map((char, index) => 
      `<span class="letter" style="animation-delay: ${index * 0.05}s">${char}</span>`
    ).join('');

  isEncrypted = !isEncrypted;
}


function typeWriter() {
    if (index < text.length) {
        command.textContent = text.slice(0, index + 1);
        index++;
        setTimeout(typeWriter, 100);
    }
}

typeWriter();


document.addEventListener("scroll", function() {
    const sections = document.querySelectorAll('.fade-in');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight - 100) {
            section.classList.add('active');
        }
    });
});


const targetText = "BADER ALMAZRUA"; // Replace with your actual name
const container = document.getElementById("nameAnimation");

let iteration = 0;
const interval = setInterval(() => {
  container.textContent = targetText
    .split("")
    .map((char, index) => {
      if (index < iteration) {
        return char;
      }
      return Math.random() > 0.5 ? "0" : "1";
    })
    .join("");

  if (iteration >= targetText.length) {
    clearInterval(interval);
  }

  iteration += 1 / 3;
}, 50);
