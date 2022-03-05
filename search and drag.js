console.log("drag and drop");

const imgbox = document.querySelector('.imgbox');
const whiteboxes = document.getElementsByClassName('whitebox');

//event listerners for drag
imgbox.addEventListener('dragstart', (e) => {
    console.log('Dragstart has been triggered');
    e.target.className += ' hold';
    setTimeout(() => {

        e.target.className += 'hide';
    }, 0);
})
imgbox.addEventListener('dragend', (e) => {
    console.log('Dragend has been triggered');
    e.target.className = "imgbox";
})

//after dragging
for (whitebox of whiteboxes) {
    whitebox.addEventListener('dragover', (e) => {
        console.log('Dragover has been triggered');
        e.preventDefault();
    });

    whitebox.addEventListener('dragenter', () => {
        console.log('Dragenter has been triggered');
    });

    whitebox.addEventListener('dragleave', () => {
        console.log('Dragleave has been triggered');
    });

    whitebox.addEventListener('drop', (e) => {
        console.log('Drop has been triggered');
        e.target.append(imgbox);
    });
}

const charactersList = document.getElementById('charactersList');
const searchBar = document.getElementById('searchBar');
let hpCharacters = [];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredCharacters = hpCharacters.filter((character) => {
        return (
            character.name.toLowerCase().includes(searchString) ||
            character.house.toLowerCase().includes(searchString)
        );
    });
    displayCharacters(filteredCharacters);
});

const loadCharacters = async() => {
    try {
        const res = await fetch('https://devza.com/tests/tasks/listusers');
        hpCharacters = await res.json();
        displayCharacters(hpCharacters);
    } catch (err) {
        console.error(err);
    }
};

const displayCharacters = (characters) => {
    const htmlString = characters
        .map((character) => {
            return `
            <li class="character">
                <h2>${character.name}</h2>
                <p>House: ${character.house}</p>
                <img src="${character.image}"></img>
            </li>
        `;
        })
        .join('');
    charactersList.innerHTML = htmlString;
};

loadCharacters();