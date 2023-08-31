const jwt = require('jsonwebtoken');

const Bearertoken = localStorage.getItem('authToken');
console.log('Token has jwt.',Bearertoken);
try {
  const decodedToken = jwt.decode(token, { complete: true });
  
  if (decodedToken && decodedToken.payload && decodedToken.payload.exp) {
    const expirationTime = decodedToken.payload.exp;
    const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds
  
    if (currentTime < expirationTime) {
      console.log('Token is valid. Expiration:', new Date(expirationTime * 1000));
    } else {
      console.log('Token has expired.');
    }
  } else {
    console.log('Invalid token format or missing expiration claim.');
  }
} catch (error) {
  console.error('Error decoding token:', error.message);
}
