//Generamos una contraseña segura
function generatePassword() {
    let password = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%*';
    const charactersLength = characters.length;
    for (let i = 0; i < 8; i++) {
      password += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    let field = document.getElementById('inputPassword');
    field.value = password;
  }
  
  //Mostramos las contraseñas
  function hidePassword() {
    let x = document.getElementById('inputPassword');
    let eye = document.getElementById('showPassword');
    if (x.type === 'password') {
      x.type = 'text';
      eye.innerHTML =
        '<?xml version="1.0" encoding="UTF-8"?><svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M3 3l18 18M10.5 10.677a2 2 0 002.823 2.823" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7.362 7.561C5.68 8.74 4.279 10.42 3 12c1.889 2.991 5.282 6 9 6 1.55 0 3.043-.523 4.395-1.35M12 6c4.008 0 6.701 3.158 9 6a15.66 15.66 0 01-1.078 1.5" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
    } else {
      x.type = 'password';
      eye.innerHTML =
        "<?xml version='1.0' encoding='UTF-8'?><svg width='24px' height='24px' stroke-width='1.5' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' color='#000000'><path d='M12 14a2 2 0 100-4 2 2 0 000 4z' stroke='#000000' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'></path><path d='M21 12c-1.889 2.991-5.282 6-9 6s-7.111-3.009-9-6c2.299-2.842 4.992-6 9-6s6.701 3.158 9 6z' stroke='#000000' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'></path></svg>";
    }
  }
  
  function onValidar() {
    /* validate email input has an email */
    let user = document.getElementById('inputUser').value;
    if (user == '') {
      return false;
    }
  
    /* validate password input has a password */
    let password = document.getElementById('inputPassword').value;
    if (password == '') {
      return false;
    }
  
    /* validate url has an url */
    let url = document.getElementById('inputURL').value;
    if (url == '') {
      return false;
    }
    return true;
  }
  
  //Validamos que los campos no están vacios
  async function onSubmit() {
    if (!onValidar()) {
      alert(
        'Todos los campos son obligatorios, por favor rellena todos los campos.'
      );
      return;
    }
    let name = document.getElementById('inputName').value;
    let user = document.getElementById('inputUser').value;
    let password = document.getElementById('inputPassword').value;
    let url = document.getElementById('inputURL').value;
    let description = document.getElementById('inputDescription').value || '';
    let id = localStorage.getItem('idCateg') || 1;
    const body = {
      name: name,
      url: url,
      user: user,
      password: password,
      description: description,
    };
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(body),
    };
    fetch(`http://localhost:3000/categories/${id}`, options)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert(`Error`);
          console.error(response);
        }
      })
      .then((response) => console.log(response))
      .finally(() => location.reload())
      .catch((err) => console.error(err));
  }
  