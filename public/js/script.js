const form = document.getElementById('urlForm');
form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form submission
    const urlInput = document.getElementById('url').value;

    // Fetch the screenshot
    const response = await fetch('/screenshot', {
        method: 'POST',
        body: JSON.stringify({ url: urlInput }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const imageUrl = await response.text();
        const imgElement = document.getElementById('screenshot');
        imgElement.src = imageUrl;
        imgElement.style.display = 'block'; // Show the screenshot
    } else {
        alert('Failed to take screenshot');
    }
});