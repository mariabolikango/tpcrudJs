//Récupération du formulaire
let form = document.querySelector('form');
//Récupération du tableau (tbody)
let tbody = document.querySelector('table tbody');
//Création du container
let arrayUsers = [];
//
let indexUserToModify = -100;

//Ajout d'un écouteur d'evenement sur le formulaire (submit)
form.addEventListener('submit', function(event){
    event.preventDefault();
    let data = new FormData(event.target);

    let userName = data.get('user').trim();
    let userEmail = data.get('email').trim();
    let userPassword = data.get('password').trim();
    let action = data.get('action');
    //On vérifie si les données sont bien remplies
    if (userName.length !== 0 && userEmail.length !== 0 && userPassword.length !== 0) {
        //Création de l'objet user
        let user = {
            name : userName,
            email : userEmail,
            password : userPassword
        }
        //On vérifie si l'action à réaliser est (créer user)
        if (action === 'creer') {
            arrayUsers.push(user);
        }
        //Si l'action vaut modifier
        else{

            let inputs = document.querySelectorAll('input');
            arrayUsers[indexUserToModify] = user;
            indexUserToModify = -100;
            //On remet le champ action à (creer)
            inputs[3].value = 'creer';
            //On change le contenu du bouton à (Créer user)
            inputs[4].value = 'Créer user';
        }
        printData();
        form.reset();
    }
    else{
        alert('Remplir bien les champs');
    }
});

function printData(){
    tbody.innerHTML = '';
    for (let i = 0; i < arrayUsers.length; i++) {
        let line = `<tr>
            <td>${arrayUsers[i].name}</td>
            <td>${arrayUsers[i].email}</td>
            <td>${arrayUsers[i].password}</td>
            <td>
                <button type="button" onclick="updateUser(${i})" class="edit">Modifier</button>
            </td>
            <td>
                <button type="button" onclick="deleteUser(${i})" class="delete">Supprimer</button>
            </td>
        </tr>`
        tbody.innerHTML += line;
    }
}

function updateUser(index) {
    indexUserToModify = index;
    //Tableau de tous les inputs
    let inputs = document.querySelectorAll('input');
    //Input représentant le nom
    inputs[0].value = arrayUsers[index].name;
    //Input représentant l'e-mail
    inputs[1].value = arrayUsers[index].email;
    //Input représentant le password
    inputs[2].value = arrayUsers[index].password;
    //Input représentant l'action à effectuer
    inputs[3].value = 'modifier';
    //Input représentant le bouton
    inputs[4].value = 'Modifier';
}

function deleteUser(index) {
    arrayUsers.splice(index, 1);
    printData();
}