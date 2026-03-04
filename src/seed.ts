import { PrismaClient } from '@prisma/client';
import { jobs } from '../../src/data/jobs';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding jobs...');
    for (const job of jobs) {
        // Avoid creating jobs with duplicate IDs or missing fields if needed, 
        // but jobs don't have constraints here besides id which is cuid now.
        await prisma.job.create({
            data: {
                title: job.title,
                company: job.company,
                location: job.location,
                category: job.category,
                type: job.type,
                description: job.description,
                shortDescription: job.shortDescription,
                requirements: job.requirements,
                benefits: job.benefits,
                salary: job.salary,
                postedDate: job.postedDate,
                logo: job.logo,
                logoColor: job.logoColor,
                tags: job.tags,
            }
        });
    }
    console.log('Jobs seeded successfully.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
