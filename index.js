function insertRow() {
    // 1️⃣ Grab values from inputs
    let task = document.getElementById("task").value;
    let date = document.getElementById("due-time").value;

    // 2️⃣ Get the table
    let table = document.getElementById("todo-table");

    // 3️⃣ Insert a new row at the end
    let row = table.insertRow(-1);

    // 4️⃣ Add three cells
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);

    // 5️⃣ Fill the first two cells with input values
    cell1.innerHTML = task;
    cell2.innerHTML = date;

    // 6️⃣ Add a checkbox to the third cell
    cell3.innerHTML = '<input type="checkbox">';

    // 7️⃣ Clear input fields after adding the task
    document.getElementById("task").value = '';
    document.getElementById("due-time").value = '';
    // checking if task or date is empty, if so, console log an error and remove the added row
    if (task === '' || date === '') {
        console.error('Task and Due time cannot be empty.');
        table.deleteRow(row.rowIndex);
        return;
    }

    // 8️⃣ Attach change event listener to the new checkbox
    let checkbox = cell3.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', updateProgress);    
}

// function for adding checked tasks to progress list 
function updateProgress() {
    let table = document.getElementById("todo-table");
    let completedTasksList = document.getElementById("completed-tasks");

    // Remove clearing so previous completed tasks remain
    // completedTasksList.innerHTML = '';

    for (let i = 1; i < table.rows.length; i++) {
        let row = table.rows[i];
        let checkbox = row.cells[2].querySelector('input[type="checkbox"]');

        if (checkbox.checked && !row.classList.contains('done')) {
            let task = row.cells[0].innerText;
            let time = row.cells[1].innerText;

            let listItem = document.createElement('li');
            listItem.textContent = `${task} - due by ${time}`;
            completedTasksList.appendChild(listItem);

            // Mark row as done visually
            row.classList.add('done');
        }
    }
}



// Attach change event listeners to existing checkboxes
document.querySelectorAll('#todo-table input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', updateProgress);
});