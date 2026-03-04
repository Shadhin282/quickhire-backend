import { Request, Response } from 'express';
import { prisma } from '../prisma';

export const createApplication = async (req: Request, res: Response) => {
    try {
        const { jobId, name, email, phone, coverLetter, resumeLink } = req.body;

        const application = await prisma.application.create({
            data: {
                jobId,
                name,
                email,
                phone,
                coverLetter,
                resumeLink,
            },
        });

        res.status(201).json(application);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
