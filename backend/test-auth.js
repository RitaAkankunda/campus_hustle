const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:4000';

async function testAuth() {
    console.log('Starting Authentication Tests...\n');

    try {
        // Test 1: Register a new user
        console.log('1. Testing User Registration...');
        const registerResponse = await fetch(`${BASE_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: 'Test User',
                email: 'test@example.com',
                password: 'testpassword123',
                university: 'Test University',
                category: 'Test Category',
                location: 'Test Location',
                bio: 'Test bio'
            }),
        });

        const registerData = await registerResponse.json();
        console.log('Registration Response:', registerData);

        if (!registerResponse.ok) {
            console.log('Registration failed, trying login with existing user...');
        }

        // Test 2: Login
        console.log('\n2. Testing User Login...');
        const loginResponse = await fetch(`${BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: 'test@example.com',
                password: 'testpassword123'
            }),
        });

        const loginData = await loginResponse.json();
        console.log('Login Response:', loginData);

        if (!loginResponse.ok) {
            console.log('Login failed, trying with existing user from hustlers.json...');
            // Try with existing user
            const existingLoginResponse = await fetch(`${BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: 'joyk@gmail.com',
                    password: '22222222'
                }),
            });

            const existingLoginData = await existingLoginResponse.json();
            console.log('Existing User Login Response:', existingLoginData);

            if (existingLoginResponse.ok && existingLoginData.token) {
                token = existingLoginData.token;
                console.log('Using existing user token for further tests');
            } else {
                console.log('All login attempts failed');
                return;
            }
        }

        const token = loginData.token || registerData.token;
        if (!token) {
            console.log('No token received');
            return;
        }

        // Test 3: Verify token
        console.log('\n3. Testing Token Verification...');
        const verifyResponse = await fetch(`${BASE_URL}/api/auth/verify`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const verifyData = await verifyResponse.json();
        console.log('Token Verification Response:', verifyData);

        // Test 4: Access protected route
        console.log('\n4. Testing Protected Route Access...');
        const protectedResponse = await fetch(`${BASE_URL}/api/hustlers`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const protectedData = await protectedResponse.json();
        console.log('Protected Route Response:', protectedData);

        // Test 5: Test PUT request (update profile)
        console.log('\n5. Testing Profile Update (PUT request)...');
        const updateResponse = await fetch(`${BASE_URL}/api/hustlers/${loginData.user?.id || 1}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                bio: 'Updated bio for testing'
            }),
        });

        const updateData = await updateResponse.json();
        console.log('Profile Update Response:', updateData);

        console.log('\n✅ All authentication tests completed!');

    } catch (error) {
        console.error('❌ Test failed with error:', error.message);
    }
}

// Run the tests
testAuth();