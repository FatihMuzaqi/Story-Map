import CONFIG from "../config";

const RegisterModel = {
  async registerUser(userData) {
    const response = await fetch(`${CONFIG.BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await response.json();
    return { ok: response.ok, result };
  }
};

export default RegisterModel;
