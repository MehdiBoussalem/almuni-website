// Définir la date cible
const countDownDate = new Date("Jan 30, 2026 09:00:00").getTime();

// Mettre à jour le compteur chaque seconde
const x = setInterval(function() {

    // Obtenir la date et l'heure actuelles
    const now = new Date().getTime();

    // Trouver la distance entre maintenant et la date cible
    const distance = countDownDate - now;

    // Calculs pour les jours, heures, minutes et secondes
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Afficher le résultat dans les éléments avec les IDs correspondants
    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;

    // Si le compte à rebours est terminé, afficher un message
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "L'ÉVÉNEMENT A COMMENCÉ !";
    }
}, 1000);

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    // Ajoute la classe 'scrolled' si on a défilé de plus de 50px, sinon la retire
    header.classList.toggle('scrolled', window.scrollY > 50);
});
