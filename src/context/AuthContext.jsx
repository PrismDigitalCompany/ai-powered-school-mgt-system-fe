
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'sms.session';


// Demo for testing
const DEMO_USERS = {
  'admin@sms.edu': { password: 'admin123', role: 'admin', name: 'Adaeze Nwosu', title: 'Registrar' },
  'teacher@sms.edu': { password: 'teacher123', role: 'teacher', name: 'Mr. Bayo Adeyemi', title: 'Lecturer, Computer Science' },
  'student@sms.edu': { password: 'student123', role: 'student', name: 'Chidinma Okafor', title: '300L, Computer Science' },
  'parent@sms.edu': { password: 'parent123', role: 'parent', name: 'Mr. Emeka Okafor', title: 'Parent/Guardian' },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { /* ignore malformed session */ }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const record = DEMO_USERS[email.trim().toLowerCase()];
    if (!record || record.password !== password) {
      throw new Error('Incorrect email or password.');
    }
    const session = { email, role: record.role, name: record.name, title: record.title };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    setUser(session);
    return session;
  };

  const loginAsRole = (role) => {
    const entry = Object.entries(DEMO_USERS).find(([, r]) => r.role === role);
    if (!entry) return;
    const [email, record] = entry;
    const session = { email, role: record.role, name: record.name, title: record.title };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    setUser(session);
    return session;
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, loginAsRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}









// uncommented the code below is an alternative implementation of the AuthContext, which has been commented out. The current implementation above is more streamlined and uses as a demo user directory for authentication. The commented-out code includes additional features like updating user data and checking authentication status, but it is not currently in use.
// import{ useEffect, useState, createContext, useContext} from 'react'

// const AuthContext = createContext()
  
// export const useAuth=()=>{
// const context = useContext(AuthContext);

// if(!context){
//   throw new Error('useAuth must be used within an AuthProvider');
// }
// return context;
// }

// export const AuthProvider = ({children})=>{
// const [user, setUser] = useState(null);
// const [loading, setLoading] = useState(true);
// const [isAuthenticated, setIsAuthenticated] = useState(false);


// useEffect(()=>{
// checkAuthStatus();
// },[]);


// const checkAuthStatus = async()=>{
//   try{
//     const token = localStorage.getItem('accessToken');
//     const userString = localStorage.getItem('user');
//     if(token && userString){
//       const userData = JSON.parse(userString);
//       setUser(userData);
//       setIsAuthenticated(true);
//     }

//   } catch (error) {
//     console.error('Error checking authentication status:', error);
//     logout();
//   } finally {
//     setLoading(false);
//   }

//   const login = (userData, token)=>{
//     localStorage.setItem('accessToken', token);
//     localStorage.setItem('user', userData);
//     setUser(userData);
//     setIsAuthenticated(true);
//   }

//   const logout =()=>{
//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('user');
//     setUser(null);
//     setIsAuthenticated(false);
//     window.location.href = '/';
//   }

//   const updateUser =(updateNewUserData)=>{
//  const newUserData ={...user, ...updateNewUserData};
//  localStorage.setItem('user');
//  setUser(newUserData);
//   }

//   const value ={user, loading, isAuthenticated, login, logout, updateUser, checkAuthStatus};
// }
// return(<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
// )
// }