document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('input');
    const output = document.getElementById('output');

    const commands = {
        help: 'Available commands: help, about, projects, contact',
        about: 'Ranjan is a developer with experience in HFT, ML, DL, and LLMs.',
        projects: 'Projects: 1. HFT Platform 2. Cancer Detection 3. COVID-19 Image Detection',
        contact: 'Email: ranjan@example.com'
    };

    function simulateTyping(text, callback) {
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                output.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(interval);
                callback();
            }
        }, 50);
    }

    function processCommand(command) {
        if (commands[command]) {
            output.innerHTML += '<br><span class="typing">' + commands[command] + '</span>';
        } else {
            output.innerHTML += '<br><span class="typing">Command not found: ' + command + '. Type "help" for a list of commands.</span>';
        }
    }

    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const command = input.value.trim();
            output.innerHTML += '<br><span class="prompt">ranjan@portfolio:~$</span> ' + command;
            input.value = '';
            processCommand(command);
        }
    });

    // Initial welcome message
    simulateTyping('Welcome to Ranjan\'s Portfolio. Type "help" for a list of commands.', () => {
        output.innerHTML += '<br><span class="prompt">ranjan@portfolio:~$</span> ';
    });
});
