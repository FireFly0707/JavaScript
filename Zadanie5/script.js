const colours = ['red', 'green', 'blue', 'orange', 'purple', 'yellow', 'black', 'white', 'pink', 'brown'];
const paragraphs = document.querySelectorAll('#paragraphs p');

document.addEventListener('DOMContentLoaded', () => {
    const colours = ['red', 'green', 'blue', 'orange', 'purple', 'yellow', 'black', 'white', 'pink', 'brown'];
    const paragraphs = document.querySelectorAll('#paragraphs p');

    console.log('Script loaded');
    console.log('Paragraphs:', paragraphs);

    paragraphs.forEach((p) => {
        const randomColour = getRandomColour();
        p.style.color = randomColour;
        console.log(`Paragraph color changed to: ${randomColour}`);
    });});

function getRandomColour() {
    const randomIndex = Math.floor(Math.random() * colours.length);
    return colours[randomIndex];
}