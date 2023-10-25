import admin from "./modal";
import express from "express";
import bcrypt from "bcryptjs";



//function to create new admin account

export const create = async (req: express.Request, res: express.Response) => {
    console.log();
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


// function to delete Admin Account

export const DeleteAdmin = async (req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params;
        const Admin = await admin.findById(id);

        if (!admin) {
            return res.status(404).json({ error: "Admin not found" });
        }

        await admin.deleteOne();

        return res.json({ success: "Admin deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
};




//function to get informations about admin account

export const get =async (req: express.Request, res: express.Response) =>{







}





