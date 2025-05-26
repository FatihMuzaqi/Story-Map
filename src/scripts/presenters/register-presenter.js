import RegisterModel from "../models/register.models";

const RegisterPresenter = {
  async handleRegister({ name, email, password }) {
    try {
      const { ok, result } = await RegisterModel.registerUser({ name, email, password });
      return { success: ok, message: result.message };
    } catch (error) {
      return { success: false, message: "Terjadi kesalahan saat registrasi." };
    }
  }
};

export default RegisterPresenter;
