//Táblázat törzsének az elérése
const usersData = document.getElementById('usersTable');
const userArray = [];

//Űrlap elérése , eseményfigyelő hozzáadása
document.getElementById('userForm').addEventListener('submit', (e) => {
    //HTML űrlap alapértelmezett viselkedés megakadályozása
    e.preventDefault();
//FormData objektum létrehozása, az űrlap esemény hozzárendelése
//(e.target) az esemény címzettje
    const myformData = new FormData(e.target);
    //Az űrlap adatok áthelyezése a userData objektumba
    const userData = Object.fromEntries(myformData);

    console.log(userData);
/*Másolat készítése a(z) userData objektumról
    const userObject = {
        Vezetéknév: userData.vezeteknev,
        Keresztnév: userData.keresztnev,
        Email: userData.email,
        Telefon: userData.telefonszam

    }

    console.log(userObject);
 A userObject másolatának a létrehozása
    const newObject = userObject;

    console.log(newObject);*/

    const userDataJSON = JSON.stringify(userData, null, 2);
    localStorage.setItem('userDataKey',userDataJSON);

    //A JSOM adatok visszaolvasása a localeStorage-ból
    const newUserJSON = localStorage.getItem('userDataKey');
    const newUserObject = JSON.parse(newUserJSON);

    //A tömb feltöltése (push)
    userArray.push(newUserObject);
    console.log(userArray);


    //A táblázat feltöltése a userArray tömb adataival
    usersData.innerHTML = userArray.map((users, index) => `
    <tr>
        <td>${index +1}</td>
        <td>${users.nev}</td>
        <td>${users.oktato}</td>
        <td>${users.kezdo_datum}</td>
        <td>${users.veg_datum}</td>
        <td>${users.oraszam}</td>
    </tr>
    `).join('');

        // Adatok elküldése a szervernek
    fetch('/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nev: userData.nev,
            oktato: userData.oktato,
            kezdo_datum: userData.kezdo_datum,
            veg_datum: userData.veg_datum,
            oraszam: parseInt(userData.oraszam)
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Szerver válasza:', data);
        alert('Sikeresen elmentve az adatbázisba!');
    })
    .catch(error => {
        console.error('Hiba történt a szerverrel:', error);
        alert('Hiba történt a mentés során.');
    });

})
