import { Request, Response } from 'express';
import { prisma } from '../prisma';

export const getJobs = async (req: Request, res: Response) => {
    try {
        const jobs = await prisma.job.findMany();
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getJobById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const job = await prisma.job.findUnique({
            where: { id },
        });

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.json(job);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const createJob = async (req: Request, res: Response) => {
    try {
        const jobData = req.body;

        // Convert arrays if needed based on req.body sending string or arrays.
        // In our case, Prisma expects an array of strings.

        const newJob = await prisma.job.create({
            data: {
                ...jobData,
            },
        });

        res.status(201).json(newJob);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteJob = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // First delete any applications linked to this job
        await prisma.application.deleteMany({
            where: { jobId: id },
        });

        const deletedJob = await prisma.job.delete({
            where: { id },
        });

        res.json({ message: 'Job deleted successfully', deletedJob });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
