//importing sampleData from other file
import { newData, activities } from './sampleData.js';
// import { saveData } from './editActivity.js';

// Function to attach event listeners to the edit buttons
function attachEditButtonListeners() {
  const editButtons = document.querySelectorAll('.edit-btn'); // Replace this with your edit button class or ID
  editButtons.forEach(button => {
    button.addEventListener('click', showEditPopup);

  });
}

// Function to show the edit-pop-up window
function showEditPopup() {
  // Get the pop-up window element
  const editPopup = document.querySelector('.edit-shell');
  let overlay = document.querySelector('#overlay');
  // Display the pop-up window
  editPopup.classList.remove('hidden');
  overlay.classList.remove('hidden');
  
  let saveBtn = document.querySelector('#saveActivity');
  let deleteBtn = document.querySelector('#deleteActivity');
  let editClose = document.querySelector('#editClose');
    
  editClose.addEventListener('click', () => {
    editPopup.classList.add('hidden');
    overlay.classList.add('hidden');
  });
    
  saveBtn.addEventListener('click', saveChanges);
  deleteBtn.addEventListener('click', deleteActivity);
  
  
}

//when user clicks save on edit-shell
function saveChanges(){
  showNotification('successfullySavedPopup', 'overlay');
}

function deleteActivity(){
  console.log('Wanna delete the activity?');
  showNotification('sureYouWannaDelete', 'overlay');
}



function showNotification(popupId, overlay){
    let editWindow = document.querySelector('.edit-shell');
    let notification = document.querySelector(`#${popupId}`);
    let background = document.querySelector(`#${overlay}`);
    

    editWindow.classList.add('hidden');
    notification.classList.remove('hidden');
    background.classList.remove('hidden');

    const closeButtons = notification.querySelectorAll('.closePopupBtn');
    closeButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        notification.classList.add('hidden');
        background.classList.add('hidden');

        if(btn.id == 'deleteRow'){
          
          console.log('activity deleted');
        }
      });
    });
}


let displayedRowCount = 15;
let showMoreButton = document.querySelector('#loadMore');

function addRowsToTable(data, start, end, selectedActivities, dateFilter) {
  console.log('Value of dateFilter: ' + dateFilter);
    
  const tableBody = document.querySelector('#tbody');
  tableBody.innerHTML = ''; // Clear previous rows

  let filteredData = data.filter(activity =>
    selectedActivities.includes('all-activities') || selectedActivities.includes(activity.type.toLowerCase())
  );
  /**
   * FILTERING ON YEAR AND MONTH
   */
    if (dateFilter !== null) {
        filteredData = filteredData.filter(activity => {
            const activityDate = new Date(activity.date);
            const activityYear = activityDate.getFullYear();
            const activityMonth = activityDate.getMonth() + 1; // Months in JavaScript Date are zero-indexed

            if (dateFilter >= 1 && dateFilter <= 12) {
                return (
                    activityMonth === dateFilter &&
                    (selectedActivities.includes('all-activities') || selectedActivities.includes(activity.type.toLowerCase()))
                );
            } else if (dateFilter >= 2010) {
                const yearFromActivity = parseInt(activity.date.split('-')[0]);
                return (
                    yearFromActivity === dateFilter &&
                    (selectedActivities.includes('all-activities') || selectedActivities.includes(activity.type.toLowerCase()))
                );
            } else if (isNaN(dateFilter)){
                console.log("Not filtering on date");
            }
            return true; // Return all rows if dateFilter doesn't match any condition
        });
    }

  filteredData.slice(start, end).forEach(activity => {
    const newRow = createRow(activity);
    tableBody.appendChild(newRow);
    attachEditButtonListeners();
  });

  if(filteredData.length > displayedRowCount) {
    showMoreButton.classList.remove('hidden');
    showMoreButton.addEventListener('click', showMoreRows);
  }
  else {
    showMoreButton.classList.add('hidden');
  }
}

function showMoreRows() {
    displayedRowCount += 20;
    updateTable();
}

function updateTable(dateFilter) {
    console.log('Updating table');
    const selectedActivities = getSelectedActivities();
    addRowsToTable(newData, 0, displayedRowCount, selectedActivities, dateFilter);
}


function createRow(activity) {
  const newRow = document.createElement('tr');
  newRow.classList.add('text-cloudy-500', 'border-b', 'border-cloudy-100', 'flex', 'justify-between', 'py-1');
 
  newRow.innerHTML = `
      <td class="font-light w-1/5 text-sm my-auto">${activity.date}</td>
      <td class="font-light w-1/5 text-sm my-auto">${activity.type}</td>
      <td class="font-light w-1/5 text-sm my-auto text-center">${activity.time}</td>
      <td class="font-light w-1/5 text-sm my-auto">
        <svg xmlns="http://www.w3.org/2000/svg" class="feeling-face mx-auto w-6 h-6 round rounded-full" viewBox="0 0 512 512">
          <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
        </svg>
      </td>
      <td class="w-1/5 flex justify-center text-center my-auto">
        <button id="edit-btn" class="edit-btn bg-lake-200 text-white flex text-sm font-light py-1 px-4 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mb-1 inline-block">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
          Edit
        </button>
      </td>
    `;
  return newRow;
}

function generateCheckbox(activity) {
  const checkboxDiv = document.createElement('div');
  checkboxDiv.classList.add('flex', 'items-center');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('hidden', 'peer');
  checkbox.id = activity.toLowerCase().replace(' ', '-');

  const label = document.createElement('label');
  label.htmlFor = checkbox.id;
    label.classList.add(
      'relative',
      'flex',
      'h-4',
      'py-3',
      'cursor-pointer',
      'pl-8',
      'select-none',
      'text-sm',
      'peer-checked:before:text-xl',
      'before:absolute',
      'before:left-0',
      'before:flex',
      'before:h-4',
      'before:w-4',
      'before:items-center',
      'before:justify-center',
      'before:rounded-sm',
      'before:border',
      'before:border-midnight',
      'before:bg-white',
      'before:transition-[background-color]',
      'before:duration-300',
      'before:ease-in',
      'before:content-[\'\']',
      'peer-checked:before:text-midnight',
      'text-cloudy-200',
      'font-light',
      'peer-checked:font-normal',
      'peer-checked:text-midnight',
      'peer-checked:before:content-[\'\\2713\']',
      'peer-checked:before:font-light',
      'peer-checked:before:transition-[background-color]',
      'peer-checked:before:duration-300',
      'peer-checked:before:ease-in',
      'items-center'
    );

    label.textContent = activity;
    checkboxDiv.appendChild(checkbox);
    checkboxDiv.appendChild(label);
    return checkboxDiv;
}

function addCheckboxes() {
  const activitiesContainer = document.querySelector('.fieldset-activities');
  
  activities.forEach(activity => {
    const checkbox = generateCheckbox(activity);
    checkbox.addEventListener('change', () => {
        filterCheckbox(checkbox.querySelector('input').id);
        updateTable();
    });

    activitiesContainer.appendChild(checkbox);
  });

  const allActivitiesCheckbox = document.getElementById('all-activities');
  
  if (allActivitiesCheckbox) {
        allActivitiesCheckbox.checked = true;
        allActivitiesCheckbox.addEventListener('change', () => {
        updateTable();
    });
  }
}

function getSelectedActivities() {
  const checkboxes = document.querySelectorAll('fieldset.fieldset-activities input[type="checkbox"]:checked');
  let selected = Array.from(checkboxes).map(checkbox => checkbox.id);

  const allActivitiesCheckbox = document.getElementById('all-activities');

  if (selected.length === 0 && allActivitiesCheckbox) {
    allActivitiesCheckbox.checked = true;
    selected = ['all-activities'];
    console.log('all checked');
  }

  console.log('Filtering on: ' + selected);
  return selected;
}

function filterCheckbox(checkboxId) {
    const checkbox = document.getElementById(checkboxId);

    if (checkboxId === 'all-activities' && checkbox.checked) {
        const otherCheckboxes = document.querySelectorAll('fieldset.fieldset-activities input[type="checkbox"]:not(#all-activities)');
        otherCheckboxes.forEach(cb => (cb.checked = false));
    } else if (checkboxId !== 'all-activities' && checkbox.checked) {
        const allActivitiesCheckbox = document.getElementById('all-activities');
        if (allActivitiesCheckbox.checked) {
        allActivitiesCheckbox.checked = false;
        }
    }
    console.log('Filtering activities..... --->');
    displayedRowCount = 15;
}





window.addEventListener('load', function() {
    addCheckboxes();

    const yearCheckbox = document.getElementById('year');
    const monthCheckbox = document.getElementById('month');
    let display = document.querySelector('.period'); // Element to display selected year/month
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const searchInput = document.querySelector('.activity-search');


searchInput.addEventListener('input', function(event) {
    const searchTerm = searchInput.value.toLowerCase();
    const matchedActivities = activities.filter(activity => activity.toLowerCase().includes(searchTerm));
    
    if (searchTerm === '') {
        const allActivitiesCheckbox = document.getElementById('all-activities');
        if (allActivitiesCheckbox) {
            allActivitiesCheckbox.checked = true;
        }
        updateTable(activities); // Update table with all activities
    } else {
        if (matchedActivities.length > 0) {
            updateTable(matchedActivities);
            
            // Uncheck all checkboxes first
            const checkboxes = document.querySelectorAll('fieldset.fieldset-activities input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            
            // Check the checkboxes corresponding to the matched activities
            matchedActivities.forEach(matchedActivity => {
                const checkbox = document.getElementById(matchedActivity.toLowerCase().replace(' ', '-'));
                if (checkbox) {
                    checkbox.checked = true;
                }
            });
        } else {
            // If no matches found, display a message or handle it as needed
            console.log('No matching activities found.');
        }
    }
    
    if (searchTerm === '') {
        // Remove all checkboxes' checked status when search input is empty
        const checkboxes = document.querySelectorAll('fieldset.fieldset-activities input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
    }
});




    let currentDate = new Date();
    let selectedYear = currentDate.getFullYear(); //setting current year
    let selectedMonth = currentDate.getMonth() + 1; //setting current month

    display.textContent = selectedYear;

    yearCheckbox.checked = true;
    
     // Event listener for the checkboxes
    yearCheckbox.addEventListener('change', function() {
        if (this.checked) {
            monthCheckbox.checked = false; // Uncheck month checkbox if year is checked
            selectedYear = new Date().getFullYear(); // Set the current year initially
            selectedMonth = null; // Reset selected month
            display.textContent = selectedYear;
            
            console.log('Year when checked: ' + selectedYear);
            
            updateTable(selectedYear);
        } else if (!monthCheckbox.checked) {
            updateTable(null);
        }
    });

    monthCheckbox.addEventListener('change', function() {
        if (this.checked) {
            yearCheckbox.checked = false; // Uncheck year checkbox if month is checked
            selectedMonth = new Date().getMonth() + 1; // Set the current month initially
            selectedYear = null; // Reset selected year
            const monthNames = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ];
            display.textContent = monthNames[selectedMonth - 1];

            console.log('Month when checked: ' + selectedMonth);
            updateTable(selectedMonth);
        }
        else if (!yearCheckbox.checked) {
            updateTable(null);
        }
    });

    // Event listeners for navigating through years or months
    prevButton.addEventListener('click', function() {
        console.log('prev btn');
        const monthNames = [
                    'January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'
                ];

        if (selectedYear !== null && yearCheckbox.checked) {
            selectedYear--;
            display.textContent = selectedYear;
            updateTable(selectedYear);
        } 

        if (selectedMonth !== null && monthCheckbox.checked) {
            if(selectedMonth == 1){
                selectedMonth = 12;
                selectedYear--;
            } 
            else {
                selectedMonth--;
               
            }
            display.textContent = monthNames[selectedMonth - 1];
            console.log('Selected Month:', monthNames[selectedMonth - 1]);
            updateTable(selectedMonth);
        }
        
    });

    nextButton.addEventListener('click', function() {
        console.log('next');
        const monthNames = [
                    'January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'
                ];
        if (selectedYear !== null && yearCheckbox.checked) {
            selectedYear++;
            display.textContent = selectedYear;
            updateTable(selectedYear);
        } if (selectedMonth !== null && monthCheckbox.checked) {
            if(selectedMonth == 12){
                selectedMonth = 1;
                selectedYear++;
                
                console.log('Selected Month:', monthNames[selectedMonth - 1]);

            } else {
                selectedMonth++;
                console.log('Selected Month:', monthNames[selectedMonth - 1]);
                
            }
            
            display.textContent = monthNames[selectedMonth - 1];
            updateTable(selectedMonth);
        }
        
    });

    updateTable(null);
    
});

/***
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * UPDATING STATS CONTAINER Based on array
 * 
 * 
 * 
 * 
 */

let hourBox = document.querySelector('.hour');
let amount = document.querySelector('.amount');

function convertToMinutes(time) {
  const minutesMatch = time.match(/\d+/);
  if (minutesMatch) {
    return parseInt(minutesMatch[0]);
  }
  return 0;
}

let totalMinutes = 0;

for (let i = 0; i < newData.length; i++) {
  totalMinutes += convertToMinutes(newData[i].time);
}

const totalHours = Math.floor(totalMinutes / 60);
const remainingMinutes = totalMinutes % 60;

amount.textContent = newData.length;
hourBox.innerHTML = `${totalHours} <span class="hour-minute text-lg mt-5 ml-3">H</span>`;
