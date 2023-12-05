import mongoose from "mongoose";
const Schema = mongoose.Schema;
const MessageSchema = new Schema({
  // مُعرِّف المحادثة التي ينتمي إليها الرسالة
  messageId: {
    type: String,
    required: true,
  },
  // مُعرِّف المستخدم الذي أرسل الرسالة
  senderId: {
    type: String,
    required: true,
  },
  receiverId: {
    type: String,
    required: true,
  },
  // محتوى الرسالة
  content: {
    type: String,
    required: true,
  },
}, {
  // تفعيل تسجيل الطوابع الزمنية تلقائيًا لكل رسالة
  timestamps: true,
});

export default mongoose.model("Message", MessageSchema);
