import { faker } from '@faker-js/faker';
import { dataSource, options } from './data-source';
import { UserEntity } from 'src/domain/entities/user.entity';
import { ProfileEntity } from 'src/domain/entities/user.profile.entity';
import { EducationHistoryEntity } from 'src/domain/entities/user.education.history.entity';
import { EmploymentHistoryEntity } from 'src/domain/entities/user.employment.history.entity';
import { PostEntity } from 'src/domain/entities/posts.entity';
import { ImageEntity } from 'src/domain/entities/images.entity';
import { PostInteractionEntity } from 'src/domain/entities/post.interaction.entity';
import { CompanyEntity } from 'src/domain/entities/company.entity';
import { JobEntity } from 'src/domain/entities/job.entity';
import { JobTagEntity } from 'src/domain/entities/job.tag.entity';
import { ImageTypeEnum } from 'src/domain/enums/img.';
import { RoleEnum } from 'src/domain/enums/user';
import { BcryptService } from '../services/bcrypt.service';

interface CompanySeedData {
    name: string;
    email: string;
    mobile_number: string;
    industry: string;
    description: string;
    location: string;
    logoUrl: string;
    jobs: {
        position: string;
        location: string;
        role: string;
        min_salary: number;
        max_salary: number;
        tags: string[];
    }[];
}

const companiesData: CompanySeedData[] = [
    {
        name: 'Google',
        email: 'careers@google.com',
        mobile_number: '+1-650-253-0000',
        industry: 'Technology & Internet Services',
        description: 'Google is a global technology leader dedicated to organizing the world’s information and making it universally accessible and useful.',
        location: 'Mountain View, CA',
        logoUrl: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=300&h=300&fit=crop',
        jobs: [
            {
                position: 'Senior Full Stack Engineer',
                location: 'Mountain View, CA (Hybrid)',
                role: 'Full-time',
                min_salary: 140000,
                max_salary: 195000,
                tags: ['TypeScript', 'React', 'Node.js', 'GraphQL', 'PostgreSQL'],
            },
            {
                position: 'Cloud DevOps & Infrastructure Architect',
                location: 'Sunnyvale, CA (Remote)',
                role: 'Full-time',
                min_salary: 160000,
                max_salary: 220000,
                tags: ['GCP', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD'],
            },
            {
                position: 'AI & Machine Learning Research Engineer',
                location: 'San Francisco, CA (On-site)',
                role: 'Full-time',
                min_salary: 175000,
                max_salary: 250000,
                tags: ['Python', 'PyTorch', 'TensorFlow', 'LLM', 'Deep Learning'],
            },
        ],
    },
    {
        name: 'Microsoft',
        email: 'recruiting@microsoft.com',
        mobile_number: '+1-425-882-8080',
        industry: 'Software & Cloud Solutions',
        description: 'Microsoft empowers every person and every organization on the planet to achieve more through world-class cloud platforms and developer tooling.',
        location: 'Redmond, WA',
        logoUrl: 'https://images.unsplash.com/photo-1642132652859-3ef5a1048fd1?w=300&h=300&fit=crop',
        jobs: [
            {
                position: 'Principal Backend Engineer',
                location: 'Redmond, WA (Hybrid)',
                role: 'Full-time',
                min_salary: 150000,
                max_salary: 210000,
                tags: ['C#', '.NET Core', 'Azure', 'Microservices', 'PostgreSQL'],
            },
            {
                position: 'Frontend UI/UX Developer',
                location: 'Seattle, WA (Remote)',
                role: 'Full-time',
                min_salary: 125000,
                max_salary: 175000,
                tags: ['TypeScript', 'React', 'Next.js', 'TailwindCSS', 'Redux'],
            },
            {
                position: 'Cloud Security & Compliance Engineer',
                location: 'Redmond, WA (On-site)',
                role: 'Full-time',
                min_salary: 140000,
                max_salary: 190000,
                tags: ['Cybersecurity', 'Azure Sentinel', 'IAM', 'SOC2', 'Penetration Testing'],
            },
        ],
    },
    {
        name: 'Amazon',
        email: 'jobs@amazon.com',
        mobile_number: '+1-206-266-1000',
        industry: 'E-Commerce & Cloud Infrastructure',
        description: 'Amazon is guided by customer obsession rather than competitor focus, passion for invention, commitment to operational excellence, and long-term thinking.',
        location: 'Seattle, WA',
        logoUrl: 'https://images.unsplash.com/photo-1523474255161-7074ec824f57?w=300&h=300&fit=crop',
        jobs: [
            {
                position: 'Senior Distributed Systems Engineer',
                location: 'Seattle, WA (On-site)',
                role: 'Full-time',
                min_salary: 155000,
                max_salary: 215000,
                tags: ['Java', 'Distributed Systems', 'AWS', 'DynamoDB', 'Apache Kafka'],
            },
            {
                position: 'Full Stack Software Development Engineer (SDE II)',
                location: 'Arlington, VA (Hybrid)',
                role: 'Full-time',
                min_salary: 135000,
                max_salary: 185000,
                tags: ['JavaScript', 'Node.js', 'React', 'AWS Lambda', 'DynamoDB'],
            },
            {
                position: 'Big Data & Analytics Engineer',
                location: 'Austin, TX (Remote)',
                role: 'Full-time',
                min_salary: 145000,
                max_salary: 200000,
                tags: ['Python', 'Apache Spark', 'AWS Redshift', 'Apache Airflow', 'SQL'],
            },
        ],
    },
    {
        name: 'Netflix',
        email: 'talent@netflix.com',
        mobile_number: '+1-408-540-3700',
        industry: 'Entertainment & Streaming Media',
        description: 'Netflix is the world\'s leading streaming entertainment service, delivering movies and TV series across hundreds of millions of screens globally.',
        location: 'Los Gatos, CA',
        logoUrl: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=300&h=300&fit=crop',
        jobs: [
            {
                position: 'Senior Web & Streaming Platform Engineer',
                location: 'Los Gatos, CA (Hybrid)',
                role: 'Full-time',
                min_salary: 170000,
                max_salary: 240000,
                tags: ['JavaScript', 'WebRTC', 'React', 'Video Streaming', 'Node.js'],
            },
            {
                position: 'Recommendation Algorithms & Machine Learning Engineer',
                location: 'Los Gatos, CA (Remote)',
                role: 'Full-time',
                min_salary: 180000,
                max_salary: 260000,
                tags: ['Python', 'PyTorch', 'Recommendation Systems', 'Big Data', 'Kafka'],
            },
            {
                position: 'Site Reliability & Chaos Engineer (SRE)',
                location: 'Los Gatos, CA (Remote)',
                role: 'Full-time',
                min_salary: 165000,
                max_salary: 225000,
                tags: ['Kubernetes', 'AWS', 'Golang', 'Prometheus', 'Chaos Engineering'],
            },
        ],
    },
    {
        name: 'Meta',
        email: 'careers@meta.com',
        mobile_number: '+1-650-543-4800',
        industry: 'Social Media & Virtual Reality',
        description: 'Meta builds technologies that help people connect, find communities, and grow businesses across Facebook, Instagram, WhatsApp, and Quest.',
        location: 'Menlo Park, CA',
        logoUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&h=300&fit=crop',
        jobs: [
            {
                position: 'React Core & Frontend Architect',
                location: 'Menlo Park, CA (Hybrid)',
                role: 'Full-time',
                min_salary: 165000,
                max_salary: 235000,
                tags: ['React', 'TypeScript', 'GraphQL', 'Performance Optimization', 'WebAssembly'],
            },
            {
                position: 'AR/VR Graphics & Systems Software Engineer',
                location: 'Burlingame, CA (On-site)',
                role: 'Full-time',
                min_salary: 170000,
                max_salary: 245000,
                tags: ['C++', 'OpenGL', 'Vulkan', 'Computer Vision', 'AR/VR'],
            },
            {
                position: 'High-Performance Backend Infrastructure Engineer',
                location: 'Menlo Park, CA (Remote)',
                role: 'Full-time',
                min_salary: 160000,
                max_salary: 220000,
                tags: ['Rust', 'C++', 'Distributed Systems', 'RocksDB', 'High Throughput'],
            },
        ],
    },
];

async function create() {
    dataSource.setOptions({
        ...options,
    });

    await dataSource.initialize();

    const bcryptService = new BcryptService();
    const hashedPassword = await bcryptService.hashPassword('123');

    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const users: UserEntity[] = [];
        const posts: PostEntity[] = [];

        // 1. Seed 15 individual users
        for (const _ of Array.from(Array(15).keys())) {
            const user = await queryRunner.manager.save(UserEntity, {
                email: faker.internet.email(),
                password: hashedPassword,
                name: faker.person.fullName(),
                role: RoleEnum.USER,
            });

            users.push(user);

            const profile = await queryRunner.manager.save(ProfileEntity, {
                user: user,
                bio: faker.person.bio(),
                mobile_number: faker.phone.number(),
            });

            await queryRunner.manager.save(ImageEntity, {
                profile,
                user_uuid: user.uuid,
                type: ImageTypeEnum.PROFILE,
                image_url: faker.image.personPortrait() || 'https://i.pravatar.cc/300',
            });
        }

        // 2. Seed education and employment history for users
        for (const user of users) {
            await queryRunner.manager.save(EducationHistoryEntity, {
                user: user,
                school_name: faker.company.name(),
                school_url: faker.internet.url(),
                start_date: faker.date.past(),
                end_date: faker.date.recent(),
                specialization: faker.person.jobArea(),
                description: faker.lorem.sentence(),
            });

            await queryRunner.manager.save(EmploymentHistoryEntity, {
                user: user,
                company_name: faker.company.name(),
                company_url: faker.internet.url(),
                start_date: faker.date.past(),
                end_date: faker.date.recent(),
                description: faker.lorem.sentence(),
            });
        }

        // 3. Seed posts for users
        for (const user of users) {
            const post = await queryRunner.manager.save(PostEntity, {
                user: user,
                content: faker.lorem.paragraph(),
            });

            posts.push(post);

            await queryRunner.manager.save(ImageEntity, {
                post: post,
                image_url: faker.image.urlPicsumPhotos(),
                user_uuid: user.uuid,
                type: ImageTypeEnum.POST,
            });
        }

        // 4. Seed post interactions (likes)
        for (const user of users) {
            for (const post of posts) {
                if (Math.random() > 0.6) {
                    await queryRunner.manager.save(PostInteractionEntity, {
                        user: user,
                        post: post,
                        type: 'LIKE',
                        content: '😁',
                    });
                }
            }
        }

        // 5. Seed 5 Companies with 3 Jobs each
        for (const companyData of companiesData) {
            // Create user account for the company
            const companyUser = await queryRunner.manager.save(UserEntity, {
                name: companyData.name,
                email: companyData.email,
                password: hashedPassword,
                role: RoleEnum.COMPANY,
            });

            // Create profile for the company user
            const companyProfile = await queryRunner.manager.save(ProfileEntity, {
                user: companyUser,
                bio: companyData.description,
                mobile_number: companyData.mobile_number,
            });

            // Create profile logo image
            await queryRunner.manager.save(ImageEntity, {
                profile: companyProfile,
                user_uuid: companyUser.uuid,
                type: ImageTypeEnum.PROFILE,
                image_url: companyData.logoUrl,
            });

            // Create Company Entity
            const company = await queryRunner.manager.save(CompanyEntity, {
                user_uuid: companyUser.uuid,
                name: companyData.name,
                email: companyData.email,
                mobile_number: companyData.mobile_number,
                industry: companyData.industry,
                description: companyData.description,
                location: companyData.location,
            });

            // Create 3 Jobs for this company
            for (const jobData of companyData.jobs) {
                const job = await queryRunner.manager.save(JobEntity, {
                    company_uuid: company.uuid,
                    position: jobData.position,
                    location: jobData.location,
                    role: jobData.role,
                    min_salary: jobData.min_salary,
                    max_salary: jobData.max_salary,
                });

                // Create Job Tags
                for (const tag of jobData.tags) {
                    await queryRunner.manager.save(JobTagEntity, {
                        job_uuid: job.uuid,
                        tag: tag,
                    });
                }
            }
        }

        await queryRunner.commitTransaction();
        console.info('✅ Seeded successfully');
    } catch (error) {
        await queryRunner.rollbackTransaction();
        console.error('❌ Something went wrong:', error);
    } finally {
        await queryRunner.release();
        if (dataSource.isInitialized) {
            await dataSource.destroy();
        }
    }
}

void create();