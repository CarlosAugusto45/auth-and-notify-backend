import Notification from '../schemas/Notification';

class NotificationController {
  async index(req, res) {
    const notifications = await Notification.find({
      user: req.userId,
    });

    return res.json(notifications);
  }

  async update(req, res) {
    const { id } = req.params;

    const notifcation = await Notification.findByIdAndUpdate(
      id,
      {
        read: true,
      },
      { new: true }
    );

    return res.json(notifcation);
  }
}

export default new NotificationController();
