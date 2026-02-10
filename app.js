document.getElementById('loginButton').addEventListener('click', function() {
    const clientId = 'cEofXoYmuJdwFYo4jS_-25fVtTYcbHsoxGENz892SeY'; // Replace with your Are.na client ID
    const redirectUri = 'https://localhost/index.html'; // Make sure this matches with Are.na settings

    const authUrl = `https://are.na/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token`;

    window.location.href = authUrl; // Redirect to Are.na authorization page
});

// Check if the page has an access token in the URL when it's loaded
window.onload = function() {
    if (window.location.hash) {
        const hashParams = new URLSearchParams(window.location.hash.substr(1)); // Remove the '#' and get URL parameters
        const accessToken = hashParams.get('access_token');
        
        if (accessToken) {
            document.getElementById('result').textContent = `Access Token: ${accessToken}`;
            // You can also store this token for future API calls
        } else {
            document.getElementById('result').textContent = 'No access token found.';
        }
    }
};
