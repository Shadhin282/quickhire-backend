import { prisma } from '../prisma';

async function seedJobs() {
  const jobsData = [
    {
      title: 'Senior Frontend Developer',
      company: 'Acme Corp',
      location: 'Remote',
      category: 'Engineering',
      type: 'Full Time',
      description: 'Build and maintain user-facing features.',
      shortDescription: 'Develop user interfaces.',
      requirements: ['React', 'TypeScript', 'CSS'],
      benefits: ['Health insurance', '401k'],
      salary: '$90k - $120k',
      postedDate: '2026-03-01',
      logo: 'A',
      logoColor: 'bg-primary text-white',
      tags: ['Engineering'],
    },
    {
      title: 'Backend Engineer',
      company: 'Globex',
      location: 'New York, NY',
      category: 'Engineering',
      type: 'Full Time',
      description: 'Work on server-side logic and APIs.',
      shortDescription: 'Design backend services.',
      requirements: ['Node.js', 'PostgreSQL'],
      benefits: ['Remote-friendly', 'Stock options'],
      salary: '$100k - $140k',
      postedDate: '2026-02-28',
      logo: 'G',
      logoColor: 'bg-secondary text-white',
      tags: ['Engineering'],
    },
    // ... add 13 more entries
  ];

  // generate additional entries programmatically
  for (let i = 3; i <= 15; i++) {
    jobsData.push({
      title: `Job Title ${i}`,
      company: `Company ${i}`,
      location: i % 2 === 0 ? 'Remote' : 'San Francisco, CA',
      category: i % 3 === 0 ? 'Design' : 'Engineering',
      type: i % 4 === 0 ? 'Contract' : 'Full Time',
      description: `Description for job ${i}`,
      shortDescription: `Short desc ${i}`,
      requirements: ['Requirement A', 'Requirement B'],
      benefits: ['Benefit A', 'Benefit B'],
      salary: `$${60 + i}k - $${80 + i}k`,  
      postedDate: `2026-02-${10 + i}`,
      logo: `J${i}`,
      logoColor: 'bg-primary text-white',
      tags: [i % 3 === 0 ? 'Design' : 'Engineering'],
    });
  }

  try {
    for (const job of jobsData) {
      await prisma.job.create({ data: job });
    }
    console.log('Seeded 15 jobs successfully');
  } catch (error) {
    console.error('Error seeding jobs:', error);
  } finally {
    await prisma.$disconnect();
    process.exit(0);
  }
}

seedJobs();