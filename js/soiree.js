const API_URL = "http://127.0.0.1:8000";
const MAX_PLACES = 150;

document.addEventListener('DOMContentLoaded', () => {
    updatePlacesCount();

    const form = document.getElementById('soiree-form');
    if (form) form.addEventListener('submit', handleInscription);

    // Gestion du champ "Autre" pour le statut
    const statutSelect = document.getElementById('student-statut');
    if (statutSelect) {
        statutSelect.addEventListener('change', (e) => {
            const wrapper = document.getElementById('precision-statut-wrapper');
            if (e.target.value === 'Autre') {
                wrapper.style.display = 'block';
            } else {
                wrapper.style.display = 'none';
                document.getElementById('student-precision').value = '';
            }
        });
    }
});

/**
 * Récupère le nombre d'inscrits et met à jour l'affichage
 */
async function updatePlacesCount() {
    const infoEl = document.getElementById('places-info');
    const btnSubmit = document.querySelector('#soiree-form .btn-primary');
    
    try {
        const response = await fetch(`${API_URL}/inscrits-soiree/count`);
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
 * Gère l'inscription (POST /inscrits-soiree/)
 */
async function handleInscription(e) {
    e.preventDefault();
    const msg = document.getElementById('soiree-msg');
    resetMessage(msg);
    
    const nom = document.getElementById('student-name').value.trim();
    const prenom = document.getElementById('student-firstname').value.trim();
    const email = document.getElementById('student-email').value.trim();
    const statut = document.getElementById('student-statut').value.trim();
    const autorisation_captation = document.querySelector('input[name="studentCaptation"]:checked')?.value;

    let precision_statut = null;
    if (statut === 'Autre') {
        precision_statut = document.getElementById('student-precision').value.trim();
    }

    if (!validateForm(nom, prenom, email, statut, precision_statut, autorisation_captation, msg)) return;

    try {
        // Vérification frontend : est-ce que c'est complet ?
        const countRes = await fetch(`${API_URL}/inscrits-soiree/count`);
        if (countRes.ok) {
            const countData = await countRes.json();
            if (countData.count >= MAX_PLACES) {
                showMessage(msg, "Impossible de s'inscrire : la soirée est complète.", "grey");
                updatePlacesCount();
                return;
            }
        }

        const payload = { 
            nom, 
            prenom, 
            mail: email,
            statut,
            precision_statut,
            autorisation_captation
        };

        const response = await fetch(`${API_URL}/inscrits-soiree/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            showMessage(msg, "Inscription réussie ! À bientôt.", "green");
            updatePlacesCount();
            document.getElementById('soiree-form').reset();
            document.getElementById('precision-statut-wrapper').style.display = 'none';
        } else if (response.status === 400) {
            const errData = await response.json();
            if (errData.detail === "Soirée complète") {
                showMessage(msg, "Impossible de s'inscrire : la soirée est complète.", "grey");
            } else if (errData.detail === "Cette adresse email est déjà inscrite") {
                showMessage(msg, "Cette adresse email est déjà inscrite !", "orange");
            } else {
                showMessage(msg, errData.detail || "Erreur lors de l'inscription", "crimson");
            }
            updatePlacesCount();
        } else {
            const errData = await response.json();
            throw new Error(errData.detail || "Erreur lors de l'inscription");
        }
    } catch (error) {
        handleError(error, msg);
    }
}

// --- Utilitaires ---

function validateForm(nom, prenom, email, statut, precision_statut, autorisation_captation, msgEl) {
    if (!nom || nom.length < 2) {
        showMessage(msgEl, 'Nom invalide (minimum 2 caractères).', 'crimson');
        return false;
    }
    if (!prenom || prenom.length < 2) {
        showMessage(msgEl, 'Prénom invalide (minimum 2 caractères).', 'crimson');
        return false;
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        showMessage(msgEl, "Adresse e-mail invalide.", 'crimson');
        return false;
    }
    if (!statut) {
        showMessage(msgEl, "Veuillez sélectionner votre statut.", 'crimson');
        return false;
    }
    if (statut === 'Autre' && (!precision_statut || precision_statut.length < 2)) {
        showMessage(msgEl, "Veuillez préciser votre statut (minimum 2 caractères).", 'crimson');
        return false;
    }
    if (!autorisation_captation) {
        showMessage(msgEl, "Veuillez indiquer votre autorisation de captation.", 'crimson');
        return false;
    }
    return true;
}

function handleError(error, msgEl) {
    const text = "Erreur : " + error.message;
    showMessage(msgEl, text, 'crimson');
}

function showMessage(el, text, color) {
    if (!el) return;
    el.textContent = text;
    el.style.display = 'block';
    el.style.color = color;
    el.style.padding = '0.75rem';
    el.style.borderRadius = '4px';
    el.style.backgroundColor = color === 'green' ? '#d4edda' : (color === 'orange' ? '#fff3cd' : '#f8d7da');
}

function resetMessage(el) {
    if (!el) return;
    el.textContent = '';
    el.style.display = 'none';
}
