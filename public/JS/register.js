document.getElementById('registerform').addEventListener('submit', function(event) {
    let password = document.getElementById('password').value;
    let repassword = document.getElementById('repassword').value;
    let mensajeError = document.getElementById('mensajeerror');

    if (password !== repassword) {
        mensajeError.textContent = 'Las contraseñas no coinciden. Por favor, inténtalo de nuevo.';
        event.preventDefault(); // Evita que el formulario se envíe
    }
  });