import axios from "axios";

export async function loginUser(email, password) {

    try{
        const data = {
            email, password
        }
        const response = await axios.post(`http://localhost:3001/api/v1/user/login`, data);
        return response.data;
    }catch(error) {
        return false
    }
    
}


export async function profileUser() {
    const token = JSON.parse(localStorage.getItem('user')).token
    try{
        const data = {}

        const response = await axios.post(`http://localhost:3001/api/v1/user/profile`, data, {
            headers: {'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            } 
        });
        return response.data;
    }catch(error) {
        return false
    }
    
}
    



export async function updateUser(firstName, lastName) {
    const token = JSON.parse(localStorage.getItem('user')).token
    try{
        const data = {
            firstName, lastName,
        }

        const response = await axios.put(`http://localhost:3001/api/v1/user/profile`, data, {
            headers: {'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            } 
        });
        return response.data;
    }catch(error) {
        return false
    }
    
}