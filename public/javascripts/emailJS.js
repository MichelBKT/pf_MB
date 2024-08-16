import * as emailjs from "@emailjs/browser";
import Swal from 'sweetalert2'

window.onload = function initialization() {
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        emailjs.init({
            publicKey: "Xj7PP0m7s6FuFtlsN",
        });
        // these IDs from the previous steps
        emailjs.sendForm('service_ipgs6u4', 'template_bw56s88', '#contact-form')
            .then(() => {
                Swal.fire({
                    title: "Succès!",
                    text: "Votre message a bien été envoyé!",
                    icon: "success"
                }).then(() => "isConfirmed");
            }, (errorForm) => {
                Swal.fire({
                    title: "Erreur!",
                    text: "Vérifier le formulaire",
                    icon: "error",
                    footer: errorForm
                }).then(() => "isConfirmed");
            });
    });
}