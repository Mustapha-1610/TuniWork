
import mongoose from "mongoose";

const Schema = mongoose.Schema;
const PrivateJobOffresCustomerSchemaDef = new Schema({

  // عنوان الوظيفة
  Title: {
    type: String,
    required: true,
  },

  // عنوان العمل
  WorkTitle: {
    type: String,
  },

  // تاريخ إنشاء الوظيفة
  CreationDate: {
    type: Date,
    default: new Date(),
  },

  // وصف الوظيفة
  Description: {
    type: String,
    required: true,
  },

  // ملاحظة إضافية
  Note: {
    type: String,
  },
  
  // حجم المشروع (كبير، متوسط، صغير)
  SizeP: {
    type: String,
    enum: ["Large", "Medium", "Small"],
    default: "Medium",
    required: true
  },

  // طريقة الدفع المتوقعة للوظيفة
  PaymentMethod: {
    PayPerTask: {
      ExperienceLevel: {
        type: "String",
      },
      FixedPrice: {
        type: "String",
      },
    },
    PayPerHours: {
      HoursPerWeek: {
        type: String,
        default:"0"
      },
      Duration: {
        type: String,
      },
      PayPerHour: {
        type: String,
        default:"0"
      },
    },
  },

  // بيانات العميل الذي قدم العرض
  WorkingCustomer: {  
    CustomerName: {  
      type: String,
    },
    CustomerId: {  
      type: Schema.Types.ObjectId,
      ref: "Customer",  
    },
  },

  // اسم العميل
  CustomerName: {  
    type: String,
    required: true,
  },

  // موقع العميل
  Location: {
    type: String,
  },

  // معرف العميل
  CustomerId: { 
    type: Schema.Types.ObjectId,
    ref: "Customer",  
  },

  // حالة التحقق من طريقة الدفع
  PaymentMethodVerificationStatus: {
    type: Boolean,
    default: false,
  },
 
  // إجمالي العمل المقدم
  TotalWorkOffered: { 
    type: Number,
  },

  // إجمالي المال المدفوع
  TotalMoneyPaid: { 
    type: Number,
  },

  // حالة الوظيفة (بانتظار رد العميل، تم قبولها، تم رفضها، قيد التنفيذ، تم الانتهاء)
  status: {
    type: String,
    enum: [
      "awaiting customer response",  
      "accepted",
      "declined",
      "in progress",
      "done",
    ],
    default: "awaiting customer response",  
  },

  // الموعد النهائي لإنجاز الوظيفة
  DeadLine: {
    type: Date,
    required: true,
  },
});

const PrivateJobOffresCustomerModel = mongoose.model(
  "PrivateJobOffresCustomer",
  PrivateJobOffresCustomerSchemaDef
);


export default PrivateJobOffresCustomerModel;
