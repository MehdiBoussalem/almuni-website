const API_URL = `${window.location.origin}/api`;

document.addEventListener('DOMContentLoaded', () => {
    loadTshirts();
    
    const form = document.getElementById('tshirt-form');
    if (form) {
        form.addEventListener('submit', handleUpload);
    }
});

/**
 * Charge tous les tshirts depuis l'API et affiche la galerie
 */
async function loadTshirts() {
    const gallery = document.getElementById('tshirt-gallery');
    const countEl = document.getElementById('tshirt-count');
    
    try {
        const response = await fetch(`${API_URL}/tshirts/`);
        
        if (!response.ok) {
            throw new Error('Erreur lors du chargement');
        }
        
        const tshirts = await response.json();
        
        // Mettre à jour le compteur
        if (countEl) {
            countEl.textContent = `${tshirts.length} tshirt${tshirts.length > 1 ? 's' : ''} dans la galerie`;
        }
        
        // Afficher la galerie
        if (tshirts.length === 0) {
            gallery.innerHTML = `
                <div class="empty-gallery">
                    <i class="mdi mdi-tshirt-crew"></i>
                    <p>Aucun tshirt pour le moment. Soyez le premier à partager le vôtre !</p>
                </div>
            `;
        } else {
            gallery.innerHTML = tshirts.map(tshirt => createTshirtCard(tshirt)).join('');
        }
    } catch (error) {
        console.error('Erreur chargement tshirts:', error);
        gallery.innerHTML = `
            <div class="error-message">
                <i class="mdi mdi-alert-circle"></i>
                <p>Erreur lors du chargement de la galerie. Veuillez réessayer.</p>
            </div>
        `;
    }
}

/**
 * Crée le HTML d'une carte tshirt
 */
function createTshirtCard(tshirt) {
    return `
        <div class="tshirt-card" data-id="${tshirt.id}">
            <div class="tshirt-image-wrapper">
                <img src="${API_URL}${tshirt.image_path}" 
                     alt="Tshirt de ${tshirt.prenom} ${tshirt.nom}" 
                     loading="lazy">
            </div>
            <div class="tshirt-info">
                <h3>${tshirt.prenom} ${tshirt.nom}</h3>
            </div>
        </div>
    `;
}

/**
 * Gère la soumission du formulaire d'upload
 */
async function handleUpload(e) {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    
    // Désactiver le bouton pendant l'upload
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="mdi mdi-loading mdi-spin"></i> Upload en cours...';
    
    const formData = new FormData();
    const fileInput = document.getElementById('photo');
    const file = fileInput.files[0];
    
    // Validation côté client
    if (!file) {
        alert('Veuillez sélectionner une photo');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        return;
    }
    
    // Vérifier la taille du fichier (5MB max)
    if (file.size > 5 * 1024 * 1024) {
        alert('Le fichier est trop volumineux. Taille maximum : 5MB');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        return;
    }
    
    formData.append('file', file);
    formData.append('nom', document.getElementById('nom').value.trim());
    formData.append('prenom', document.getElementById('prenom').value.trim());
    
    try {
        const response = await fetch(`${API_URL}/tshirts/`, {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            alert('✅ Tshirt uploadé avec succès !');
            e.target.reset();
            await loadTshirts();
            
            // Scroll vers la galerie
            document.querySelector('.gallery-section').scrollIntoView({ 
                behavior: 'smooth' 
            });
        } else {
            const error = await response.json();
            alert(`❌ Erreur: ${error.detail || 'Erreur lors de l\'upload'}`);
        }
    } catch (error) {
        console.error('Erreur upload:', error);
        alert('❌ Erreur lors de l\'upload. Veuillez réessayer.');
    } finally {
        // Réactiver le bouton
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
    }
}

/**
 * Supprime un tshirt spécifique
 */
async function deleteTshirt(id) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce tshirt ?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/tshirts/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            alert('✅ Tshirt supprimé avec succès !');
            await loadTshirts();
        } else {
            const error = await response.json();
            alert(`❌ Erreur: ${error.detail || 'Erreur lors de la suppression'}`);
        }
    } catch (error) {
        console.error('Erreur suppression:', error);
        alert('❌ Erreur lors de la suppression. Veuillez réessayer.');
    }
}

/**
 * Échappe les caractères HTML pour éviter les failles XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Prévisualisation de l'image avant upload (bonus)
 */
document.getElementById('photo')?.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(event) {
            // On pourrait ajouter une prévisualisation ici si besoin
            console.log('Image sélectionnée:', file.name);
        };
        reader.readAsDataURL(file);
    }
});
