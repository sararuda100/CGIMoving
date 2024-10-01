window.addEventListener("load", () => {
  highlightCurrentLink();
  setupDropdown();
  showPopup('instructionBtn', 'popup');
  
});

function highlightCurrentLink() {
  let currentPageUrl = window.location.href;
  let navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const isCurrentPage = link.href === currentPageUrl;

    if (isCurrentPage) {
      link.classList.add('text-lake-200');
      let profileLink = document.querySelector('.profileLink');
      if (currentPageUrl.includes("profile.html")) {
        profileLink.classList.add('text-lake-200');
      }
    } else {
      link.classList.remove('text-lake-200');
      link.classList.add('text-gray-900');
    }
  });
}

/**
 * NAVBAR DROPDOWN TOGGLE ARROW-BTN AND UL-ELEMENT
 */
function setupDropdown() {
  let navDropdown = document.querySelector('#dropdownNavbarLink');
  navDropdown.addEventListener('click', toggleDropdown);
}

function toggleDropdown() {
  let svg = document.querySelector('.toggleSvg');
  let dropdown = document.querySelector('#dropdownNavbar');
  let isDropdownOpen = getComputedStyle(dropdown).display !== 'hidden';
  svg.classList.toggle('rotate-180');
}

/**NAV HELP/INSTRUCTIONS-BTN, POPUP WINDOW */
function showPopup(popupBtnId, popupId, nestedPopupId = null) {
  let popupBtn = document.querySelector(`#${popupBtnId}`);
  let popup = document.querySelector(`#${popupId}`);
  let overlay = document.querySelector('#overlay');
  // let childBtn = popup.querySelector('.joinBtn');
  
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

    // if (nestedPopupId) {
    //     document.querySelector('#joinBtn').disabled = true;
    //     childBtn.addEventListener('click', () => {
    //         showSuccessNotification(popup, overlay);
    //     });
    // }
  });
}

