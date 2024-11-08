const colours = ['red', 'green', 'blue', 'orange', 'purple', 'yellow', 'black', 'pink', 'brown'];

document.addEventListener('DOMContentLoaded', () => {

    const paragraphs = document.querySelectorAll('#paragraphs p');
    const addParagraphButton = document.getElementById('add-paragraph');
    const newParagraphText = document.getElementById('new-paragraph-text');

    console.log('Script loaded');
    console.log('Paragraphs:', paragraphs);

    function addParagraph(p, index) {
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
            document.querySelectorAll('#paragraphs p').forEach(paragraph => {
                paragraph.style.border = 'none';
                paragraph.style.backgroundColor = '';
            });

            // Apply styles to clicked paragraph and its neighbors
            p.style.border = '2px solid green';
            if (index > 0) {
                document.querySelectorAll('#paragraphs p')[index - 1].style.border = '2px solid orange';
            }
            if (index < document.querySelectorAll('#paragraphs p').length - 1) {
                document.querySelectorAll('#paragraphs p')[index + 1].style.border = '2px solid blue';
            }

            // Apply background color based on even/odd index
            if (index % 2 === 0) {
                p.style.backgroundColor = 'lightgray';
            } else {
                p.style.backgroundColor = 'darkgray';
            }
        });
    }

    paragraphs.forEach((p, index) => {
        addParagraph(p, index);
    });

    addParagraphButton.addEventListener('click', () => {
        const text = newParagraphText.value;
        if (text.trim() !== '') {
            const newParagraph = document.createElement('p');
            newParagraph.textContent = text;
            document.getElementById('paragraphs').appendChild(newParagraph);
            addParagraph(newParagraph, document.querySelectorAll('#paragraphs p').length - 1);
            newParagraphText.value = '';
        }
    });
});

function getRandomColour() {
    const randomIndex = Math.floor(Math.random() * colours.length);
    return colours[randomIndex];
}