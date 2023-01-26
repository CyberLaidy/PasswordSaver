/**Botones */
const btnBorrar = <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M9.172 14.828L12.001 12m2.828-2.828L12.001 12m0 0L9.172 9.172M12.001 12l2.828 2.828M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>;
const btnEditar = <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M3 21h18M12.222 5.828L15.05 3 20 7.95l-2.828 2.828m-4.95-4.95l-5.607 5.607a1 1 0 00-.293.707v4.536h4.536a1 1 0 00.707-.293l5.607-5.607m-4.95-4.95l4.95 4.95" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>;
const btnAbrir = <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M8 21h12.4a.6.6 0 00.6-.6V3.6a.6.6 0 00-.6-.6H3.6a.6.6 0 00-.6.6V16M3.5 20.5L12 12m0 0v4m0-4H8" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>;
const btnGuardar = <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M3 19V5a2 2 0 012-2h11.172a2 2 0 011.414.586l2.828 2.828A2 2 0 0121 7.828V19a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="#000000" stroke-width="1.5"></path><path d="M8.6 9h6.8a.6.6 0 00.6-.6V3.6a.6.6 0 00-.6-.6H8.6a.6.6 0 00-.6.6v4.8a.6.6 0 00.6.6zM6 13.6V21h12v-7.4a.6.6 0 00-.6-.6H6.6a.6.6 0 00-.6.6z" stroke="#000000" stroke-width="1.5"></path></svg>;

/**Cuando cargamos la página llamamos a categoria y a sites */
window.onload = () => {
    fetch('http://localhost:3000/categories')
    .then((response) => response.json())
    .then((dataCategories) => drawDataCategories(dataCategories));

    fetch('http://localhost:3000/sites')
    .then((resp) => resp.json())
    .then((dataSites) => drawDataSites(dataSites))
};


/** TABLA CATEGORIAS **/
let drawDataCategories = (dataCategories) => {
    dataCategories.forEach((category) => {
        let parent = document.getElementById('categoriesTable');
        //Fila de la tabla categorias
        let childRow = document.createElement('tr');
        childRow.type = 'tr';
        childRow.classList = 'd-flex container-fluid justify-content-between';
        parent.appendChild(childRow);
        
        //1ra Columna - nombre de la categoria
        let childCol1 = document.createElement('td');
        childCol1.type= 'td';
        childRow.appendChild(childCol1);
        //Crea el botón del nombre de la categoria 
        let btnCategory = document.createElement('button');
        btnCategory.type = 'button';
        btnCategory.classList = 'list-group-item list-group-item-action';
        btnCategory.innerText = category.nombre;
        btnCategory.onclick = () => {
            visualizeCategorySites(category.id);
        };
        childCol1.appendChild(btnCategory);
        
        //2da Columna Editar
        let childCol2 = document.createElement('td');
        childCol2.type= 'td';
        childRow.appendChild(childCol2);
        //Crea el botón de visualizar/editar la categoria 
        let btnVerCategory = document.createElement('button');
        btnVerCategory.type = 'button';
        btnVerCategory.classList = 'list-group-item list-group-item-action btn-outline-light border-0 bg-white';
        btnVerCategory.innerText = category.name;
        btnVerCategory.onclick = () => {
        visualizarCategorySites(category.id);
        };
        childCol2.appendChild(btnVerCategory); 
    
        //3ra Columna Borrar categoria
        let childCol3 = document.createElement('td');
        childCol3.type='td';
        childRow.appendChild(childCol3);
        //Boton de borrar categorias
        let childCol3DeleteCategory= document.createElement('button');
        childCol3DeleteCategory.type='button';
        childCol3DeleteCategory.classList = 'btn-outline-light border-0 bg-white';
        childCol3DeleteCategory.innerHTML = btnBorrar;
        //Modal pop-up borrar
        childCol3DeleteCategory.setAttribute('data-bs-toggle', 'modal');
        childCol3DeleteCategory.setAttribute('data-bs-target', '#DeleteCategoryModal');
        childCol3DeleteCategory.onclick = () => localStorage.setItem('idC', category.id); //Almacena el Id de la category al clickarlo
        childCol3.appendChild(childCol3DeleteCategory);
    });


};

fetch('http://localhost:3000/categories')
  .then((response) => response.json())
  .then((dataCategories) => drawDataCategories(dataCategories));

  
/** TABLA SITIOS WEB **/
 let drawDataSites = (dataSites) => {
    dataSites.forEach((site) => {
        let parent = document.getElementById('sitesTable');
        
        //Creamos la fila de los sitios webs (row)
        let childRow = document.createElement('tr');
        childRow.type = 'tr';
        parent.appendChild(filaSite)
        
        //1ra Columna nombre del sitio web
        let childCol1 = document.createElement('td');
        childCol1.type = 'td';
        childCol1.classList = 'align-middle';
        childCol1.innerText = site.name;
        childRow.appendChild(childCol1);
        
        //2da Columna con el nombre del usuario
        let childCol2 = document.createElement('td');
        childCol2.type = 'td';
        childCol2.classList = 'align-middle';
        childCol2.innerText = site.name;
        childRow.appendChild(childCol2);
        
        //3ra Columna con la password del usuario
        let childCol3 = document.createElement('td');
        childCol3.type = 'td';
        childCol3.classList = 'align-middle';
        childCol3.innerText = site.name;
        childRow.appendChild(childCol3);
        
        //4ta Creamos la Columna de abrir
        let childCol4 = document.createElement('td');
        childCol4.type = 'td';
        childCol4.appendChild();
        
        //Creamos el contenido / boton de abrir sitio web
        let childCol4Open = document.createElement('button');
        childCol4Open.type = 'button';
        childCol4Open.classList = 'btn-outline-light border-0 bg-white';
        childCol4Open.innerHTML = btnAbrir;
        childCol4.appendChild(childCol4Open);
        
        //5ta Creamos la Columna de editar
        let childCol5 = document.createElement('td');
        childCol5.type = 'td';
        childCol5.appendChild();
        //Creamos el boton de editar sitio web - rellenamos contenido
        let childCol5BDelete = document.createElement('button');
        childCol5BEdit.type = 'button';
        childCol5BEdit.classList = 'btn-outline-light border-0 bg-white';
        childCol5BEdit.innerHTML = btnEditar;
        childCol5.appendChild(childCol5BEdit); 
        
        //6ta Creamos la Columna de editar
        let childCol6 = document.createElement('td');
        childCol6.type = 'td';
        childCol6.appendChild();
        //Creamos el boton de editar sitio web
        let childCol6Delete = document.createElement('button');
        childCol6Delete.type = 'button';
        childCol6Delete.classList = 'btn-outline-light border-0 bg-white';
        childCol6Delete.innerHTML = btnBorrar;
        childCol6Delete.setAttribute('data-bs-toggle', 'modal');
        childCol6Delete.setAttribute('data-bs-target', '#DeleteSiteModal');
        childCol6Delete.onclick = () => localStorage.setItem('idSWeb', site.id); //Almacena el Id del site al clickarlo
        childCol6.appendChild(childCol6Delete); 
    });

     /** VISUALIZAMOS SITIOS WEB **/
    function visualizeCategorySites (categoryId){
        let parent = document.getElementById('sitesTable');
        localStorage.setItem('idC', categoryId);
        while (parent.firstChild){
            parent.removeChild(parent.firstChild);
        }
    };

    /** AÑADIMOS UNA CATEGORIA **/
    function AddCategory() {
        //Modal categoria
        let nombre = document.getElementById('inputCategoria').value;
        let body = {
            name: nombre,
        };
        //cabecera
        const options = {
            headers: {
                'Content-type':'application/json'
            },
            method: 'POST',
            body: JSON.stringify(body)
        }  
        //comprobar que el nombre de la categoria no esta repetido
        fetch(`http://localhost:3000/categories`, options)
        .then((response) => {
            debugger;
            response.json();
        })
        //opciones de respuesta, añadir datos o mensaje de error
        .then((response) => console.log(response))
        .finally(() => location.reload())
        .catch((err) => console.log(err));
    }



    /********************************************/
    /******** FUNCIONES PARA ELIMINAR **********/
    /******************************************/
    
  /** ELIMINAR SITIO WEB **/
    function DeleteSite() {
        //cogemos el id del sitio web
        let id = localStorage.getItem('idSWeb');
        //Llamamos a la api para eliminar el sitio web
        const borrarSitioWeb = { method: 'DELETE' };
        fetch (`http://localhost:3000/sites/${id}`,borrarSitioWeb)
        .then((response) => response.json)
        .then((response) => console.log(response))
        .catch((err) => console.log(err))
        //Visualizamos los sitipos web actualizados
        location.reload();
    }

    /** ELIMINAR CATEGORIAS Y CONTENIDO SITIOS WEB**/
    function DeleteCategory() {
        //cogemos el id de la categoria
        let id = localStorage.getItem('idC');
        //borrar todos los sitios web de la categoria
        const option1 = {method: 'GET'};
        //Llamada a la api seleccionamos la categoria y borramos los sites asociados a el
        fetch(`http://localhost:3000/categories/${id}`, option1)
        .then((response) => response.json)
        .then((response) => response.forEach((site) => {
            DeleteSite()
        }))
        .catch((err) => console.log(err));
        //Llamamos a la api paa eliminar la categoria
        const option2 = { method: 'DELETE' };
        fetch(`http://localhost:3000/categories/${id}`, option2)
        .then((response) => response.json())
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
        //Visualizamos los sitios web actualizados
        location.reload();
    }


};