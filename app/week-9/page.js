"use client";
// Import the useUserAuth hook
import { useUserAuth } from "./_utils/auth-context";

export default function Page() {
    // Use the useUserAuth hook to get the user object and the login and logout functions
    const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
    
    // Sign in to Firebase with GitHub authentication
    const signIn = async () => {
        await gitHubSignIn();
    };
    
    // Sign out of Firebase
    const signOut = async () => {
        await firebaseSignOut();
    };
    
    // Display some of the user's information
    return (
        <main>
            <h1 className="text-3xl">Shopping List</h1>
            <div>
                {user ? (
                    <div>
                        <p className="text-xl">Welcome, {user.displayName}!</p>
                        <p className="text-xl">Email: {user.email}</p>
                        <button className="px-2 py-2 bg-blue-600" onClick={signOut}>Sign Out</button>
                        <br />
                        <a href="/week-9/shopping-list" className="hover:underline text-blue-500">Go to your Shopping List</a>
                    </div>
                ) : (
                    
                    <button className="px-2 py-2 bg-blue-600" onClick={signIn}>Sign In with GitHub</button>
                )}
            </div>
        </main>
    );
} 
 
