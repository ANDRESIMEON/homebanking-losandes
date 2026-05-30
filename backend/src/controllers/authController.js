const authService = require('../services/authService');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email y password son obligatorios' });
    }
    const resultado = await authService.login(email, password);
    res.json({ success: true, data: resultado });
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    await authService.logout();
    res.json({ success: true, message: 'Sesión cerrada correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Token requerido' });
    }
    const token = authHeader.split(' ')[1];
    const usuario = await authService.getUsuarioActual(token);
    res.json({ success: true, data: usuario });
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};
