window.addEventListener('load', () => {
    setupPopups();
    setupImageCarousel();
})

function setupPopups() {
  // showPopup('instructionBtn', 'popup');
  showPopup('joinChallangeBtn', 'challangePopup', 'successfullyJoinedPopup');
  showPopup('saveBtn', 'savedPopup');

}

function showPopup(popupBtnId, popupId, nestedPopupId = null) {
  let popupBtn = document.querySelector(`#${popupBtnId}`);
  let popup = document.querySelector(`#${popupId}`);
  let overlay = document.querySelector('#overlay');
  let childBtn = popup.querySelector('.joinBtn');
  
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

    if (nestedPopupId) {
        document.querySelector('#joinBtn').disabled = true;
        childBtn.addEventListener('click', () => {
            showSuccessNotification(popup, overlay);
        });
    }
  });
}

function showSuccessNotification(popup, overlay){
    let successPopup = document.querySelector('#successfullyJoinedPopup');
    successPopup.classList.remove('hidden');
    popup.classList.add('hidden');

    const closeButtons = successPopup.querySelectorAll('.closePopupBtn');
    closeButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        successPopup.classList.add('hidden');
        overlay.classList.add('hidden');
      });
    });
}

/**
 * 
 * FOR IMAGE CAROUSEL IN WEEKLY CHALLANGE WINDOW
 */
function setupImageCarousel() {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const slides = document.querySelectorAll('.slide');
  const imageSources = Array.from(slides, slide => slide.querySelector('img').src);
  const paragraphSources = Array.from(slides, slide => slide.querySelector('.user-name').textContent);
  let currentIndex = 1;
  let currentIndexOfP = 1;

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
    currentIndexOfP = (currentIndexOfP === 0) ? slides.length - 1 : currentIndexOfP - 1;
    moveCarousel(currentIndex, currentIndexOfP, imageSources, paragraphSources);
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
    currentIndexOfP = (currentIndexOfP == slides.length -1) ? 0 : currentIndexOfP + 1;
    moveCarousel(currentIndex, currentIndexOfP, imageSources, paragraphSources);
  });

  slides.forEach(slide =>{
        slide.addEventListener('click', ()=>{
            currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
            currentIndexOfP = (currentIndexOfP == slides.length -1) ? 0 : currentIndexOfP + 1;
            moveCarousel(currentIndex, currentIndexOfP, imageSources, paragraphSources);
        })
    });
}

function moveCarousel(currentIndex, currentIndexOfP, imageSources, paragraphSources) {
    const slides = document.querySelectorAll('.slide');
    
    //for image
    const middleIndex = currentIndex;
    const leftIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
    const rightIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;

    //for paragraph user-name
    const middleIndexOfP = currentIndexOfP;
    const leftIndexOfP = (currentIndexOfP === 0) ? slides.length - 1 : currentIndexOfP - 1;
    const rightIndexOfP = (currentIndexOfP === slides.length - 1) ? 0 : currentIndexOfP + 1;

    //for images
    slides[0].querySelector('img').src = imageSources[leftIndex];
    slides[1].querySelector('img').src = imageSources[middleIndex];
    slides[2].querySelector('img').src = imageSources[rightIndex];

    //for paragraphs
    slides[0].querySelector('.user-name').textContent = paragraphSources[leftIndexOfP];
    slides[1].querySelector('.user-name').textContent = paragraphSources[middleIndexOfP];
    slides[2].querySelector('.user-name').textContent = paragraphSources[rightIndexOfP];

}

/**
 * 
 * Displaying preview image from file upload in join challange
 */

function displaySelectedImage(event) {
  const fileInput = event.target;
  const file = fileInput.files[0];
  const fileReader = new FileReader();
  const filePreview = document.getElementById('file-preview');
  const labelContent = document.querySelector('.label-content');

  fileReader.onload = function () {
    labelContent.classList.add('hidden');
    filePreview.style.backgroundImage = `url('${this.result}')`;
    let joinBtn = document.querySelector('#joinBtn');
    joinBtn.classList.remove('bg-bubble-gum-400');
    joinBtn.classList.add('bg-bubble-gum-200');
    joinBtn.disabled = false;
    
    filePreview.classList.remove('hidden');
  };

  if (file) {
    fileReader.readAsDataURL(file);
  }
}

const fileUploadInput = document.getElementById('file-upload');
fileUploadInput.addEventListener('change', displaySelectedImage);

