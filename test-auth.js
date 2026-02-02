// Test script for authentication
const fetch = require('node-fetch');

async function testAuth() {
  try {
    console.log('Testing authentication...');

    // Test registration
    console.log('\n1. Testing registration...');
    const registerResponse = await fetch('http://localhost:4000/api/hustlers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        university: 'Makerere University',
        category: 'Tech',
        location: 'Block A',
        bio: 'Test bio'
      })
    });

    if (registerResponse.ok) {
      const user = await registerResponse.json();
      console.log('✅ Registration successful:', user.name);
    } else {
      console.log('❌ Registration failed:', registerResponse.status);
    }

    // Test login
    console.log('\n2. Testing login...');
    const loginResponse = await fetch('http://localhost:4000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123'
      })
    });

    if (loginResponse.ok) {
      const loginData = await loginResponse.json();
      console.log('✅ Login successful, got token:', loginData.token ? 'Yes' : 'No');
      const token = loginData.token;

      // Test token verification
      console.log('\n3. Testing token verification...');
      const verifyResponse = await fetch('http://localhost:4000/api/auth/verify', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (verifyResponse.ok) {
        const userData = await verifyResponse.json();
        console.log('✅ Token verification successful:', userData.hustler.name);
      } else {
        console.log('❌ Token verification failed:', verifyResponse.status);
      }

      // Test protected route
      console.log('\n4. Testing protected route...');
      const protectedResponse = await fetch(`http://localhost:4000/api/hustlers/${loginData.hustler.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ bio: 'Updated bio' })
      });

      if (protectedResponse.ok) {
        console.log('✅ Protected route successful');
      } else {
        console.log('❌ Protected route failed:', protectedResponse.status);
      }

    } else {
      console.log('❌ Login failed:', loginResponse.status);
      const error = await loginResponse.json();
      console.log('Error:', error);
    }

  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

testAuth();