let selectedSize = null;
let selectedColor = null;

function openModal() {
    document.getElementById("myModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

function selectSize(sizeElement) {
    // Remove a seleção de todos os tamanhos
    const sizeOptions = document.querySelectorAll('.size-option');
    sizeOptions.forEach(option => option.classList.remove('selected'));

    // Adiciona a seleção à opção clicada
    sizeElement.classList.add('selected');
    selectedSize = sizeElement.innerText; // Guarda o tamanho selecionado
}

function selectColor(color) {
    // Remove a seleção de todas as cores
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => option.classList.remove('selected'));

    // Adiciona a seleção à opção clicada
    const selectedColorOption = document.querySelector(`.color-option.color-${color}`);
    selectedColorOption.classList.add('selected');
    selectedColor = color; // Guarda a cor selecionada
}

function confirmAndSendWhatsApp() {
    if (selectedSize && selectedColor) {
        const message = `Eu gostaria de solicitar:\nTamanho: ${selectedSize}\nCor: ${selectedColor}`;
        const whatsappLink = `https://wa.me/5528999474133?text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, '_blank'); // Abre o link do WhatsApp em uma nova aba
        closeModal(); // Fecha o modal
    } else {
        alert("Por favor, selecione um tamanho e uma cor.");
    }
}

// Fecha o modal se o usuário clicar fora dele
window.onclick = function (event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
        closeModal();
    }
}
