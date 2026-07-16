document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('passengerForm');
    const successMessage = document.getElementById('successMessage');

    form.addEventListener('submit', function(event) {
        // Empêche le rechargement de la page (comportement par défaut)
        event.preventDefault();

        // Masque le formulaire et affiche le message de succès
        form.classList.add('hidden');
        successMessage.classList.remove('hidden');

        // Optionnel : Tu pourrais ici rajouter du code pour générer un vrai faux QR Code
        // à l'aide d'une librairie externe si tu veux aller plus loin !
    });
});