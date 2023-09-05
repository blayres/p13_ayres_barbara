import axios from "axios";

export async function loginUser(email, password) {
  try {
    const data = {
      email,
      password,
    };
    const response = await axios.post(
      `http://localhost:3001/api/v1/user/login`,
      data
    );

    return response.data;
  } catch (error) {
    return false;
  }
}

export async function profileUser() {
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);

  if (user && user.token) {
    try {
      const data = {};
      const response = await axios.post(
        `http://localhost:3001/api/v1/user/profile`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return false;
    }
  } else {
    return false;
  }
}

export async function updateUser(firstName, lastName) {
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);

  if (user && user.token) {
    try {
      const data = {
        firstName,
        lastName,
      };

      const response = await axios.put(
        `http://localhost:3001/api/v1/user/profile`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return false;
    }
  } else {
    return false;
  }
}
