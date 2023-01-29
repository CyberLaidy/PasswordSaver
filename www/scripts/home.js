/**Botones */
const btnBorrar = 'Delete <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M9.172 14.828L12.001 12m2.828-2.828L12.001 12m0 0L9.172 9.172M12.001 12l2.828 2.828M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
const btnEditar = 'Edit <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M3 21h18M12.222 5.828L15.05 3 20 7.95l-2.828 2.828m-4.95-4.95l-5.607 5.607a1 1 0 00-.293.707v4.536h4.536a1 1 0 00.707-.293l5.607-5.607m-4.95-4.95l4.95 4.95" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
const btnAbrir = ' Open <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M8 21h12.4a.6.6 0 00.6-.6V3.6a.6.6 0 00-.6-.6H3.6a.6.6 0 00-.6.6V16M3.5 20.5L12 12m0 0v4m0-4H8" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
const btnGuardar = 'Save <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M3 19V5a2 2 0 012-2h11.172a2 2 0 011.414.586l2.828 2.828A2 2 0 0121 7.828V19a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="#000000" stroke-width="1.5"></path><path d="M8.6 9h6.8a.6.6 0 00.6-.6V3.6a.6.6 0 00-.6-.6H8.6a.6.6 0 00-.6.6v4.8a.6.6 0 00.6.6zM6 13.6V21h12v-7.4a.6.6 0 00-.6-.6H6.6a.6.6 0 00-.6.6z" stroke="#000000" stroke-width="1.5"></path></svg>';

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
        btnCategory.classList = 'd-flex container-fluid justify-content-between';
        btnCategory.innerText = category.name;
        btnCategory.onclick = () => {
            visualizeCategorySites(category.id);
        };
        childCol1.appendChild(btnCategory);
    
        //Columna Borrar categoria
        let childCol2Borrar = document.createElement('td');
        childCol2Borrar.type='td';
        childRow.appendChild(childCol2Borrar);
        //Boton de borrar categorias
        let childCol2BorrarCategoria= document.createElement('button');
        childCol2BorrarCategoria.type='button';
        childCol2BorrarCategoria.classList = 'btn btn-outline-danger d-flex container-fluid justify-content-betwee';
        childCol2BorrarCategoria.innerHTML = btnBorrar;
        childCol2BorrarCategoria.setAttribute('data-bs-toggle', 'modal');
        childCol2BorrarCategoria.setAttribute('data-bs-target', '#DeleteCategoryModal');
        childCol2BorrarCategoria.onclick = () => localStorage.setItem('idCateg', category.id); //Almacena el Id de la category al clickarlo
        childCol2Borrar.appendChild(childCol2BorrarCategoria);
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
        parent.appendChild(childRow)
        
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
        childCol2.innerText = site.url;
        childRow.appendChild(childCol2);
        
        //3ra Columna con la password del usuario
        let childCol3 = document.createElement('td');
        childCol3.type = 'td';
        childCol3.classList = 'align-middle';
        childCol3.innerText = site.user;
        childRow.appendChild(childCol3);

        //4ta Creamos la Columna fecha creada
        let childCol4 = document.createElement('td');
        childCol4.type = 'td';
        childCol4.classList = 'align-middle';
        //La password se mostrará con el botón abrir
        childCol4.innerText = '***************';
        childRow.appendChild(childCol4);
        
        //4ta Creamos la Columna fecha creada
        let childCol5 = document.createElement('td');
        childCol5.type = 'td';
        childCol5.classList = 'align-middle';
        childCol5.innerText = site.createdAt.slice(0, 10);
        childRow.appendChild(childCol5);
        
        //Acciones Botones de la tabla de Sitios web
        let childCol6 = document.createElement('td');
        childRow.appendChild(childCol6);
        //Boton de abrir la url - Open
        let childCol6BtAbrir = document.createElement('button');
        childCol6BtAbrir.type= 'button';
        childCol6BtAbrir.classList='align-middle border-1 btn btn-outline-info m-1';
        childCol6BtAbrir.innerHTML=btnAbrir;
        childCol6BtAbrir.onload=()=>localStorage.setItem('idSWeb', site.url); //Abrir el enlace de la url
        childCol6.appendChild(childCol6BtAbrir);
        //Boton de visualizar los datos
        let childCol6BtVer = document.createElement('button');
        childCol6BtVer.type= 'button';
        childCol6BtVer.classList='align-middle border-1 btn btn-outline-success m-1';
        childCol6BtVer.innerHTML=btnEditar;
        childCol6BtVer.setAttribute('data-bs-toggle', 'modal');
        childCol6BtVer.setAttribute('data-bs-target', '#verSitioWeb');
        childCol6BtVer.onclick=()=>localStorage.setItem('idSWeb', site.id);
        childCol6.appendChild(childCol6BtVer);
        //Boton de eliminar
        let childCol6BtBorrar = document.createElement('button');
        childCol6BtBorrar.type= 'button';
        childCol6BtBorrar.classList='align-middle border-1 btn btn-outline-danger m-1';
        childCol6BtBorrar.innerHTML=btnBorrar;
        childCol6BtBorrar.setAttribute('data-bs-toggle', 'modal');
        childCol6BtBorrar.setAttribute('data-bs-target', '#DeleteSiteModal');
        childCol6BtBorrar.onclick=()=>localStorage.setItem('idSWeb', site.id);
        childCol6.appendChild(childCol6BtBorrar);
        
    });


   /*  fetch('http://localhost:3000/sites')
    .then((response) => response.json())
    .then((dataSites) => drawDataSites(dataSites)); */


     /** VISUALIZAMOS SITIOS WEB **/
    function visualizeCategorySites (categoryId){
        let parent = document.getElementById('sitesTable');
        localStorage.setItem('idCateg', categoryId);
        while (parent.firstChild){
            parent.removeChild(parent.firstChild);
        }

        fetch(`http://localhost:3000/categories/${categoryId}`)
        .then((response) => response.json())
        .then((response) => drawDataSites(response))
        .catch((err) => console.error(err));
    };

    /********************************************/
    /******** DETALLES DE UN SITIO WEB **********/
    /******************************************/
    
    /** DETALLES SITIO WEB **/
    function verSitioWeb() {
    //cogemos el id del sitio web
    let id = localStorage.getItem('idSWeb');
    //Llamamos a la api para eliminar el sitio web
    const options = { method: 'GET' };
    fetch (`http://localhost:3000/sites/${id}`,options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
    //Visualizamos los sitipos web actualizados
    location.reload();
}


    /********************************************/
    /******** AÑADIMOS NUEVA CATEGORIA **********/
    /******************************************/
    function AddCategory() {
        //Modal categoria
        let nombre = document.getElementById('inputNombreCategoria').value;
        let body = {
            name: nombre,
        };
        //cabecera
        const options = {
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(body),
          }; 
        //comprobar que el nombre de la categoria no esta repetido
        fetch('http://localhost:3000/categories', options)
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
    /******** ELIMINAR SITIO WEB **********/
    /******************************************/
    
  /** ELIMINAR SITIO WEB **/
    function DeleteSite() {
        //cogemos el id del sitio web
        let id = localStorage.getItem('idSWeb');
        //Llamamos a la api para eliminar el sitio web
        const options = { method: 'DELETE' };
        fetch (`http://localhost:3000/sites/${id}`,options)
        .then((response) => response.json())
        .then((response) => console.log(response))
        .catch((err) => console.error(err));
        //Visualizamos los sitipos web actualizados
        location.reload();
    }

    /********************************************/
    /******** DETALLES CATEGORIA **********/
    /******************************************/

    /** ELIMINAR CATEGORIAS Y CONTENIDO SITIOS WEB**/
    function DeleteCategory() {
        //1- Recoger el Id del site
        let id = localStorage.getItem('idCateg');
      
        //2- Borrar los sites de la category
        const option1 = { method: 'GET' };
      
        fetch(`http://localhost:3000/categories/${id}`, option1)
          .then((response) => response.json())
          .then((response) =>
            response.forEach((site) => {
              DeleteSite();
            })
          )
          .catch((err) => console.error(err));
      
        //3- Llamada a la API para eliminar la categoría
        const option2 = { method: 'DELETE' };
      
        fetch(`http://localhost:3000/categories/${id}`, option2)
          .then((response) => response.json())
          .then((response) => console.log(response))
          .catch((err) => console.error(err));
      
        //Visualizar los sites actualizados
        location.reload();
      }


};