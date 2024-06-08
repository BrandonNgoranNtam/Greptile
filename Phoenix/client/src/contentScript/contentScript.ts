// Function to retrieve blocked keywords from local storage
function getBlockedKeywords() {
  return new Promise((resolve, reject) => {
      chrome.storage.local.get(['blockedKeywords'], function(result) {
          if (chrome.runtime.lastError) {
              reject(chrome.runtime.lastError);
          } else {
              resolve(result.blockedKeywords || []);
          }
      });
  });
}

// Function to check if an element contains any blocked keyword
function containsBlockedKeyword(element, keywords) {
  return keywords.some(keyword => element.textContent.toLowerCase().includes(keyword.toLowerCase()));
}

// Function to blur elements containing blocked keywords
function blurElements(keywords) {
  const elements = document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6');
  elements.forEach(element => {
      if (containsBlockedKeyword(element, keywords)) {
        (element as HTMLElement).style.filter = 'blur(5px)';
        (element as HTMLElement).style.transition = 'filter 0.3s';
        (element as HTMLElement).style.cursor = 'pointer';
        (element as HTMLElement).addEventListener('click', () => {
            (element as HTMLElement).style.filter = 'none';
        });
      }
  });
}

// Fetch blocked keywords and blur elements
getBlockedKeywords().then(blurElements).catch(console.error);