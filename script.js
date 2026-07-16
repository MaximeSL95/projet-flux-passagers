let stream = null;

// Gérer la navigation entre l'étape 1 et l'étape 2
function nextStep(stepNumber) {
    // Validation basique de l'étape 1 avant de passer à l'étape 2
    if (stepNumber === 2) {
        const nom = document.getElementById('nom').value;
        const prenom = document.getElementById('prenom').value;
        const passport = document.getElementById('passport').value;
        const airport = document.getElementById('airport').value;
        const flight = document.getElementById('flight').value;

        if (!nom || !prenom || !passport || !airport || !flight) {
            alert("Veuillez remplir tous les champs obligatoires avant de continuer.");
            return;
        }
    }

    document.querySelectorAll('.form-step').forEach(step => {
        step.classList.add('hidden');
    });
    document.getElementById(`step-${stepNumber}`).classList.remove('hidden');
}

// Activer la webcam pour l'oral (Effet de démonstration de pointe)
document.getElementById('enable-camera').addEventListener('click', async () => {
    const video = document.getElementById('webcam');
    const placeholder = document.getElementById('webcam-placeholder');
    const scannerLine = document.getElementById('scanner-line');
    const btn = document.getElementById('enable-camera');

    try {
        // Demande d'accès caméra
        stream = await navigator.mediaDevices.getUserMedia({ video: { width: 320, height: 240 } });
        video.srcObject = stream;
        
        // Gérer les affichages
        video.classList.remove('hidden');
        placeholder.classList.add('hidden');
        scannerLine.classList.remove('hidden'); // Activer la ligne laser de l'IA
        
        btn.textContent = "Caméra Connectée ✔";
        btn.style.backgroundColor = "#10b981";
        btn.disabled = true;
    } catch (err) {
        console.error("Erreur d'accès webcam :", err);
        alert("Caméra indisponible ou refusée. Nous utiliserons une simulation photo pour la présentation.");
        
        // Simulation si pas de caméra
        placeholder.innerHTML = "<span>🤖 Mode Démonstration IA Activé</span>";
        scannerLine.classList.remove('hidden');
    }
});

// Soumission du formulaire final
document.getElementById('clearskyForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Arrêter le flux caméra proprement si actif
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }

    const form = document.getElementById('clearskyForm');
    const loading = document.getElementById('loadingScreen');
    const success = document.getElementById('successScreen');

    // Cacher le formulaire et montrer le faux écran d'analyse de l'IA
    form.classList.add('hidden');
    loading.classList.remove('hidden');

    // Récupérer les valeurs pour le ticket final
    const nom = document.getElementById('nom').value.toUpperCase();
    const prenom = document.getElementById('prenom').value;
    const passport = document.getElementById('passport').value.toUpperCase();
    const airport = document.getElementById('airport').value;
    const flight = document.getElementById('flight').value.toUpperCase();

    // Simuler un temps de calcul de l'IA (3 secondes)
    setTimeout(() => {
        loading.classList.add('hidden');
        success.classList.remove('hidden');

        // Remplir le FastPass généré par l'IA
        document.getElementById('pass-name').textContent = `${prenom} ${nom}`;
        document.getElementById('pass-num').textContent = passport;
        document.getElementById('pass-airport').textContent = airport;
        document.getElementById('pass-flight').textContent = flight;
    }, 3000);
});

// Réinitialisation du processus
function resetForm() {
    document.getElementById('clearskyForm').reset();
    document.getElementById('successScreen').classList.add('hidden');
    
    // Remettre à zéro la caméra
    const video = document.getElementById('webcam');
    const placeholder = document.getElementById('webcam-placeholder');
    const scannerLine = document.getElementById('scanner-line');
    const btn = document.getElementById('enable-camera');
    
    video.classList.add('hidden');
    placeholder.classList.remove('hidden');
    placeholder.innerHTML = "<span>📷 Caméra inactive</span>";
    scannerLine.classList.add('hidden');
    
    btn.textContent = "Activer la caméra biométrique";
    btn.style.backgroundColor = "#2e3541";
    btn.disabled = false;
    stream = null;

    nextStep(1);
}
