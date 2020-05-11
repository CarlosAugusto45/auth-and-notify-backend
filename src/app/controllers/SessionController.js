import jwt from 'jsonwebtoken';
import User from '../models/User';
import Notification from '../schemas/Notification';

import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(400).json({ error: 'Password does not match' });
    }

    if (user.first_auth === null) {
      await user.update({
        first_auth: new Date(),
      });

      await Notification.create({
        content: `Seja Bem-Vindo a Aplicação ${user.name}`,
        user: user.id,
      });
    }

    const { id, name, first_auth } = user;

    return res.json({
      user: {
        id,
        name,
        email,
        first_auth,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
