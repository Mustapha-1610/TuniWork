import express from "express";
import customer from "../../Customer/modal";
//import customerPublicWorkOffer from "./CustomerPublicWorkOfferModal";
import PrivateJobOffer from "./CustomerPrivateWorkOfferModal";
import Freelancer from "../../Freelancer/modal";




/*export const createPublicJob = async (req: express.Request, res: express.Response) => {
  try {
    // استخراج البيانات من جسم الطلب
    const {
      Title,            // عنوان العرض الوظيفي
      WorkTitle,        // عنوان العمل
      Description,      // وصف العرض الوظيفي
      Note,             // ملاحظات إضافية
      PayPerTask,       // دفع لكل مهمة
      PayPerHour,       // دفع لكل ساعة
      WorkSpeciality,   // تخصص العمل
      CustomerId,       // معرف العميل
      CustomerName      // اسم العميل
    } = req.body;

    // البحث عن العميل باستخدام معرف العميل
    const offeringCustomer = await customer.findById(CustomerId);

    // التحقق من وجود العميل
    if (!offeringCustomer) {
      // إذا لم يتم العثور على العميل، قم بإرجاع رسالة خطأ 404
      return res.status(404).json({ error: "Customer not found" });
    }

    // استخراج بعض خصائص العميل لاستخدامها في العرض الوظيفي
    const PaymentMethodVerificationStatus = offeringCustomer.get("PaymentMethodVerificationStatus") as boolean;
    const Username = offeringCustomer.get("Username") as string;
    const location = offeringCustomer.get("location") as string;
    const WorkOfferd = offeringCustomer.get("WorkOfferd") as number;
    const MoneySpent = offeringCustomer.get("MoneySpent") as number;

    // إنشاء عرض وظيفي عام باستخدام بيانات الطلب
    let workOffer = await customerPublicWorkOffer.create({
      Title,
      WorkTitle,
      Description,
      Note,
      PaymentMethod: {
        PayPerTask,
        PayPerHour,
      },
      WorkSpeciality,
      PaymentMethodVerificationStatus,
      CustomerName,
      CustomerId,
      location,
      Username,
      WorkOfferd,
      MoneySpent,
    });

  
    return res.json({ success: "Work offer created" });
  } catch (err) {
  
    console.error(err);
    return res.status(500).json({ error: "Server Error" });
  }
};*/



export const createPrivateJob = async (req: express.Request, res: express.Response) => {
  try {
    const {
      Title,  // عنوان العرض الوظيفي
      Description,  // وصف العرض الوظيفي
      Note,  // ملاحظات إضافية
      PayPerTask,  // دفع لكل مهمة
      PayPerHour,  // دفع لكل ساعة
      CustomerId,  // معرف العميل
      PaymentMethodVerificationStatus,  // حالة التحقق من وسيلة الدفع
      CustomerName,  // اسم العميل
      CustomerLocation,  // موقع العميل
      TotalWorkOfferd,  // إجمالي العمل المعروض
      TotalMoneyPayed,  // إجمالي المال المدفوع
      FreelancerId,  // معرف العامل الحر
      DeadLine,  // الموعد النهائي لتقديم العرض
    } = req.body;

    // البحث عن العميل باستخدام معرف العميل
    const offeringCustomer = await customer.findById(CustomerId);

    // التحقق من وجود العميل
    if (!offeringCustomer) {
      return res.json({ error: "Customer not found" });
    }

    // البحث عن العامل الحر باستخدام معرف العامل الحر
    const freelancer = await Freelancer.findById(FreelancerId);
    const freelancerName = freelancer ? freelancer.Name : null;

    // إنشاء العرض الوظيفي الخاص
    let workOffer = await PrivateJobOffer.create({
      Title,
      Description,
      Note,
      PaymentMethod: {
        PayPerTask,
        PayPerHour,
      },
      CustomerId,
      PaymentMethodVerificationStatus,
      CustomerName,
      CustomerLocation,
      TotalMoneyPayed,
      TotalWorkOfferd,
      DeadLine,

      WorkingFreelancer: {
        FreelancerName: freelancerName,
        FreelancerId,
      },
    });

    // تحديث قائمة الأعمال الخاصة المقدمة من قبل العامل الحر
    await Freelancer.findByIdAndUpdate(
      FreelancerId,
      {
        $push: {
          ProposedPrivateWorks: {
            PrivateJobOfferId: workOffer._id,
          },
        },
      },
      { new: true }
    );

   
    return res.json({ success: "private work offer created" });
  } catch (err) {
  
    console.log(err);
    return res.json({ error: "Server Error!" });
  }
};


export const editPrivateJob = async (req: express.Request, res: express.Response) => {
  try {
      const {
          Title,
          Description,
          Note,
          PayPerTask,
          PayPerHour,
          CustomerName,
          CustomerLocation,
          TotalWorkOfferd,
          TotalMoneyPayed,
      } = req.body;

     
      const updatedJobOffer = await PrivateJobOffer.findByIdAndUpdate(
          req.params.PrivateJobOfferId,
          {
              Title,
              Description,
              Note,
              'PaymentMethod.PayPerTask': PayPerTask,
              'PaymentMethod.PayPerHour': PayPerHour,
              CustomerName,
              CustomerLocation,
              TotalWorkOfferd,
              TotalMoneyPayed,
          },
          { new: true } 
      );

      if (!updatedJobOffer) {
          return res.json({ error: "Job offer not found" });
      }

      return res.json({ success: "Private job offer updated", updatedJobOffer });
  } catch (err) {
      console.log(err);
      return res.json({ error: "Server Error!" });
  }
};


export const getAllPrivateJobOffers = async (
  req: express.Request,
  res: express.Response
) => {
  let AllPJobs = await PrivateJobOffer.find();
  return res.json({ AllPJobs });
};

