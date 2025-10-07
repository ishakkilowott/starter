import { showAlert } from "./alerts";

export const login = async (email, password) => {
  try {
    const res = await fetch("http://localhost:3000/api/v1/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      return showAlert('error',data.message);  // 401, 400, etc.
    }

    console.log(data);

    if (data.status === 'success') {
      showAlert('success','Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    }

  } catch (err) {
    console.error(err);
    showAlert('error','Something went wrong! Try again.');
  }
};

export const logout = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/v1/users/logout", {
      method: "GET",
    });

    if (res.ok) {
      location.reload(true); 
    }
  } catch (err) {
    console.error(err);
    showAlert("error", "Logout failed. Try again!");
  }
};