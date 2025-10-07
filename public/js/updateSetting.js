import { showAlert } from "./alerts";

// Type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === "password"
        ? "/api/v1/users/updateMyPassword"
        : "/api/v1/users/updateMe";

    // Prepare fetch options conditionally
    const options = {
      method: "PATCH",
    };

    if (type === "data") {
      // For FormData: Send directly (browser sets multipart/form-data with boundary)
      options.body = data; // data is FormData here
    } else {
      // For password: JSON stringify and set header
      options.headers = { 'Content-Type': 'application/json' };
      options.body = JSON.stringify(data);
    }

    const res = await fetch(url, options);

    const resdata = await res.json();
    if (!res.ok) {
      return showAlert("error", resdata.message); // 401, 400, etc.
    }

    if (resdata.status === "success") {
      showAlert("success", `${type.toUpperCase()} updated successfully!`);
    }
  } catch (err) {
    console.error('Update error:', err); // Enhanced error logging
    showAlert("error", "Something went wrong! Try again.");
  }
};