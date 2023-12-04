const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  
    notificationId: {
        type: String, // ou tout autre type approprié pour votre cas
        unique: true,
        required: true,
      },
  
  
    customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
