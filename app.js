document.getElementById('loginButton').addEventListener('click', function() {
    const clientId = 'cEofXoYmuJdwFYo4jS_-25fVtTYcbHsoxGENz892SeY'; // Replace with your Are.na client ID
    const redirectUri = 'fortefrankie.github.io/index.html'; // Make sure this matches with Are.na settings


	const authUrl = `https://are.na/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code`;


    window.location.href = authUrl; // Redirect to Are.na authorization page
});

window.onload = async function() {
    if (window.location.search) {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            // Exchange the authorization code for an access token
            const accessToken = await exchangeCodeForToken(code);
            document.getElementById('result').textContent = `Access Token: ${accessToken}`;
        } else {
            document.getElementById('result').textContent = 'No authorization code found.';
        }
    }
};

// Function to exchange the authorization code for an access token
async function exchangeCodeForToken(code) {
    const clientId = 'cEofXoYmuJdwFYo4jS_-25fVtTYcbHsoxGENz892SeY'; // Replace with your Are.na Client ID
    const clientSecret = 'psueZN8qPFZHoqbiFG_7I3CKAT-aZhuQt5t9DtzRDks'; // Replace with your Are.na Client Secret
    const redirectUri = 'https://fortefrankie.github.io/arenapage/index.html'; // Update with your GitHub Pages URL

    const response = await fetch('https://are.na/oauth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            grant_type: 'authorization_code',
            client_id: clientId,
            client_secret: clientSecret, // Send your client secret
            redirect_uri: redirectUri,
            code: code
        }),
    });

    const data = await response.json();
    if (data.access_token) {
        return data.access_token; // Return the access token
    } else {
        throw new Error('Error retrieving access token: ' + data.error);
    }
}

