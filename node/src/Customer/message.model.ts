import mongoose from "mongoose";
const Schema = mongoose.Schema;
const MessageSchema = new Schema({
  // مُعرِّف المحادثة التي ينتمي إليها الرسالة
  conversationId: {
    type: String,
    required: true,
  },
  // مُعرِّف المستخدم الذي أرسل الرسالة
  userId: {
    type: String,
    required: true,
  },
  // محتوى الرسالة
  desc: {
    type: String,
    required: true,
  },
}, {
  // تفعيل تسجيل الطوابع الزمنية تلقائيًا لكل رسالة
  timestamps: true,
});

export default mongoose.model("Message", MessageSchema);
