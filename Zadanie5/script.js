
const colours = ['red', 'green', 'blue', 'orange', 'purple', 'yellow', 'black', 'pink', 'brown'];

document.addEventListener('DOMContentLoaded', () => {

    const paragraphs = document.querySelectorAll('#paragraphs p');

    console.log('Script loaded');
    console.log('Paragraphs:', paragraphs);

    paragraphs.forEach((p, index) => {

        const header = document.createElement('h2');
        header.textContent = 'Paragraf ' + (index + 1);
        p.parentNode.insertBefore(header, p);

        const randomColour = getRandomColour();
        p.style.color = randomColour;
        var title = 'Paragraph ' + (index + 1) + ' Length: ' + p.textContent.length;
        p.setAttribute('title', title);

        header.addEventListener('click', () => {
            if (p.style.display === 'none') {
                p.style.display = 'block';
            } else {
                p.style.display = 'none';
            }
        });
        
        p.addEventListener('click', () => {
            // Reset styles for all paragraphs
            paragraphs.forEach(paragraph => {
                paragraph.style.border = 'none';
                paragraph.style.backgroundColor = '';
                // Apply styles to clicked paragraph and its neighbors
                p.style.border = '2px solid green';
                if (index > 0) {
                    paragraphs[index - 1].style.border = '2px solid orange';
                }
                if (index < paragraphs.length - 1) {
                    paragraphs[index + 1].style.border = '2px solid blue';
                }

                // Apply background color based on even/odd index
                if (index % 2 === 0) {
                    p.style.backgroundColor = 'lightgray';
                } else {
                    p.style.backgroundColor = 'darkgray';
                }
            });
        });
    });
});

function getRandomColour() {
    const randomIndex = Math.floor(Math.random() * colours.length);
    return colours[randomIndex];
}