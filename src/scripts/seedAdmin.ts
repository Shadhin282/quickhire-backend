import { prisma } from '../prisma';
import bcrypt from 'bcryptjs';
import { UserRole } from '@prisma/client';

const seedAdmin = async () => {
    try {
        const adminData = {
            name: 'Admin User',
            email: 'admin@quickhire.com',
            password: 'admin123',
            role: UserRole.ADMIN,
        };

        // Check if admin already exists
        const existingUser = await prisma.user.findUnique({
            where: {
                email: adminData.email,
            },
        });

        if (existingUser) {
            console.log('Admin user already exists.');
            return;
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(adminData.password, 10);

        // Create admin user in database
        const newAdmin = await prisma.user.create({
            data: {
                name: adminData.name,
                email: adminData.email,
                password: hashedPassword,
                role: adminData.role,
            },
        });

        console.log('Admin user created successfully:', newAdmin);
    } catch (error) {
        console.error('Error seeding admin:', error);
    } finally {
        await prisma.$disconnect();
    }
}

seedAdmin();