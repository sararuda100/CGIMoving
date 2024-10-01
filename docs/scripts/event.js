//using "dummy data" for event-cards
import { events, hostedEvents, joinedEvents } from "./sampleData.js";
const formData = {}; // Object to store form data

let overlay = document.querySelector('#overlay');
let user = 'Adam Nordgren';
let host = user;
let availability = "All";
let startTime = "";
let endTime = "";

let currentWindow, viewWindow;

function initiateEvents(){
    
    //initiating all types of events (cards)
    events.forEach(event => {
        createCard(event);
    });

    hostedEvents.forEach(ownEvent => {
        createYourCard(ownEvent);
    });

    joinedEvents.forEach(joinedEvent => {
        createJoinedCard(joinedEvent);
    });


}

function handleInputChange(inputField, formDataKey) {
    inputField.addEventListener('change', function(event) {
        formData[formDataKey] = event.target.value.trim();
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initiateEvents();
    //Call the function to start listening for card clicks
    listenForClicks();
     let createBtn = document.querySelector('.openCreateWindowBtn');
    createBtn.addEventListener('click', () => {
        viewWindow = document.querySelector('.createWindow');
        currentWindow = viewWindow;
        openPopup('openCreateWindowBtn', 'createWindow');
    } );

    let formCreate = document.querySelector('#formCreate');
    let formEdit = document.querySelector('#formEdit');
    handleSubmit(formCreate);
    handleEditSubmit(formEdit);
    // handleSubmit(formEdit);
    
    // const form = document.querySelector('#formCreate');
    const addEndDateBtnCreate = formCreate.querySelector('.add-end-date');
    const endDateDropdownCreate = formCreate.querySelector('.end-date-dropdown');
    const addEndDateBtnEdit = formEdit.querySelector('.add-end-date');
    const endDateDropdownEdit = formEdit.querySelector('.end-date-dropdown');
    openDropdown(addEndDateBtnCreate, endDateDropdownCreate);
    openDropdown(addEndDateBtnEdit,endDateDropdownEdit);

   const fileUploadInput = document.querySelector('#file-upload');
    fileUploadInput.addEventListener('change', function(event) {
        formData.picture = event.target.files[0] ? event.target.files[0].name : '';
    });
    

});

function handleSubmit(form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        //
        if (event.submitter && event.submitter.type === 'submit' && (form.querySelector('.eventName').value)) {    
            console.log(form.querySelector('.eventName').value);
            openPopup('createBtn', 'successfullCreateWindow', currentWindow);
            
            let name = form.querySelector('.eventName').value;
            const eventName = form.querySelector('.eventName').value;
            const information = form.querySelector('.information').value;
            const startDate = form.querySelector('.startDate').value;
            const endDate = form.querySelector('.endDate').value;
            const fileUploadElement = form.querySelector('.file-upload');
            const fileUpload = fileUploadElement.files[0]?.name || '';
            
            const formData = {
                eventName,
                information,
                startDate,
                startTime,
                endDate,
                endTime,
                fileUpload,
                availability,
                host
            };

            // Log the formData object
            console.log('CREATED EVENT:', formData);
            form.reset();
            // Clear file input and file preview
            
            // fileUploadElement.value = ''; // Clear the file input

            // // Clear file preview
            const filePreview = form.querySelector('#file-preview');
            const labelContent = form.querySelector('.label-content');
            filePreview.classList.add('hidden'); // Clear the file preview
            labelContent.classList.remove('hidden');
     
            name = "";
            // Reset other UI elements if needed
        
        }
    });

    // Handle custom selects within the form using classes
    handleCustomSelect(form, 'availability');
    handleCustomSelect(form, 'start-time');
    handleCustomSelect(form, 'end-time');
    handleCustomSelect(form, 'host');
}
function handleEditSubmit(form) {
     form.addEventListener('submit', (event) => {
        event.preventDefault();

        if (event.submitter && event.submitter.type === 'submit' && (form.querySelector('.eventName').value)) {
            const eventName = form.querySelector('.eventName').value;
            const information = form.querySelector('.information').value;
            const startDate = form.querySelector('.startDate').innerHTML;
            const endDate = form.querySelector('.endDate').value;
            const fileUploadElement = form.querySelector('.file-upload');
            const fileUpload = fileUploadElement.files[0]?.name || '';

            let filePreviewElement = form.querySelector('.file-preview');
            let filePreview = filePreviewElement ? filePreviewElement.style.backgroundImage : '';

            const formData = {
                eventName,
                information,
                startDate,
                endDate,
                fileUpload,
                filePreview,
                availability,
                host
            };

            console.log('SAVED EDIT EVENT:', formData);
            form.reset();

            // Clear file preview
            if (filePreviewElement) {
                filePreviewElement.style.backgroundImage = '';
                filePreviewElement.classList.add('hidden');
            }

            // Reset other UI elements if needed
            // ...
        }
    });

    // Handle custom selects within the form using classes
    handleCustomSelect(form, 'availability');
    handleCustomSelect(form, 'start-time');
    handleCustomSelect(form, 'end-time');
    handleCustomSelect(form, 'host');
}

function handleCustomSelect(form, type) {
    const container = form.querySelector(`.${type}-container`);
    const select = container.querySelector('.custom-select-trigger');
    const options = container.querySelectorAll('.custom-option');

    select.addEventListener('click', function(event) {
        event.preventDefault();
        const dropdownOptions = container.querySelector('.custom-options');
        dropdownOptions.classList.toggle('hidden');
    });

    options.forEach(option => {
        option.addEventListener('click', function(event) {
            event.preventDefault();
            const value = option.getAttribute('data-value');
            const selectedText = container.querySelector('.custom-selected');
            selectedText.textContent = value;

            const dropdownOptions = container.querySelector('.custom-options');
            dropdownOptions.classList.add('hidden');

            // Save selected value based on the type
            switch (type) {
                case 'availability':
                    console.log(value);
                    availability = value;
                    break;
                case 'host':
                    console.log(value);
                    host = value;
                    break;
                case 'start-time':
                    console.log(value);
                    startTime = value;
                    break;
                case 'end-time':
                    console.log(value);
                    endTime = value;
                    break;
                // Add a default case if needed
                default:
                    // Handle default case if necessary
                    break;
            }
        });
    });
}

function openDropdown(btnElement, contentElement) {
    btnElement.addEventListener('click', function () {
        btnElement.classList.add('text-transparent', 'cursor-default');
        btnElement.classList.remove('cursor-pointer');
        btnElement.disabled = true;
        contentElement.classList.remove('hidden');
        contentElement.classList.add('md:flex');
    });
}

function listenForClicks() {
    const cardClasses = ['.your-event-card', '.event-card', '.your-joined-event-card'];

    cardClasses.forEach(cardClass => {
        const cards = document.querySelectorAll(cardClass);
        cards.forEach(card => {
            card.addEventListener('click', handleCardClick);
        });
    });
}

function handleCardClick(event) {
    const cardClass = event.currentTarget.classList[0];
    
    switch (cardClass) {
        case 'your-event-card':
            viewWindow = handleYourEventCard(event);
            populateViewWindow(event.currentTarget, viewWindow);
            populateEditWindow(event.currentTarget, document.querySelector('.editWindow'));
            currentWindow = viewWindow;
            break;
        case 'your-joined-event-card':
            viewWindow = handleJoinedEventCard();
              // Retrieve text content and populate the view window
            populateViewWindow(event.currentTarget, viewWindow);
            openPopup('openViewMyEvent', 'viewJoinedEventWindow', viewWindow);
            currentWindow = viewWindow;
            break;
        case 'event-card':
            viewWindow = handleOtherEventCard();
            // Retrieve text content and populate the view window
            populateViewWindow(event.currentTarget, viewWindow);
            openPopup('openViewOtherEventBtn', 'viewOtherEventWindow', viewWindow);
            currentWindow = viewWindow;
            break;
    }
   
  
    // Add event listener for clicks within the view window
    viewWindow.addEventListener('click', handleViewWindowClick);
}

//functions that gets called based on which type of card is clicked
function handleYourEventCard(event) {
    if (event.target.classList.contains('openEditWindowBtn')) {
        populateEditWindow(event.currentTarget, document.querySelector('.editWindow'));
        openPopup('openEditWindowBtn', 'editWindow', currentWindow);
        return document.querySelector('.editWindow');
    } 
    openPopup('openEditWindowBtn', 'viewMyEventWindow', currentWindow);
    return document.querySelector('.viewMyEventWindow');
}

function handleJoinedEventCard() {
    return document.querySelector('.viewJoinedEventWindow');
}

function handleOtherEventCard() {
    return document.querySelector('.viewOtherEventWindow');
}

//filling window with corresponding card-data
function populateViewWindow(card, viewWindow) {
    // Retrieve text content and populate the view window
    const eventTitle = card.querySelector('.event-title').textContent;
    const startDate = card.querySelector('.startDate').textContent;
    const startTime = card.querySelector('.startTime').textContent;
    const endDate = card.querySelector('.endDate').textContent;
    const endTime = card.querySelector('.endTime').textContent;
    const eventHost = card.querySelector('.event-host').textContent;
    const eventDescription = card.querySelector('.event-description').textContent;
    const eventParticipants = card.querySelector('.amount-participants').textContent;
    const imageSrc = card.querySelector('.event-img').getAttribute('src');
    const imageAlt = card.querySelector('.event-img').getAttribute('alt');

    const participantItems = card.querySelectorAll('.participant-item');
    const participantList = viewWindow.querySelector('.participant-list');

    viewWindow.querySelector('.startDate').textContent = startDate;
    viewWindow.querySelector('.startTime').textContent = startTime;

    viewWindow.querySelector('.endDate').textContent = endDate;
    viewWindow.querySelector('.endTime').textContent = endTime;
    viewWindow.querySelector('.event-titel').textContent = eventTitle;
    viewWindow.querySelector('.host').textContent = eventHost;
    viewWindow.querySelector('.description').textContent = eventDescription;
    viewWindow.querySelector('.particpants').textContent = eventParticipants;
    viewWindow.querySelector('.view-img').src = imageSrc;
    viewWindow.querySelector('.view-img').alt = imageAlt;

    participantList.innerHTML = ''; // Clear the list before appending

    participantItems.forEach(item => {
        // Clone each participant item and append to the participant list in the viewWindow
        participantList.appendChild(item.cloneNode(true));
    });

}

function populateEditWindow(card, editWindow) {
    const eventTitle = card.querySelector('.event-title').textContent;
    const startDate = card.querySelector('.startDate').textContent;
    const startTime = card.querySelector('.startTime').textContent;
    console.log('starttid: ', startTime);
    const endDate = card.querySelector('.endDate').textContent;
    const endTime = card.querySelector('.endTime').textContent;
    const description = card.querySelector('.event-description').textContent;
    const imgSrc = card.querySelector('.event-img').getAttribute('src');
    
     // Display the image in the file preview
    const filePreview = editWindow.querySelector('.file-preview');
    const labelContent = editWindow.querySelector('.label-content');
    labelContent.classList.add('hidden');
    filePreview.style.backgroundImage = `url('${imgSrc}')`;
    filePreview.classList.remove('hidden');
    // Populate input fields in the edit window
    editWindow.querySelector('#eventNameEdit').value = eventTitle;
    editWindow.querySelector('#startDateEdit').value = startDate;
    editWindow.querySelector('#endDateEdit').value = endDate;
    editWindow.querySelector('#informationEdit').value = description;
    editWindow.querySelector('.file-preview').backgroundImage = imgSrc;
    
    const startTimeSelected = editWindow.querySelector('.start-time-container .custom-selected');
    const startTimeSelectValue = editWindow.querySelector('#start-time-edit option');
    startTimeSelected.textContent = startTime;
    startTimeSelectValue.value = startTime;
    startTimeSelectValue.textContent = startTime;
    console.log(startTimeSelected);
    console.log(startTimeSelectValue);
    //  const startTime = card.querySelector('.startTime').textContent;
    const startTimeSelect = editWindow.querySelector('#start-time-edit');

    // Loop through options and set the selected attribute accordingly
    const options = startTimeSelect.querySelectorAll('option');
    options.forEach(option => {
        if (option.value === startTime) {
            option.selected = true;
        } else {
            option.removeAttribute('selected');
        }
    });
    
    document.body.appendChild(editWindow);
}

//handeling clicks within the new window
function handleViewWindowClick(event) {
    const clickedElement = event.target;
    const viewWindow = currentWindow;

    if (clickedElement.classList.contains('openEditWindowBtn')) {
        openPopup('openEditWindowBtn', 'editWindow', viewWindow);
    } else if (clickedElement.classList.contains('closePopupBtn')) {
        viewWindow.classList.add('hidden');
        overlay.classList.add('hidden');
    } else if (clickedElement.classList.contains('openSuccessfullJoinWindow')) {
        openPopup('joinEventBtn', 'successfullJoinWindow', viewWindow);
    } else if (clickedElement.classList.contains('openLeaveWindowBtn')) {
        openPopup('openLeaveWindowBtn', 'wannaLeaveWindow', viewWindow);
    } else if (clickedElement.classList.contains('saveBtn')) {
        openPopup('saveBtn', 'successfullCreateWindow', viewWindow);
    } 

}

function getEventDetails(details) {
    console.log(details);
    console.log('you joined: ', details.querySelector('.event-titel').textContent);
}
//all other events
function createCard(event){
    const cardContainer = document.querySelector('.event-card-container'); // Update with your container selector
    const newCard = document.createElement('div');
    newCard.classList.add('event-card', 'border-[0.5px]', 'border-cloudy-300', 'h-32', 'flex', 'mx-auto', 'bg-white', 'hover:bg-lake-100', 'hover:cursor-pointer', 'transition', 'ease-in', 'delay-400', 'w-full', 'max-w-md', 'lg:max-w-lg', 'rounded-lg', 'overflow-hidden', 'shadow-lg');

    const participantCount = event.participants[0].users.length;
    // Modify the image source based on your event data
    const imageSrc = `assets/images/${event.img.src}`; // Assuming your event object has an 'image' property

    newCard.innerHTML = `
        <div class="sm:h-48 w-2/5 rounded-bl-lg overflow-hidden">
            <img class="event-img h-48 w-full object-cover flex-none bg-cover text-center" src="${imageSrc}" alt="${event.img.alt}">
        </div>
        <div class="sm:w-3/5 px-4 py-3 flex flex-col justify-between">
            <div class="mt-1">
                <p class="start text-gray-700 text-sm">${event.startDate} at ${event.startTime}</p>
                <p class="startDate hidden text-gray-700 text-sm">${event.startDate}</p>
                <p class="startTime hidden text-gray-700 text-sm">${event.startTime}</p>
                <p class="endDate hidden text-gray-700 text-sm">${event.endDate}</p>
                <p class="endTime hidden text-gray-700 text-sm">${event.endTime}</p>
                <p class="startTime hidden text-gray-700 text-sm">${event.startTime}</p>
                <h3 class="event-title text-gray-900 font-bold text-md sm:text-lg">${event.type}</h3>
                <p class="event-description hidden">${event.description}</p>
            </div>
            <div class="sm:text-right">
                <button class="openViewOtherEventBtn text-xs sm:text-sm bg-transparent border-[1.5px] border-midnight text-midnight font-bold py-1.5 px-6 rounded-full">View</button>
            </div>
            <!--HOST-->
            <h4 class="hidden event-host">${event.host}</h4>
             <!-- Participant list -->
            <h5 class="amount-participants hidden text-midnight text-xs sm:text-sm mt-auto pb-2">
                ${participantCount} 
            </h5>
            <ul class="participant-list hidden columns-1 sm:columns-2 space-y-1">
                ${event.participants[0].users.map(user => `
                    <li class="participant-item flex items-center">
                        <img class="w-8 h-8 rounded-full mr-4" src="assets/images/${user.img}" alt="Avatar of ${user.name}">
                        <div class="text-sm">
                            <p class="text-gray-900 leading-none">${user.name}</p>
                        </div>
                    </li>
                `).join('')}
            </ul>
        </div>
    `;

    cardContainer.appendChild(newCard);
}

//events you created
function createYourCard(event) {
    const cardContainer = document.querySelector('.your-event-card-container'); // Update with your container selector
    const newCard = document.createElement('div');
    newCard.classList.add('your-event-card', 'h-80', 'border-[0.5px]', 'border-cloudy-300', 'sm:h-72', 'mx-auto', 'bg-white', 'hover:bg-lake-100', 'hover:cursor-pointer', 'transition', 'ease-in', 'delay-400', 'w-full', 'max-w-md', 'lg:max-w-lg', 'rounded-md', 'sm:rounded-lg', 'overflow-hidden', 'shadow-lg');

    const participantCount = event.participants[0].users.length;
    const imageSrc = `assets/images/${event.img.src}`;

    newCard.innerHTML = `
        <img class="event-img w-full h-36 object-cover" src="${imageSrc}" alt="${event.img.alt}">
        <div class="px-6 py-6 sm:py-3 flex flex-col sm:flex-row h-40 sm:h-36">
            <div class="flex-1 space-y-1 flex flex-col justify-between">
                <h4 class="text-gray-700 text-sm">
                   
                <p class="start text-gray-700 text-sm">${event.startDate} at ${event.startTime}</p>
                <p class="startDate hidden text-gray-700 text-sm">${event.startDate}</p>
                <p class="startTime hidden text-gray-700 text-sm">${event.startTime}</p>
                <p class="endDate hidden text-gray-700 text-sm">${event.endDate}</p>
                <p class="endTime hidden text-gray-700 text-sm">${event.endTime}</p>
                <p class="startTime hidden text-gray-700 text-sm">${event.startTime}</p>
                
            
                </h4>
                <h3 class="event-title font-bold text-lg">${event.type}</h3>
                <h4 class="text-cloudy-200 text-xs sm:text-sm mb-auto">
                    By <span class="event-host">${event.host}</span>
                </h4>
                <h5 class="amount-participants text-midnight text-xs sm:text-sm mt-auto pb-2">
                    ${participantCount} Participants 
                </h5>
                <ul class="participant-list hidden columns-1 sm:columns-2 space-y-1">
                    ${event.participants[0].users.map(user => `
                        <li class="participant-item flex items-center">
                            <img class="w-8 h-8 rounded-full mr-4" src="assets/images/${user.img}" alt="Avatar of ${user.name}">
                            <div class="text-sm">
                                <p class="text-gray-900 leading-none">${user.name}</p>
                            </div>
                        </li>
                    `).join('')}
                </ul>
                <p class="event-description hidden">${event.description}</p>
            </div>
            <div class="flex py-2 sm:py-0 flex-1 items-end justify-center gap-x-4 sm:justify-end">
                <button class="openEditWindowBtn transition text-xs sm:text-sm duration-600 ease-in-out bg-lake-300 text-white font-bold py-2 px-8 rounded-full">Edit</button>    
                <button class="openViewWindowBtn text-xs sm:text-sm bg-transparent border-[1.5px] border-midnight text-midnight font-bold py-1.5 px-6 rounded-full">View</button>
            </div>
        </div>
    `;

    cardContainer.appendChild(newCard);
}

//events that you've joined
function createJoinedCard(event) {
    const cardContainer = document.querySelector('.your-event-card-container'); // Update with your container selector
    const newCard = document.createElement('div');
    newCard.classList.add('your-joined-event-card', 'h-80', 'border-[0.5px]', 'border-cloudy-300', 'sm:h-72', 'mx-auto', 'bg-white', 'hover:bg-lake-100', 'hover:cursor-pointer', 'transition', 'ease-in', 'delay-400', 'w-full', 'max-w-md', 'lg:max-w-lg', 'rounded-md', 'sm:rounded-lg', 'overflow-hidden', 'shadow-lg');
    const participantCount = event.participants[0].users.length;
    const imageSrc = `assets/images/${event.img.src}`;

    newCard.innerHTML = `
        <img class="event-img w-full h-36 object-cover" src="${imageSrc}" alt="${event.img.alt}">
        <div class="px-6 py-6 sm:py-3 flex flex-col sm:flex-row h-40 sm:h-36">
            <div class="flex-1 space-y-1 flex flex-col justify-between">
                <h4 class="text-gray-700 text-sm">
                    
                    <p class="start text-gray-700 text-sm">${event.startDate} at ${event.startTime}</p>
                    <p class="startDate hidden text-gray-700 text-sm">${event.startDate}</p>
                    <p class="startTime hidden text-gray-700 text-sm">${event.startTime}</p>
                    <p class="endDate hidden text-gray-700 text-sm">${event.endDate}</p>
                    <p class="endTime hidden text-gray-700 text-sm">${event.endTime}</p>
                    <p class="startTime hidden text-gray-700 text-sm">${event.startTime}</p>
                </h4>
                <h3 class="event-title font-bold text-lg">${event.type}</h3>
                <h4 class="text-cloudy-200 text-xs sm:text-sm mb-auto">
                    By <span class="event-host">${event.host}</span>
                </h4>
                <h5 class="amount-participants text-midnight text-xs sm:text-sm mt-auto pb-2">
                    ${participantCount} Participants 
                </h5>
                <ul class="participant-list hidden columns-1 sm:columns-2 space-y-1">
                    ${event.participants[0].users.map(user => `
                        <li class="participant-item flex items-center">
                            <img class="w-8 h-8 rounded-full mr-4" src="assets/images/${user.img}" alt="Avatar of ${user.name}">
                            <div class="text-sm">
                                <p class="text-gray-900 leading-none">${user.name}</p>
                            </div>
                        </li>
                    `).join('')}
                </ul>
                <p class="event-description hidden">${event.description}</p>
            </div>
            <div class="flex py-2 sm:py-0 flex-1 items-end justify-center gap-x-4 sm:justify-end">
                
                <button class="openViewWindowBtn text-xs sm:text-sm bg-transparent border-[1.5px] border-midnight text-midnight font-bold py-1.5 px-6 rounded-full">View</button>
            </div>
        </div>
    `;

    cardContainer.appendChild(newCard);
}

//handling window interaction and closing etc...
function openPopup(openButtonClass, popupClass, window) {
    let openButtons = document.querySelectorAll(`.${openButtonClass}`);
    let popups = document.querySelector(`.${popupClass}`);
    overlay.classList.remove('hidden');

    if(window){
        window.classList.add('hidden');
    }
    
    popups.classList.remove('hidden');

    openButtons.forEach(openButton => {
        openButton.addEventListener('click', (event) => {
            let popup = document.querySelector(`.${popupClass}`);
            overlay.classList.remove('hidden');
            // Open the corresponding popup
            popup.classList.remove('hidden');

            // Access the event target
            let clickedElement = event.target;
            
        });
    });
    
    let closeButtons = document.querySelectorAll('.closePopupBtn');

    closeButtons.forEach(closeButton => {
        closeButton.addEventListener('click', () => {
            let parentPopup = closeButton.closest(`.${popupClass}`);
            if(parentPopup) {
                // Close the corresponding popup
            parentPopup.classList.add('hidden');
            }
            
            document.querySelector('#overlay').classList.add('hidden');
        });
    });
}

//displaying file upload in preview
function displaySelectedImage(event) {
  const fileInput = event.target;
  const file = fileInput.files[0];
  const fileReader = new FileReader();
  const filePreview = fileInput.parentElement.querySelector('.file-preview');
  const labelContent = fileInput.parentElement.querySelector('.label-content');

  fileReader.onload = function () {
    labelContent.classList.add('hidden');
    filePreview.style.backgroundImage = `url('${this.result}')`;
    filePreview.classList.remove('hidden');
  };

  if (file) {
    fileReader.readAsDataURL(file);
  }
}

const fileUploadInputs = document.querySelectorAll('.file-upload');

fileUploadInputs.forEach(input => {
  input.addEventListener('change', displaySelectedImage);
});


