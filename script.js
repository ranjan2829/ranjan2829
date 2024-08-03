document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('input');
    const output = document.getElementById('output');

    const commands = {
        help: 'Available commands: help, about, projects, contact',
        about: 'Ranjan is a developer with experience in HFT, ML, DL, and LLMs.',
        projects: 'Projects: 1. HFT Platform 2. Cancer Detection 3. COVID-19 Image Detection',
        contact: 'Email: ranjan@example.com'
    };

    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const command = input.value.trim();
            const response = commands[command] || `'${command}' is not a recognized command. Type 'help' for available commands.`;
            output.innerHTML += `<div>${command}</div><div>${response}</div>`;
            input.value = '';
        }
    });
});
