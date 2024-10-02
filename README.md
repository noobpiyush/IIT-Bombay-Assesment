# IIT Bombay Chemical Inventory Application

This document details the implementation of a chemical inventory management web application.

## Deliverables:

* **Static Hosted Page:** [Insert Link to your hosted page here]
* **Public Git Repository:** [Insert Link to your GitHub repository here]

## Implementation Details:

This application uses HTML, CSS (with Bootstrap), and JavaScript to manage a chemical inventory.  The application's functionality is described below.

**Data Handling:**

The application stores chemical data in a JavaScript array named `chemicals`.  Data is initially loaded from a `data.json` file using the `fetch` API. If `data.json` is not available, it attempts to load data from local storage (`localStorage`). New chemicals are added to the `chemicals` array.  Changes to the `chemicals` array are saved to `localStorage` using `localStorage.setItem('chemicals', JSON.stringify(chemicals))`.  The `loadChemicals` function handles this data loading and persistence.

**User Interface:**

The user interface consists of:

* A table displaying chemical data.  Column headers allow for sorting by clicking.
* A modal for adding new chemicals.
* A modal for editing existing chemicals.
* Buttons to edit and delete existing chemicals within each row of the table.

The HTML uses Bootstrap classes for styling and layout, and the JavaScript dynamically updates the table based on the `chemicals` array.

**Functionality:**

* **Adding Chemicals:** The `addRow` function adds a new chemical object to the `chemicals` array based on user input from the "Add New Chemical" modal.
* **Editing Chemicals:** Clicking the "Edit" button for a chemical opens the "Edit Chemical" modal pre-filled with the chemical's data.  The `updateChemical` function saves the changes to the `chemicals` array.
* **Deleting Chemicals:** Clicking the "Delete" button removes the corresponding chemical from the `chemicals` array.
* **Sorting:**  The `sortTable` function sorts the `chemicals` array based on the selected column.
* **Data Persistence:** The `saveChanges` function saves the `chemicals` array to local storage.
* **Rendering:**  The `renderTable` function dynamically updates the HTML table to reflect changes to the `chemicals` array.

**Technology Stack:**

* HTML
* CSS (with Bootstrap)
* JavaScript
* Local Storage


**Responsiveness:**

The application uses Bootstrap's responsive features.  Specific CSS rules for responsiveness are not detailed here, but are present in the `style.css` file.  Note that no explicit JavaScript handling of responsiveness is included in the provided code.


## Known Limitations:

The Application is not fully responsive and there is no sorting option for sorting in descending way


## Future Enhancements:

We can make 100% responsive and can add descending sorting feature
