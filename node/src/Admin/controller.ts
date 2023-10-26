import admin from "./modal";
import express, {request} from "express";
import bcrypt from "bcryptjs";
import freelancer from "../Freelancer/modal";



//function to create new admin account

export const create = async (req: express.Request, res: express.Response) => {
    const { Name, Surname, Username, AdminCode, PhoneNumber, Email, Password } = req.body;
    try {
        if (!Name || !Surname || !Username || !PhoneNumber || !Email || !Password || !AdminCode) {
            return res.json({ error: "Missing Input(s)" });
        }
        // Search for an admin that has the same email or phone number
        let existingAdmin = await admin.findOne({
            $or: [{ Email }, { PhoneNumber }],
        });

        if (existingAdmin) {
            return res.json({ error: "Account Exists Already" });
        }
        // check if the admincode is correct
        if(AdminCode != "TuniworkAdmin"){
            return res.json({ error: "wrong admin code" });
        }

        // Hash the password securely
        const securePassword = bcrypt.hashSync(Password);
        // Generate a secret code for verification
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let VerificationCode = "";
        for (let i = 0; i < 25; i++) {
            VerificationCode +=
                characters[Math.floor(Math.random() * characters.length)];
        }
        const newAdmin = await admin.create({
            Name,
            Surname,
            Username,
            AdminCode,
            PhoneNumber,
            Password: securePassword,
            Email,
            VerificationCode: VerificationCode,
        });

        return res.json({ success: "Account Created !" });
    } catch (err) {
        console.log(err);
        return res.json({ error: "Server Error" });
    }
};





//function to get informations about admin account

export const getAdminProfile = async (req: express.Request, res: express.Response) => {
    try {

        let id = req.body.id;

        const adminProfile = await admin.find({_id : id});

        if (!adminProfile) {

            return res.status(404).json({ error: 'No admin profiles found' });
        }

        return res.json(adminProfile);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Server Error' });
    }
};

// function to update admin account

export const updateAdmin = async (req:express.Request,res:express.Response)=>{


       let id =req.params.id;
       const {Name , Surname , Username , PhoneNumber ,Email ,Password ,ProfilePicture } =req.body;

       try{
           if (!Name || !Surname || !Username || !PhoneNumber || !Email || !Password || !ProfilePicture){
               return res.json({error: " you missed one or some inputs"})

           }
           let existingAdmin = await admin.findOne({

               $or: [{ Email }, { PhoneNumber }],
           });

           if(existingAdmin){

               return res.json({error: " there is an admin account with this Email or phoneNumber"})
           }
           const securePassword = bcrypt.hashSync(Password);
           const updatedAdmin = await admin.findByIdAndUpdate(id, {
               Name,
               Surname,
               Username,
               PhoneNumber,
               Email,
               Password : securePassword,
               ProfilePicture,
           });

           if (!updatedAdmin) {
               return res.json({ error: "Admin account not found" });
           }

           return res.json({ success: "Admin account updated successfully!" });


       }catch (error){
           console.log(error);
           return res.status(500).json({error: "Server error"});

       }

}


//function to disable admin account

export const deleteAdminAccount = async (req : express.Request , res :express.Response)=>{

    let id = req.params.id;

    try{

        let deletedAdmin = await admin.findOneAndDelete({_id:id}) ;

        if (!deletedAdmin){

            return res.status(404).json({error : "Admin not found"});
        }

        return res.json({success : "Admin deleted successfully "});

    }
    catch (error){
        console.log(error);
        return res.status(500).json({error: "Server error"});

    }

}
