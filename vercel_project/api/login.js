import pool from '../config.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success:false, message: 'Method not allowed' });

  try {
    const { username, password } = req.body || {};
    if (!username || !password) return res.status(400).json({ success:false, message: 'Заполните все поля' });

    const [rows] = await pool.execute('SELECT id FROM users WHERE username = ? AND password = ?', [username, password]);
    if (rows.length > 0) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(401).json({ success: false, message: 'Неверный логин или пароль' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success:false, message: 'Ошибка сервера' });
  }
}
