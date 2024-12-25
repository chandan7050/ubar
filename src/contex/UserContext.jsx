import { createContext, useState } from "react";
import PropTypes from 'prop-types'; // Import PropTypes

// ✅ Step 1: Create context (No need to add default user here)
export const UserDataContext = createContext('');

// ✅ Step 2: Define the Context Provider
const UserContext = ({ children }) => {
    const [user, setUser] = useState({
        email: '',
        fullName: {
            firstName: '',
            lastName: ''
        }
    });

    return (
        <UserDataContext.Provider value={{ user, setUser }}>
            {children}
        </UserDataContext.Provider>
    );
}

// ✅ Step 3: Add PropTypes validation
UserContext.propTypes = {
    children: PropTypes.node.isRequired
};

// ✅ Step 4: Export the context provider
export default UserContext;
