import { newData } from "./sampleData.js";
function addNewActivity(newActivity) {
  newData.push(newActivity);
}

window.addEventListener('load', () => {
    initializeDatePicker();
    registerActivity();
    setupDatepickerSelection();
    setupCustomSelects();
    setupSvgs();
    
})

/**
 * 
 * 
 * FUNCTIONS ARE USED FOR: 
 * 
 * STYLING AND SETTING UP THE CALENDER (DATEPICKER)
 * 
 * REGISTER AN ACTIVITY ON HOME-PAGE
 * 
 * CLICKLISTENERS FOR INTERACTIVE PARTS IN REGISTER ACTIVITY
 */
const currentDate = new Date();
const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const month = monthsOfYear[currentDate.getMonth()];
const year = currentDate.getFullYear();
let activityName = null;
let time = null;

function initializeDatePicker() {
   // Access the datepicker element
    let datepicker = document.querySelector('#datepickerId');
    let nestedDatepicker = document.querySelector('.datepicker-grid');
    let monthTitle = document.createElement('h3');
    const formattedDate = `${month} ${year}`;
    monthTitle.textContent = formattedDate;

    //modifying the original header & footer of datepicker
    const datepickerControls = document.querySelector('.datepicker-controls');
    datepickerControls.classList.remove('mb-2', 'mt-2');
    const footer = document.querySelector('.datepicker-footer .datepicker-controls');
    footer.classList.remove('mt-2');
    
    // Remove existing buttons
    const buttons = datepickerControls.querySelectorAll('button');
    buttons.forEach(button => button.remove());

    monthTitle.classList.add('mx-auto', 'text-gray-800', 'text-md', 'pt-2');
    // Append the new h3 element to the parent
    datepickerControls.appendChild(monthTitle);

    //modifying grid
    let datepickerPicker = document.querySelector('.datepicker-picker');
    datepickerPicker.classList.remove('p-4', 'shadow-lg');
    datepickerPicker.classList.add('border', 'border-gray-500', 'px-2');
    nestedDatepicker.classList.remove('w-64');
    nestedDatepicker.classList.add('gap-x-4', 'w-full');

    let datepickerView = document.querySelector('.datepicker-view');
    datepickerView.classList.add('justify-center');
    // datepickerView.querySelector('.days').classList.add('w-full');

    /**
     * Modifying multiple areas including: 
     * 
     * label-heading and weekdays
     * 
     * grid & days
     * 
     * display reigstered activites (from sample data array)
     * 
     */
    let dayOfWeek = document.querySelector('.days-of-week');
    dayOfWeek.classList.add('gap-x-4');
    let days = dayOfWeek.querySelectorAll('.dow');

    for (let i = 0; i < days.length; i++) {
        days[i].classList.add('text-xs', 'text-gray-400');
        days[i].classList.remove('text-sm', 'text-gray-500');

        if(i==0){
            days[i].innerHTML = "S";
        }
        if(i==1){
            days[i].innerHTML = "M";
        }
        if(i==2){
            days[i].innerHTML = "T";
        }
        if(i==3){
            days[i].innerHTML = "W";
        }
        if(i==4){
            days[i].innerHTML = "T";
        }
        if(i==5){
            days[i].innerHTML = "F";
        }
        if(i==6){
            days[i].innerHTML = "S";
        }

    }

    let dayGrid = document.querySelector('.datepicker-grid');
    let cells = dayGrid.querySelectorAll('.datepicker-cell');

    let rowCount = 0;

    dayGrid.addEventListener('click', pickingDate);
    //storing activities of this month and year
    let activeDays = [];
    
    newData.forEach(row => {
        //if current month & year match any in the sampleData-array
        if (row.date.substring(0, 4) == year && row.date.substring(5, 7) == (currentDate.getMonth()+1)) {
              activeDays.push(row.date);
            }
    });

    for (let i = 0; i < cells.length; i++) {
        //adding the registeredAcitivty circle
        let circle = document.createElement('span');
        circle.classList.add('w-2', 'h-2', 'bg-transparant', 'rounded-full', 'text-white', 'flex', 'flex-column', 'items-center', 'justify-center', 'mx-auto', 'register-circle');
        circle.innerHTML = '';
        cells[i].appendChild(circle);

        cells[i].classList.remove('leading-9');
        cells[i].classList.add('leading-2');
        cells[i].classList.remove('bg-blue-700', 'text-white', 'font-semibold', 'hover:bg-gray-100');
        //function to show previously registered activities, from newData in sampleData.js      
        activeDays.forEach(registeredDays => {
          const dayNumber = parseInt(cells[i].textContent.trim(), 10); // Parse cell's day number
          const matchingDay = parseInt(registeredDays.split('-')[2], 10); // Extracts the day part and parse
          
          if (!isNaN(dayNumber) && dayNumber === matchingDay) {  
            circle.classList.add('bg-forest');
          }
        });

        if (cells[i].classList.contains('focused')) {
            cells[i].classList.add('font-bold');
        }

        if ((i) % 7 == 0) {
            rowCount++
        }
        //removing dates that don't belong to current month
        if (rowCount == 1) {
            let cellContent = parseInt(cells[i].textContent.trim());
            if (cellContent < 1 || cellContent > 7 || isNaN(cellContent)) {
                // cells[i].classList.add('text-transparent');
                cells[i].classList.remove('cursor-pointer');
                cells[i].textContent = '';
            }
        }
        //removing dates that don't belong to current month
        if (rowCount >= 5) {
            let cellContent = parseInt(cells[i].textContent.trim());
            if (cellContent <= 14 || isNaN(cellContent)) {
                cells[i].textContent = '';
                cells[i].classList.remove('cursor-pointer');
            }
        }
    }
}

function registerActivity() {
  let dashboard = document.querySelector('.register-dashboard');
  let saveRegisterBtn = document.querySelector('.saveBtn');
  let deleteBtn = document.querySelector('#deleteRow');

  if(deleteBtn){
    deleteBtn.addEventListener('click', () => {
      //changing appearance  
      const selectedDate = document.querySelector('.datepicker-cell.focused');
      selectedDate.querySelector('.register-circle').classList.remove('bg-forest');
      update(selectedDate);
    })
  }
  saveRegisterBtn.addEventListener('click', () => {
    //changing appearance  
    const selectedDate = document.querySelector('.datepicker-cell.focused');
    selectedDate.querySelector('.register-circle').classList.add('bg-forest');
    update(selectedDate);
    console.log('saved');
  });
}

function update(selectedDate){
    let svgs = document.querySelectorAll('.feeling-face');
    let selectedSvg;
    let textArea = getTextarea();
    
    //getting date
    getDate(selectedDate);

    //getting activity and time data
    if (activityName === null) {
      activityName = 'Swimming';
    } 
    if(time === null) {
      time = '30';
    }
    
    svgs.forEach(svg => {
      if(svg.classList.contains('bg-lake-200')) {
        console.log('Mood-element: ');
        selectedSvg = svg;
      }
    });
    //push entire data row into newData 
    let activity = { date: getDate(selectedDate), type: activityName, time: time + 'min', comment: textArea, svg: selectedSvg};
    addNewActivity(activity);
    console.log(activity);
    console.log('updated');
}

function getDate(selectedDate){
    //getting date
    if (selectedDate) {
      
      let dd = selectedDate.textContent;
      let mm = currentDate.getMonth() +1;
      
      if (dd < 10 ) {
        dd = '0' + dd;
      }
      if (mm < 10) {
        mm = '0' + mm;
      }
      
      return year + '-' + mm + '-' + dd;
    }
}

function setupDatepickerSelection() {
  let dayGrid = document.querySelector('.datepicker-grid');
  dayGrid.addEventListener('click', pickingDate);
}

function pickingDate(e) {
  e.stopPropagation();
  const dayGrid = document.querySelector('.datepicker-grid');
  const cells = dayGrid.querySelectorAll('.datepicker-cell');

  cells.forEach(cell => {
    if (e.target === cell) {
      e.target.classList.add('focused');
      e.target.classList.remove('bg-blue-700', 'text-white', 'font-semibold');
      e.target.classList.add('font-bold');
    } else if (cell.classList.contains('focused') && (cell !== e.target)) {
      cell.classList.remove('focused');
      cell.classList.remove('font-bold');
    } else {
      cell.classList.remove('font-bold');
    }
  });
}

function setupSvgs (){
  let feelingContainer = document.querySelector('.feeling');
  feelingContainer.addEventListener('click', getSvg);
}

function getSvg(e) { 
  e.stopPropagation();
  const clickedSvg = e.target;
  const container = document.querySelector('.feeling');
  const svgs = container.querySelectorAll('.feeling-face');

  svgs.forEach(svg => {
    if (clickedSvg === svg) {
      clickedSvg.classList.toggle('bg-lake-200');
    } else {
      svg.classList.remove('bg-lake-200');
    }
  });
}

//for activity & duration selection
function setupCustomSelects() {
  handleCustomSelect('time-duration', 'time');
  handleCustomSelect('activity-container', 'activity');
}

//reusable for select-handling
function handleCustomSelect(containerId, selectId) {
    const container = document.getElementById(containerId);
    const select = document.getElementById(selectId);
    const options = container.querySelector('.custom-options');
    const selectedText = container.querySelector('.custom-selected');
    const svg = container.querySelector('svg');

    container.addEventListener('click', () => {
        options.classList.toggle('hidden');
        svg.classList.toggle('rotate-180');
    });

    options.addEventListener('click', (event) => {
        if (event.target.classList.contains('custom-option')) {
          const value = event.target.getAttribute('data-value');
          selectedText.textContent = event.target.textContent;
          select.value = value;
       
          if(isNaN(value)){
            activityName = value;
          }
          else {
            time = value;
          }
        }
    });
}

function getTextarea(){
  let textArea = document.querySelector('#message');
  return textArea.value.trim();
}
