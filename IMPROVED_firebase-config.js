/**
 * ✅ IMPROVED: firebase-config.js
 * Secure Firebase configuration with environment variables
 * 
 * SECURITY: API keys should be in environment variables, not source code!
 * Example .env file:
 * VITE_FIREBASE_API_KEY=your_api_key
 * VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
 * etc.
 */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js';

/**
 * Firebase Configuration
 * 
 * ⚠️  IMPORTANT SECURITY NOTE:
 * These values should come from environment variables, not hardcoded!
 * 
 * For development (local):
 *   Use .env.local with VITE_* prefix
 * 
 * For production:
 *   Use Firebase Cloud Functions with service account
 */

const firebaseConfig = {
  // ⚠️  WARNING: These should be environment variables
  apiKey: process.env.VITE_FIREBASE_API_KEY || 'YOUR_API_KEY',
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || 'your-project.firebaseapp.com',
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || 'your-project',
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || 'your-project.appspot.com',
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.VITE_FIREBASE_APP_ID || ''
};

// Validate configuration
if (!firebaseConfig.apiKey || firebaseConfig.apiKey === 'YOUR_API_KEY') {
  console.error('❌ Firebase API key not configured! Check your environment variables.');
}

/**
 * Initialize Firebase
 */
let app, auth, db, rtdb;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  rtdb = getDatabase(app);
  console.log('✅ Firebase initialized successfully');
} catch (error) {
  console.error('❌ Firebase initialization failed:', error.message);
}

/**
 * Export Firebase services
 */
export { app, auth, db, rtdb };

/**
 * Optional: Helper functions for common Firebase operations
 */

/**
 * Check if user exists by email
 */
export async function checkUserExists(email) {
  try {
    // This requires Firebase REST API or custom backend
    console.warn('Use your backend API to check user existence');
    return false;
  } catch (error) {
    console.error('Error checking user:', error);
    return false;
  }
}

/**
 * Get current user profile
 */
export async function getUserProfile(userId) {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      console.log('User profile not found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
}

/**
 * Update user profile
 */
export async function updateUserProfile(userId, profileData) {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...profileData,
      lastUpdated: new Date()
    });
    console.log('✅ Profile updated successfully');
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
}

/**
 * Create new donation record
 */
export async function createDonation(donationData) {
  try {
    const donationRef = collection(db, 'donations');
    const result = await addDoc(donationRef, {
      ...donationData,
      createdAt: new Date(),
      status: 'pending'
    });
    return result.id;
  } catch (error) {
    console.error('Error creating donation:', error);
    throw error;
  }
}

/**
 * Fetch nearby donors (requires geolocation)
 */
export async function getNearbyDonors(userLocation, radiusKm = 10) {
  try {
    // This would typically require a custom backend due to Firestore limitations
    console.warn('Use your backend API for geospatial queries');
    return [];
  } catch (error) {
    console.error('Error fetching nearby donors:', error);
    throw error;
  }
}
