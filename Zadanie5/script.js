
const colours = ['red', 'green', 'blue', 'orange', 'purple', 'yellow', 'black', 'pink', 'brown'];

document.addEventListener('DOMContentLoaded', () => {
    
    const paragraphs = document.querySelectorAll('#paragraphs p');

    console.log('Script loaded');
    console.log('Paragraphs:', paragraphs);

    paragraphs.forEach((p,index) => {
        const randomColour = getRandomColour();
        p.style.color = randomColour;
        var title = 'Paragraph ' + (index + 1) + ' Length: ' + p.textContent.length;
        p.setAttribute('title', title);
    });});

function getRandomColour() {
    const randomIndex = Math.floor(Math.random() * colours.length);
    return colours[randomIndex];
}