const sendButton = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatHistory = document.getElementById('chat-history');

sendButton.addEventListener('click', function() {
    const userText = userInput.value;
    if (!userText.trim()) return;

    displayMessage(userText, 'You');
    fetchAIResponse(userText);
    userInput.value = '';
});

function displayMessage(message, speaker) {
    const messageElement = document.createElement('p');
    messageElement.textContent = `[${speaker}]: ${message}`;
    chatHistory.appendChild(messageElement);
}

async function fetchAIResponse(message) {
    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
            'Authorization': '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',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: message,
            max_tokens: 150
        })
    });

    const data = await response.json();
    displayMessage(data.choices[0].text, 'AI');
}