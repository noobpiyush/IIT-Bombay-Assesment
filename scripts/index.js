const tableBody = document.getElementById("tableBody");
let chemicals = [];
let nextId = 1;

function loadChemicals() {
    const storedChemicals = localStorage.getItem('chemicals');
    if (storedChemicals) {
        chemicals = JSON.parse(storedChemicals);
        nextId = Math.max(...chemicals.map(chem => chem.id)) + 1;
        renderTable(chemicals);
    } else {
        fetch("../data/data.json")
            .then(response => response.json())
            .then(data => {
                chemicals = data;
                nextId = Math.max(...chemicals.map(chem => chem.id)) + 1;
                renderTable(chemicals);
                createToolbarButtons();
            })
            .catch(error => {
                console.error("Error loading data:", error);
                alert("Error loading chemical data. Please check data.json");
            });
    }
}

function renderTable(data) {
    tableBody.innerHTML = "";
    data.forEach(chemical => {
        const row = tableBody.insertRow();
        row.id = chemical.id;

        // Insert each property into the appropriate cell
        const idCell = row.insertCell();
        idCell.textContent = chemical.id;

        const chemicalNameCell = row.insertCell();
        chemicalNameCell.textContent = chemical.chemicalName;

        const vendorCell = row.insertCell();
        vendorCell.textContent = chemical.vendor;

        const densityCell = row.insertCell();
        densityCell.textContent = chemical.density;

        const viscosityCell = row.insertCell();
        viscosityCell.textContent = chemical.viscosity;

        const packagingCell = row.insertCell();
        packagingCell.textContent = chemical.packaging;

        const packSizeCell = row.insertCell();
        packSizeCell.textContent = chemical.packSize;

        const unitCell = row.insertCell();
        unitCell.textContent = chemical.unit;

        const quantityCell = row.insertCell();
        quantityCell.textContent = chemical.quantity; // Correctly display quantity

        // Create action buttons with improved styling
        const actionsCell = row.insertCell();
        actionsCell.innerHTML = `
            <button id="buttonE" class="btn btn-sm btn-primary me-2 edit-btn" data-bs-toggle="modal" data-bs-target="#editModal" data-id="${chemical.id}">🖋️</button>
            <button id="buttonD" class="btn btn-sm btn-danger delete-btn" data-id="${chemical.id}">🗑️</button>
        `;
    });

    addEditDeleteFunctionality(); // Attach event listeners
}


function addRow() {
    const chemicalName = $("#chemicalName").val();
    const vendor = $("#vendor").val();
    const density = parseFloat($("#density").val()) || 0;
    const viscosity = parseFloat($("#viscosity").val()) || 0;
    const packaging = $("#packaging").val();
    const packSize = parseInt($("#packSize").val()) || 0;
    const unit = $("#unit").val();
    const quantity = parseFloat($("#quantity").val()) || 0;

    if (!chemicalName || !vendor) {
        alert("Please fill in the required fields (Chemical Name and Vendor).");
        return;
    }

    const newChemical = {
        id: nextId++,
        chemicalName,
        vendor,
        density,
        viscosity,
        packaging,
        packSize,
        unit,
        quantity,
    };

    chemicals.push(newChemical);
    renderTable(chemicals);
    $('#addRowModal').modal('hide');
    saveChanges();

    $("#chemicalName").val('');
    $("#vendor").val('');
    $("#density").val('');
    $("#viscosity").val('');
    $("#packaging").val('');
    $("#packSize").val('');
    $("#unit").val('');
    $("#quantity").val('');
}

function saveChanges() {
    localStorage.setItem('chemicals', JSON.stringify(chemicals));
    console.log("Changes saved to local storage!");
}

function sortTable(columnIndex) {
    const keys = ['id', 'chemicalName', 'vendor', 'density', 'viscosity', 'packaging', 'packSize', 'unit', 'quantity'];
    
    chemicals.sort((a, b) => {
        const valA = a[keys[columnIndex]];
        const valB = b[keys[columnIndex]];

        if (typeof valA === 'string') {
            return valA.localeCompare(valB);
        }
        return valA - valB;
    });
    
    renderTable(chemicals);
    saveChanges();
}

function createToolbarButtons() {
    const toolbar = document.getElementById("toolbar");
    const addButton = createToolbarButton("Add Row", () => {
        $('#addRowModal').modal('show');
    });
    const saveButton = createToolbarButton("Save", saveChanges);
    toolbar.appendChild(addButton);
    toolbar.appendChild(saveButton);
}

function createToolbarButton(text, onClick) {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", onClick);
    button.classList.add('btn', 'btn-primary', 'mx-1');
    return button;
}

function addEditDeleteFunctionality() {
    const editButtons = document.querySelectorAll('.edit-btn');
    const deleteButtons = document.querySelectorAll('.delete-btn');

    editButtons.forEach(button => {
        button.addEventListener('click', () => {
            const chemicalId = parseInt(button.dataset.id);
            const chemical = chemicals.find(c => c.id == chemicalId);
            $("#editChemicalName").val(chemical.chemicalName);
            $("#editVendor").val(chemical.vendor);
            $("#editDensity").val(chemical.density);
            $("#editViscosity").val(chemical.viscosity);
            $("#editPackaging").val(chemical.packaging);
            $("#editPackSize").val(chemical.packSize);
            $("#editUnit").val(chemical.unit);
            $("#editQuantity").val(chemical.quantity);
            $("#editModal").data('chemical-id', chemicalId);
        });
    });

    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const rowId = parseInt(button.dataset.id);
            const index = chemicals.findIndex(chemical => chemical.id == rowId);
            if (index !== -1) {
                chemicals.splice(index, 1);
                renderTable(chemicals);
                saveChanges();
            }
        });
    });
}

function updateChemical() {
    const chemicalId = $("#editModal").data('chemical-id');
    const index = chemicals.findIndex(chem => chem.id == chemicalId);
    if (index === -1) return;

    chemicals[index].chemicalName = $("#editChemicalName").val();
    chemicals[index].vendor = $("#editVendor").val();
    chemicals[index].density = parseFloat($("#editDensity").val()) || 0;
    chemicals[index].viscosity = parseFloat($("#editViscosity").val()) || 0;
    chemicals[index].packaging = $("#editPackaging").val();
    chemicals[index].packSize = parseInt($("#editPackSize").val()) || 0;
    chemicals[index].unit = $("#editUnit").val();
    chemicals[index].quantity = parseFloat($("#editQuantity").val()) || 0;

    renderTable(chemicals);
    $('#editModal').modal('hide');
    saveChanges();
}

loadChemicals();
