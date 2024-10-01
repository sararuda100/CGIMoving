window.addEventListener("load", (event) => {
  console.log('loaded content in login/register/forgot-pw');
    setupCustomSelects();

});

function setupCustomSelects() {
    //for register user
    handleCustomSelect('offices', 'office');
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
       
        //   if(isNaN(value)){
        //     activityName = value;
        //   }
        //   else {
        //     office = value;
        //   }
        }
    });
}