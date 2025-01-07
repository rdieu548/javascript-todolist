let taches = [];
let tableauTermine = [];

function ajouterTache() {
    let tacheInput = document.getElementById('tache');
    
    if (tacheInput.value != '') {
        taches.push(tacheInput.value);
        tableauTermine.push(false);
        console.log(taches);
        ajouterTacheHTML(tacheInput.value);
        tacheInput.value = '';
    }
}

function ajouterTacheHTML(item) {
    let table = document.getElementById('taskTable');
    
    if (table.rows.length == 0) {
        let caption = document.createElement('caption');
        caption.innerText = "Liste des tâches";
        table.appendChild(caption);

        let thead = document.createElement('thead');
        let headerRow = document.createElement('tr');
        let th1 = document.createElement('th');
        th1.innerText = "Terminée";
        let th2 = document.createElement('th');
        th2.innerText = "Numéro";
        let th3 = document.createElement('th');
        th3.innerText = "Libellé";
        headerRow.appendChild(th1);
        headerRow.appendChild(th2);
        headerRow.appendChild(th3);
        thead.appendChild(headerRow);
        table.appendChild(thead);
        
        let tbody = document.createElement('tbody');
        table.appendChild(tbody);
    }

    let tbody = table.getElementsByTagName('tbody')[0];
    let row = document.createElement('tr');
    
    let td1 = document.createElement('td');
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = tableauTermine.length;
    checkbox.onclick = cocher;
    td1.appendChild(checkbox);
    
    let td2 = document.createElement('td');
    td2.innerText = tableauTermine.length;
    
    let td3 = document.createElement('td');
    td3.innerText = item;
    
    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    tbody.appendChild(row);
}

function cocher(event) {
    let id = event.target.id;
    tableauTermine[id] = event.target.checked;
    let tds = document.getElementsByTagName('td');
    let texte = tds[(id - 1) * 3 + 2].innerText;
    
    if (event.target.checked == true) {
        tds[(id - 1) * 3 + 2].innerHTML = '<del>' + texte + '</del>';
    } else {
        tds[(id - 1) * 3 + 2].innerText = texte;
    }
}

function filterTasks() {
    let filterValue = document.getElementById('filter').value;
    let rows = document.querySelectorAll('#taskTable tbody tr');

    rows.forEach(row => {
        let checkbox = row.querySelector('input[type="checkbox"]');
        let isChecked = checkbox.checked;

        if (filterValue == 'all' || 
            (filterValue == 'completed' && isChecked) || 
            (filterValue == 'uncompleted' && !isChecked)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

document.getElementById('addtache').onclick = ajouterTache;
document.getElementById('filter').addEventListener('change', filterTasks);
