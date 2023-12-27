import mongoose from "mongoose";

const Schema = mongoose.Schema;

const privateJOfferSchema = new Schema({
  TaskTable: [
    {
      TaskTitle: {
        type: String,
      },
      TaskDoneStatus: {
        type: Boolean,
        default: false,
      },
    },
  ],
  PaymentRequest: {
    PaymentRequestId: {
      type: Schema.Types.ObjectId,
    },
    PaymentAmount: {
      type: Number,
    },
    PaymentStatus: {
      type: String,
      enum: [
        "Tasks Not Done",
        "Awaiting Company Response",
        "Payment Sent",
        "Payment Declined",
        "Reported , Awaiting Admin Review",
      ],
      default: "Tasks Not Done",
    },
  },


  // عنوان الوظيفة
  Title: {
    type: String,
    required: true,
  },
<<<<<<< Updated upstream:node/src/WorkOffer/Customer/CustomerWorkOfferModal.ts

  // عنوان العمل
  WorkTitle: {
    type: String,
  },

  // تاريخ إنشاء الوظيفة
=======
  StartTime: {
    type: Date,
  },

 

>>>>>>> Stashed changes:node/src/WorkOffer/Customer/CustomerPrivateWorkOfferModal.ts
  CreationDate: {
    type: Date,
    default: new Date(),
  },

<<<<<<< Updated upstream:node/src/WorkOffer/Customer/CustomerWorkOfferModal.ts
  // وصف الوظيفة
=======
>>>>>>> Stashed changes:node/src/WorkOffer/Customer/CustomerPrivateWorkOfferModal.ts
  Description: {
    type: String,
    required: true,
  },

<<<<<<< Updated upstream:node/src/WorkOffer/Customer/CustomerWorkOfferModal.ts
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
=======
  Note: {
    type: String,
  },


  WorkingFreelancer: {
    FreelancerName: {
>>>>>>> Stashed changes:node/src/WorkOffer/Customer/CustomerPrivateWorkOfferModal.ts
      type: String,
    },
    FreelancerId: {
      type: Schema.Types.ObjectId,
      ref: "freelancer",
    },
  },
  PayRate: {
    PayPerHour: {
      type: Number,
      default: 0, 
    },
    PayPerTask: {
      type: Number,
      default: 0, 
    },
  },

<<<<<<< Updated upstream:node/src/WorkOffer/Customer/CustomerWorkOfferModal.ts
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
=======
 
  

  CustomerLocation: {
    type: String,
  },
  CustomerName: {
    type: String,
  },

  CustomerId: {
>>>>>>> Stashed changes:node/src/WorkOffer/Customer/CustomerPrivateWorkOfferModal.ts
    type: Schema.Types.ObjectId,
    ref: "Customer",
  },

<<<<<<< Updated upstream:node/src/WorkOffer/Customer/CustomerWorkOfferModal.ts
  // حالة التحقق من طريقة الدفع
=======
>>>>>>> Stashed changes:node/src/WorkOffer/Customer/CustomerPrivateWorkOfferModal.ts
  PaymentMethodVerificationStatus: {
    type: Boolean,
    default: false,
  },
<<<<<<< Updated upstream:node/src/WorkOffer/Customer/CustomerWorkOfferModal.ts
 
  // إجمالي العمل المقدم
  TotalWorkOffered: { 
    type: Number,
  },

  // إجمالي المال المدفوع
  TotalMoneyPaid: { 
    type: Number,
  },

  // حالة الوظيفة (بانتظار رد العميل، تم قبولها، تم رفضها، قيد التنفيذ، تم الانتهاء)
=======


  TotalWorkOfferd: {
    type: Number,
  },
  TotalMoneyPayed: {
    type: Number,
  },

>>>>>>> Stashed changes:node/src/WorkOffer/Customer/CustomerPrivateWorkOfferModal.ts
  status: {
    type: String,
    enum: [
      "awaiting freelancer response",
      "accepted",
      "declined",
      "in progress",
      "done",
    ],
    default: "awaiting freelancer response",
  },

<<<<<<< Updated upstream:node/src/WorkOffer/Customer/CustomerWorkOfferModal.ts
  // الموعد النهائي لإنجاز الوظيفة
=======
>>>>>>> Stashed changes:node/src/WorkOffer/Customer/CustomerPrivateWorkOfferModal.ts
  DeadLine: {
    type: Date,
    required: true,
  },
});

const PrivateCJobOffer = mongoose.model(
  "PrivateCJobOffer",
  privateJOfferSchema
);

export default PrivateCJobOffer;