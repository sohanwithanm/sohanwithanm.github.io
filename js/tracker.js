
function getReadableTimestamp() 
{
    return new Date().toLocaleString();
}

function getElementType(element) 
{
    if (element.tagName === 'IMG') return 'image';
    if (element.tagName === 'A') return 'link';
    if (element.tagName === 'P') return 'text';
    if (element.tagName === 'SELECT') return 'dropdown';
    if (element.tagName === 'BUTTON') return 'button';
    if (element.tagName === 'H1' || element.tagName === 'H2' || element.tagName === 'H3') return 'heading';
    if (element.tagName === 'UL' || element.tagName === 'LI') return 'list';
    return element.tagName.toLowerCase();
}

  // Log clicks
document.addEventListener('click', function(event) 
{
    const elementType = getElementType(event.target);
    console.log(`${getReadableTimestamp()} , click , ${elementType}`);
});

  // Log views on specific sections
const observer = new IntersectionObserver((entries) => 
{
    entries.forEach(entry => {
        if (entry.isIntersecting) 
        {
            const elementType = getElementType(entry.target);
            console.log(`${getReadableTimestamp()} , view , ${elementType}`);
        }
    });
}, {
    threshold: 0.5  // Element is considered "viewed" when 50% visible
});

  // Add observer to target elements
window.addEventListener('DOMContentLoaded', () => 
{
    const elementsToTrack = document.querySelectorAll('p, img, a, select, h2, ul, li');
    elementsToTrack.forEach(el => observer.observe(el));
});

