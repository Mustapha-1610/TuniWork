
import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ConversationSchema = new Schema(
  {
    // معرف فريد للمحادثة
    id: {
      type: String,
      required: true,
      unique: true,
    },
    // معرف البائع المرتبط بالمحادثة
    sellerId: {
      type: String,
      required: true,
    },
    // معرف المشتري المرتبط بالمحادثة
    buyerId: {
      type: String,
      required: true,
    },
    // مؤشر القراءة بواسطة البائع
    readBySeller: {
      type: Boolean,
      required: true,
    },
    // مؤشر القراءة بواسطة المشتري
    readByBuyer: {
      type: Boolean,
      required: true,
    },
    // آخر رسالة تم تبادلها في المحادثة
    lastMessage: {
      type: String,
      required: false,
    },
  },
  {
    // إضافة طوابع زمنية تلقائية لتتبع تواريخ الإنشاء والتعديل
    timestamps: true,
  }
);

export default mongoose.model("Conversation", ConversationSchema);
