const API_URL = "http://localhost:8000";
const MAX_PLACES = 150;

document.addEventListener('DOMContentLoaded', () => {
    updatePlacesCount();

    const form = document.getElementById('soiree-form');
    const btnUnsubscribe = document.getElementById('btn-unsubscribe');

    if (form) form.addEventListener('submit', handleInscription);
    if (btnUnsubscribe) btnUnsubscribe.addEventListener('click', handleDesinscription);
});

/**
 * Récupère le nombre d'inscrits et met à jour l'affichage
 */
async function updatePlacesCount() {
    const infoEl = document.getElementById('places-info');
    const btnSubmit = document.querySelector('#soiree-form .btn-primary');
    
    try {
        const response = await fetch(`${API_URL}/etudiants/soiree/count`);
        if (!response.ok) throw new Error('Erreur réseau');
        
        const data = await response.json();
        const count = data.count;
        const remaining = MAX_PLACES - count;
        
        if (infoEl) {
            if (remaining <= 0) {
                infoEl.textContent = "Complet ! (0 places restantes)";
                infoEl.style.color = "grey";
                if (btnSubmit) btnSubmit.disabled = true;
            } else {
                infoEl.textContent = `${remaining} places restantes sur ${MAX_PLACES}`;
                infoEl.style.color = "var(--rouge)";
                if (btnSubmit) btnSubmit.disabled = false;
            }
        }
    } catch (error) {
        console.error("Impossible de récupérer le nombre de places", error);
        if (infoEl) infoEl.textContent = "Info places indisponible";
    }
}

/**
 * Gère l'inscription (PATCH /etudiants/inscription)
 */
async function handleInscription(e) {
    e.preventDefault();
    const msg = document.getElementById('soiree-msg');
    resetMessage(msg);
    
    const num = document.getElementById('student-number').value;
    const email = document.getElementById('student-email').value;

    if (!validateForm(num, email, msg)) return;

    try {
        // Vérification frontend : est-ce que c'est complet ?
        const countRes = await fetch(`${API_URL}/etudiants/soiree/count`);
        if (countRes.ok) {
            const countData = await countRes.json();
            if (countData.count >= MAX_PLACES) {
                showMessage(msg, "Impossible de s'inscrire : la soirée est complète.", "grey");
                updatePlacesCount(); // Met à jour l'affichage du compteur
                return; // On arrête tout ici
            }
        }

        const response = await fetch(`${API_URL}/etudiants/inscription`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ numero_etudiant: num, mail: email })
        });

        if (response.ok) {
            showMessage(msg, "Inscription réussie ! À bientôt.", "green");
            updatePlacesCount();
            document.getElementById('soiree-form').reset();
        } else if (response.status === 400) {
            const errData = await response.json();
            if (errData.detail === "Soirée complète") {
                showMessage(msg, "Impossible de s'inscrire : la soirée est complète.", "grey");
            } else {
                showMessage(msg, "Vous êtes déjà inscrit !", "orange");
            }
        } else {
            const errData = await response.json();
            throw new Error(errData.detail || "Erreur lors de l'inscription");
        }
    } catch (error) {
        handleError(error, msg);
    }
}

/**
 * Gère la désinscription (PATCH /etudiants/desinscription)
 */
async function handleDesinscription() {
    const msg = document.getElementById('soiree-msg');
    resetMessage(msg);

    const num = document.getElementById('student-number').value;
    const email = document.getElementById('student-email').value;

    if (!validateForm(num, email, msg)) return;

    try {
        const response = await fetch(`${API_URL}/etudiants/desinscription`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ numero_etudiant: num, mail: email })
        });

        if (response.ok) {
            showMessage(msg, "Désinscription prise en compte.", "var(--rouge)");
            updatePlacesCount();
            document.getElementById('soiree-form').reset();
        } else {
            const errData = await response.json();
            throw new Error(errData.detail || "Erreur lors de la désinscription");
        }
    } catch (error) {
        handleError(error, msg);
    }
}

// --- Utilitaires ---

function validateForm(num, email, msgEl) {
    if (!num || !/^\d+$/.test(num)) {
        showMessage(msgEl, 'Numéro étudiant invalide (chiffres uniquement).', 'crimson');
        return false;
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        showMessage(msgEl, "Adresse e-mail invalide.", 'crimson');
        return false;
    }
    return true;
}

function handleError(error, msgEl) {
    const text = error.message === "Etudiant non trouvé" 
        ? "Identifiant incorecte." 
        : "Erreur : " + error.message;
    showMessage(msgEl, text, 'crimson');
}

function showMessage(el, text, color) {
    el.style.display = 'block';
    el.style.color = color;
    el.textContent = text;
}

function resetMessage(el) {
    el.style.display = 'none';
    el.textContent = '';
}
