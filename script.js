const input = document.getElementById('input');
const output = document.getElementById('output');
const prompt = document.getElementById('prompt');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');
const aiChatWindow = document.getElementById('ai-chat-window');

const asciiArt = {
    logo: `
 ____              _             
|  _ \\ __ _ _ __  (_) __ _ _ __  
| |_) / _\` | '_ \\ | |/ _\` | '_ \\ 
|  _ < (_| | | | || | (_| | | | |
|_| \\_\\__,_|_| |_|/ |\\__,_|_| |_|
                |__/             
    `
};

input.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        const command = input.value.toLowerCase();
        processCommand(command);
        input.value = '';
    }
});

function processCommand(command) {
    appendOutput(`<span style="color: #00aaff;">$ ${command}</span>`);
    
    switch(command) {
        case 'help':
            showHelp();
            break;
        case 'resume':
            showResume();
            break;
        case 'summary':
            showSummary();
            break;
        case 'social':
            showSocial();
            break;
        case 'clear':
            output.innerHTML = '';
            break;
        case 'logo':
            appendOutput(`<div class="ascii-art">${asciiArt.logo}</div>`);
            break;
        case 'projects':
            showProjects();
            break;
        case 'publications':
            showPublications();
            break;
        default:
            appendOutput('Command not recognized. Type "help" for available commands.');
    }
}

function appendOutput(html) {
    output.innerHTML += `<div class="command-output">${html}</div>`;
    output.scrollTop = output.scrollHeight;
}

function showHelp() {
    const helpText = `
        Available commands:
        - resume      : View and download my resume
        - summary     : Get a quick summary of my skills
        - social      : See my social media links
        - logo        : Display ASCII art logo
        - projects    : View my AI projects
        - publications: View my research publications
        - clear       : Clear the terminal screen
    `;
    appendOutput(helpText);
}

function showResume() {
    const resumeContent = `
        [Your resume content here]
        
        <a href="path/to/your/resume.pdf" download style="color: #00aaff;">Download Resume (PDF)</a>
    `;
    appendOutput(resumeContent);
}

function showSummary() {
    const summary = `
        Experienced AI Engineer specializing in:
        - Deep Learning and Neural Networks
        - Natural Language Processing
        - Computer Vision
        - Reinforcement Learning
        
        Key skills: Python, TensorFlow, PyTorch, Keras, AWS, Docker
    `;
    appendOutput(summary);
}

function showSocial() {
    const social = `
        <a href="https://linkedin.com/in/yourprofile" target="_blank" style="color: #00aaff;">LinkedIn</a>
        <a href="https://github.com/yourusername" target="_blank" style="color: #00aaff;">GitHub</a>
        <a href="https://twitter.com/yourhandle" target="_blank" style="color: #00aaff;">Twitter</a>
    `;
    appendOutput(social);
}

function showProjects() {
    const projects = `
        1. Advanced Image Recognition System
        2. Natural Language Understanding Chatbot
        3. Reinforcement Learning for Autonomous Driving
        4. Generative Adversarial Network for Art Creation
        5. Predictive Maintenance using IoT and Machine Learning
    `;
    appendOutput(projects);
}

function showPublications() {
    const publications = `
        1. "Novel Approach to Transfer Learning in Convolutional Neural Networks" - IEEE Conference on Computer Vision, 2023
        2. "Improving Natural Language Understanding with Transformer Models" - ACL, 2022
        3. "Reinforcement Learning Techniques for Robot Navigation" - ICRA, 2021
    `;
    appendOutput(publications);
}

// Neural Network Animation
// Neural Network Animation
let neurons = [];
let connections = [];

function setup() {
    const canvas = createCanvas(windowWidth * 0.3, windowHeight);
    canvas.parent('neural-network');
    for (let i = 0; i < 10; i++) {
        neurons.push(createVector(random(width), random(height)));
    }
    for (let i = 0; i < neurons.length; i++) {
        for (let j = i + 1; j < neurons.length; j++) {
            if (random() < 0.4) { // Increase probability of connections
                connections.push([i, j]);
            }
        }
    }
}

function draw() {
    background(0);
    stroke(0, 255, 0);
    strokeWeight(2);
    for (let connection of connections) {
        let a = neurons[connection[0]];
        let b = neurons[connection[1]];
        line(a.x, a.y, b.x, b.y);
    }
    fill(0, 255, 0);
    noStroke();
    for (let neuron of neurons) {
        ellipse(neuron.x, neuron.y, 10, 10);
    }
}


// Theme toggle
document.getElementById('theme-toggle').addEventListener('click', function() {
    document.body.classList.toggle('light-theme');
});

// AI Chat
document.getElementById('ai-chat').addEventListener('click', function() {
    aiChatWindow.classList.toggle('hidden');
});

chatInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        const message = chatInput.value;
        appendChatMessage('User: ' + message);
        
        // Replace with your OpenAI API key and endpoint
        const apiKey = 'YOUR_OPENAI_API_KEY_HERE';
        const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                prompt: message,
                max_tokens: 150
            })
        })
        .then(response => response.json())
        .then(data => {
            const aiMessage = data.choices[0].text.trim();
            appendChatMessage('AI: ' + aiMessage);
        })
        .catch(error => {
            console.error('Error:', error);
            appendChatMessage('AI: There was an error processing your request.');
        });
        
        chatInput.value = '';
    }
});

function appendChatMessage(message) {
    chatMessages.innerHTML += `<div>${message}</div>`;
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Initial welcome message
appendOutput(`Welcome to Ranjan's AI Engineer Portfolio. Type "help" for available commands.`);
appendOutput(`<div class="ascii-art">${asciiArt.logo}</div>`);
