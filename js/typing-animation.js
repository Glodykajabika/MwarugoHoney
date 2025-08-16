
// Typing animation 

const typingText = document.querySelector('.header__text--sub');
const sentences = [
    'Chaque goûte, est une histoire unique ... ',
    'Savourez la douceur de la nature ... ',
    "Découvrez l'or liquide de la nature ... ",
    "Découvrez Un goût pur, une passion authentique ... ",
    "Découvrez Un heritage de saveurs ... ",
    "Découvrez L'art de la nature dans chaque goûte ... "
]; // sentences to cycle through

let sentenceIndex = 0;
let wordIndex = 0;

function type() {
    if (wordIndex < sentences[sentenceIndex].length) {
        // Add the next wordacter
        typingText.textContent += sentences[sentenceIndex].charAt(wordIndex);
        wordIndex++;
        setTimeout(type, 60); // Typing speed (adjust as needed)
    } else {
        // Wait before erasing
        setTimeout(erase, 2000); // Delay before erasing (adjust as needed)
    }
}

function erase() {
    if (wordIndex > 0) {
        // Remove the last wordacter
        typingText.textContent = sentences[sentenceIndex].substring(0, wordIndex - 1);
        wordIndex--;
        setTimeout(erase, 30); // Erasing speed (adjust as needed)
    } else {
        // Move to the next sentence
        sentenceIndex = (sentenceIndex + 1) % sentences.length;
        setTimeout(type, 60); // Delay before typing the next word (adjust as needed)
    }
}

type();