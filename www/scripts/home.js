/**Home.js es la página Index */
/**Cuando cargamos la página llamamos a categoria y a sites */
window.onload = () => {
    fetch('http://localhost:3000/categories')
    .then((response) => response.json())
    .then((datosCategories) => dibujarDatosCategories(datosCategories));

    fetch('http://localhost:3000/sites')
    .then((resp) => resp.json())
    .then((datosSites) => dibujarDatosSites(datosSites))
};


/** TABLA CATEGORIAS **/
let dibujarDatosCategories = (datosCategories) => {
    datosCategories.forEach((category) => {
        let parent = document.getElementById('categoriesTable');
        //Fila de la tabla categorias
        let hijo = document.createElement('tr');
        hijo.type = 'tr';
        hijo.classList = 'd-flex container-fluid justify-content-between';
        parent.appendChild(hijo);
        //Columna - nombre de la categoria
        let columna1 = document.createElement('td');
        columna1.type= 'td';
        hijo.appendChild(columna1);
        //Crea el botón del nombre de la categoria 
        let btnCategory = document.createElement('button');
        btnCategory.type = 'button';
        btnCategory.classList = 'list-group-item list-group-item-action';
        btnCategory.innerText = category.nombre;
        btnCategory.onclick = () => {
            visualizeCategorySites(category.id);
        };
        columna1.appendChild(btnCategory);
    });

    //Columna Editar
    let columna2 = document.createElement('td');
    columna2.type= 'td';
    hijo.appendChild(columna2);
    //Crea el botón de visualizar/editar la categoria 
    let btnVerCategory = document.createElement('button');
    btnVerCategory.type = 'button';
    btnVerCategory.classList = 'list-group-item list-group-item-action btn-outline-light border-0 bg-white';
    btnVerCategory.innerText = category.visualizar;
    btnVerCategory.onclick = () => {
    visualizarCategorySites(category.id);
    };
    columna2.appendChild(btnVerCategory); 

    //Columna Borrar categoria
    let columna3 = document.createElement('td');
    columna3.type='td';
    hijo.appendChild(columna3);
    //Boton de borrar categorias
    let btnBorrarCategory= document.createElement('button');
    btnBorrarCategory.type='button';
    btnBorrarCategory.classList = 'btn-outline-light border-0 bg-white';
    btnBorrarCategory.innerHTML = btnBorrar;
    //Modal pop-up borrar
    btnBorrarCategory.setAttribute('data-bs-toggle', 'modal');
    btnBorrarCategory.setAttribute('data-bs-target', '#BorrarCategoryModal');
    btnBorrarCategory.onclick = () => localStorage.setItem('idCategory', category.id); //Almacena el Id de la category al clickarlo
    columna3.appendChild(btnBorrarCategory);

};

fetch('http://localhost:3000/categories')
  .then((response) => response.json())
  .then((datosCategories) => dibujarDatosCategories(datosCategories));

/** TABLA SITIOS WEB **/
 let dibujarDatosSites = (datosSites) => {
    datosSites.forEach((site) => {
        let parent = document.getElementById('datosSites');
        //Creamos la fila de los sitios webs (row)
        let filaSite = document.createElement('tr');
        filaSite.type = 'tr';
        parent.appendChild(filaSite)
        //1ra Columna nombre del sitio web
        let columna1SiteWeb = document.createElement('td');
        columna1SiteWeb.type = 'td';
        columna1SiteWeb.classList = 'align-middle';
        columna1SiteWeb.innerText = site.name;
        filaSite.appendChild(columna1SiteWeb);
        //2da Columna con el nombre del usuario
        let columna2SiteUser = document.createElement('td');
        columna2SiteUser.type = 'td';
        columna2SiteUser.classList = 'align-middle';
        columna2SiteUser.innerText = site.name;
        filaSite.appendChild(columna2SiteUser);
        //3ra Columna con la password del usuario
        let columna3SitePass = document.createElement('td');
        columna3SitePass.type = 'td';
        columna3SitePass.classList = 'align-middle';
        columna3SitePass.innerText = site.name;
        filaSite.appendChild(columna3SitePass);
        //4ta Creamos la Columna de abrir
        let columna4Abrir = document.createElement('td');
        columna4Abrir.type = 'td';
        columna4Abrir.appendChild();
        //Creamos el boton de abrir sitio web
        let columna4BtnAbrir = document.createElement('button');
        columna4BtnAbrir.type = 'button';
        columna4BtnAbrir.classList = 'btn-outline-light border-0 bg-white';
        columna4BtnAbrir.innerHTML = btnOpen;
        columna4Abrir.appendChild(columna4BtnAbrir);
        //5ta Creamos la Columna de editar
        let columna5Editar = document.createElement('td');
        columna5Editar.type = 'td';
        columna5Editar.appendChild();
        //Creamos el boton de editar sitio web
        let columna5BtnEditar = document.createElement('button');
        columna5BtnEditar.type = 'button';
        columna5BtnEditar.classList = 'btn-outline-light border-0 bg-white';
        columna5BtnEditar.innerHTML = btnEditar;
        columna5Editar.appendChild(columna5BtnEditar); 
    });

     /** VISUALIZAMOS SITIOS WEB **/
    function visualizeCategorySites (categoryId){
        let parent = document.getElementById('datosSites');
        localStorage.setItem('idCategory', categoryId);
        while (parent.firsthijo){
            parent.removeHijo(parent.firsthijo);
        }
    };

    /** AÑADIMOS UNA CATEGORIA **/
    function addCategory() {
        //Modal categoria
        let nombreCategoria = document.getElementById('valorCategoria').value;
        let body = {
            name: nombreCategoria
        };
        //cabecera
        const cabecera = {
            headers: {
                'Content-type':'application/json'
            },
            method: 'POST',
            body: JSON.stringify(body)
        }  
        //comprobar que el nombre de la categoria no esta repetido
        fetch(`http://localhost:3000/categories`, cabecera)
        .then((response) => {
            debugger;
            response.json();
        })
        //opciones de respuesta, añadir datos o mensaje de error
        .then((response) => console.log(response))
        .finally(() => location.reload())
        .catch((err) => console.log(err));
    };


    /********************************************/
    /******** FUNCIONES PARA ELIMINAR **********/
    /******************************************/
    
  /** ELIMINAR SITIO WEB **/
    function borrarSitioWeb() {
        //cogemos el id del sitio web
        let id = localStorage.getItem('idSitioWeb');
        //Llamamos a la api para eliminar el sitio web
        const borrarSitioWeb = { method: 'DELETE' };
        fetch (``,borrarSitioWeb)
        .then((response) => response.json)
        .then((response) => console.log(response))
        .catch((err) => console.log(err))
        //Visualizamos los sitipos web actualizados
        location.reload();
    }

    /** ELIMINAR CATEGORIAS Y CONTENIDO SITIOS WEB**/
    function borrarCategoria() {
        //cogemos el id de la categoria
        let id = localStorage.getItem('idCategory');
        //borrar todos los sitios web de la categoria
        const option1 = {method: 'GET'};
        //Llamada a la api seleccionamos la categoria y borramos los sites asociados a el
        fetch(`http://localhost:3000/categories/${id}`, option1)
        .then((response) => response.json)
        .then((response) => response.forEach((site) => {
            borrarSitioWeb()
        }))
        .catch((err) => console.log(err));
        //Llamamos a la api paa eliminar la categoria
        const option2 = { method: 'DELETE' };
        fetch(``, option2)
        .then((response) => response.json())
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
        //Visualizamos los sitios web actualizados
        location.reload();
    }

};