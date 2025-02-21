
//admin controller


import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
import { sql } from "../../neon/connection.js";


dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET; 

export const verifyAdmin = async (req, res) => {
    const { email, password } = req.body; // ✅ Plain text password comes from request

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {

        const adminUser = await sql`
            SELECT * FROM admin WHERE email = ${email};
        `;

        if (adminUser.length === 0) {
            return res.status(401).json({ message: "Admin not found" });
        }

        const admin = adminUser[0]; 

        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { adminId: admin.admin_id, email: admin.email, role: admin.role },
            JWT_SECRET,
            { expiresIn: "2h" }
        );

        // ✅ Send token in response
        res.status(200).json({ message: "Admin verified successfully", token });

    } catch (error) {
        console.error("Error verifying admin:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

export const addAdmin = async (req, res) => {
    const { email, name, role } = req.body; 

    if (!email || !name || !role) {
        return res.status(400).json({ message: "Email, name, and role are required" });
    }

    try {

        const existingAdmin = await sql`
            SELECT * FROM admin WHERE email = ${email};
        `;

        if (existingAdmin.length > 0) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        const plainPassword = crypto.randomBytes(4).toString("hex"); 

        const hashedPassword = await bcrypt.hash(plainPassword, 10);

      
        const newAdmin = await sql`
            INSERT INTO admin (name, email, password, role) 
            VALUES (${name}, ${email}, ${hashedPassword}, ${role})
            RETURNING *;
        `;

        res.status(201).json({
            message: "Admin created successfully",
            admin: {
                admin_id: newAdmin[0].admin_id,
                name: newAdmin[0].name,
                email: newAdmin[0].email,
                role: newAdmin[0].role,
                password: plainPassword, // Return the plain text password for admin to note down
            },
        });

    } catch (error) {
        console.error("Error creating admin:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
