const URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1`;
console.log(URL);
export const register = (data) => {
  return fetch(`${URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
};

export const login = (data) => {
  return fetch(`${URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
};

export const logout = async () => {
  try {
    const res = await fetch(`${URL}/users/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (res.status === 200) {
      localStorage.removeItem("accessToken");
      alert("Logged out successfully");
    } else {
      alert("Error logging out");
    }
  } catch (error) {
    console.error("Logout failed:", error);
    alert("An error occurred while logging out.");
  }
};

export const getJobs = ({
  limit,
  offset,
  salary,
  name,
  type,
  location,
  work,
  skills,
}) => {
  console.log(name);
  return fetch(
    `${URL}/jobs?limit=${limit}&offset=${offset}&name=${name}&skills=${skills}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
};

export const createJob = (data) => {
  return fetch(`${URL}/jobs/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
};
export const editjob = (id, data) => {
  return fetch(`${URL}/jobs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
};
export const getJobById = (id) => {
  return fetch(`${URL}/jobs/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },

    credentials: "include",
  });
};
export const deleteJob = (id) => {
  return fetch(`${URL}/jobs/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },

    credentials: "include",
  });
};
