export const setSession = (key, value, expirationInHours = 24) => {
  try {
    const now = new Date();
    // Menambahkan 24 jam ke waktu saat ini
    const expirationTime = now.getTime() + expirationInHours * 60 * 60 * 1000;
    const sessionData = {
      value,
      expirationTime, // Pastikan expirationTime disertakan
    };

    localStorage.setItem(key, JSON.stringify(sessionData));
    console.log("Session saved:", sessionData); // Debugging
  } catch (error) {
    console.error("Error saving session:", error);
  }
};

export const getSession = (key) => {
  try {
    const sessionData = localStorage.getItem(key);
    if (!sessionData) {
      console.log("No session data found.");
      return null;
    }

    const parsedData = JSON.parse(sessionData);
    console.log("Parsed session data:", parsedData); // Debugging

    const now = new Date();
    console.log("Session expiration:", parsedData.expirationTime); // Debugging
    console.log("Current time:", now.getTime());

    if (now.getTime() > parsedData.expirationTime) {
      console.log("Session expired for key:", key);
      localStorage.removeItem(key); // Clear expired session
      return null;
    }

    return parsedData.value;
  } catch (error) {
    console.error("Error parsing session data:", error);
    return null;
  }
};

export const removeSession = (key) => {
  localStorage.removeItem(key);
};
