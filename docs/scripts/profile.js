// Constants for parent containers
const accountOverview = document.querySelector('#account-overview-content');
const notifications = document.querySelector('#notifications-content');
const prizes = document.querySelector('#prizes-content');

// Constants for buttons
const editButton = document.getElementById('editButton');
const saveFormButton = document.getElementById('submitEditButton');
const saveBtns = document.querySelectorAll('.save');
const notificationsBtn = notifications.querySelector('.save-notifications');
const prizeBtns = document.querySelectorAll('.save-prize');

const formInputs = document.querySelectorAll('input');
// Constants for file upload
const fileUploadInput = document.getElementById('file-upload');

// Initialize UI elements and event listeners
initializeUI();
initializeEventListeners();

function initializeUI() {
    // Initialize button states
    saveBtns.forEach(btn => {
        btn.disabled = true;
    });
    saveFormButton.disabled = false;

    formInputs.forEach(input => {
      input.disabled = true;
    });

    // Initialize file upload event listener
    fileUploadInput.addEventListener('change', displaySelectedImage);

    // Setup custom selects
    setupCustomSelects(accountOverview);
    setupCustomSelects(notifications);
    setupCustomSelects(prizes);

    // Add event listeners for form buttons and notifications settings
    editButton.addEventListener('click', editForm);
    saveFormButton.addEventListener('click', saveForm);
    notificationsBtn.addEventListener('click', saveNotifications);
}

function initializeEventListeners() {
    // Add event listeners for popup buttons
    showPopup('save', 'successfullySavedPopup');
    showPopup('delete', 'sureYouWannaDelete');
}

function setupCustomSelects(parent) {
    // Functionality to setup custom selects
    const customSelectContainers = parent.querySelectorAll('.custom-select-container');

    customSelectContainers.forEach(container => {
      const select = container.querySelector('.custom-select');
      const options = container.querySelector('.custom-options');
      const selectedText = container.querySelector('.custom-selected');
      const svg = container.querySelector('.toggleSvg');
      const btn = container.querySelector('.save');

        //drop-down if btn is not locked
        select.addEventListener('click', () => {
            if (!select.classList.contains('locked')){
              options.classList.toggle('hidden');
              svg.classList.toggle('rotate-180');
            }
        });

        options.addEventListener('click', (event) => {
            if (event.target.classList.contains('custom-option')) {
              const value = event.target.getAttribute('data-value');
              selectedText.textContent = event.target.textContent;
              select.value = value;
              
              // Enabling btn for save
              if(accountOverview == parent){
                btn.classList.add('bg-bubble-gum-300');
                btn.classList.remove('bg-bubble-gum-400');
                btn.disabled = false;
                // Logging saved changes
                btn.addEventListener('click', ()=> {
                  console.log(`Selected option for ${select.id}: ${select.value} saved!`);
                });
              } 
              else if(notifications == parent){
                  notificationsBtn.disabled = false;
                  notificationsBtn.classList.add('bg-bubble-gum-300');
                  notificationsBtn.classList.remove('bg-bubble-gum-400');
              }
              else if (prizes == parent) {
                let level = parent.querySelector('.open-level');
                let levelBtn = level.querySelector('.save-prize');
                levelBtn.disabled = false;
                levelBtn.classList.add('bg-bubble-gum-300');
                levelBtn.classList.remove('bg-bubble-gum-400');
                
                levelBtn.addEventListener('click', () => {
                    savePrizes(select.id, select.value);
                  });
              }
            }
        });
      
    });
  
}

function editForm() {
    // Functionality to handle editing form
    // Show save button and hide edit button
    saveFormButton.classList.remove('hidden');
    editButton.classList.add('hidden');

    // Add full border to input fields
      formInputs.forEach(input => {
        //enabling btns when edit is clicked
        input.disabled = false;
        input.classList.remove('border-x-0', 'border-t-0', 'border-b-1', 'border-b-cloudy-600');
        input.classList.add('border', 'border-midnight', 'rounded');
    });
}

function saveForm(e) {
    // Functionality to handle saving form
     e.preventDefault();
  
  if (e.target == saveFormButton){
    formInputs.forEach(input => {
        console.log(`${input.id}: ${input.value}`);
    });

    // Hide save button and show edit button
    saveFormButton.classList.add('hidden');
    editButton.classList.remove('hidden');
  }  
}

function displaySelectedImage(event) {
    // Functionality to display selected image
    const fileInput = event.target;
  const file = fileInput.files[0];
  const fileReader = new FileReader();
  const filePreview = document.getElementById('file-preview');
  const labelContent = document.querySelector('.label-content');

  fileReader.onload = function () {
    labelContent.classList.add('hidden');
    filePreview.style.backgroundImage = `url('${this.result}')`;
    filePreview.classList.remove('hidden');
  };

  if (file) {
    fileReader.readAsDataURL(file);
  }
}


function showPopup(popupBtnClass, popupId) {
  // Functionality to show popup
  let popupBtns = document.querySelectorAll(`.${popupBtnClass}`);
  let popup = document.querySelector(`#${popupId}`);
  let overlay = document.querySelector('#overlay');

  popupBtns.forEach(popupBtn => {
    popupBtn.addEventListener('click', () => {
       popup.classList.remove('hidden');
      overlay.classList.remove('hidden');

      const closeButtons = popup.querySelectorAll('.closePopupBtn');
      closeButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
          popup.classList.add('hidden');
          overlay.classList.add('hidden');
        });
      });
    })
  });
}

function saveNotifications() {
    // Functionality to save notifications settings
     let notificationsFields = notifications.querySelectorAll('.custom-select');
  
  notificationsFields.forEach(field => {
    console.log(`${field.id}: ${field.value}`);
  });
}

function savePrizes(product, selected) {
    // Functionality to save prizes
    console.log(product, ':', selected, '---saved');
}