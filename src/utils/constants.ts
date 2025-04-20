export const APP_LOADER_DURATION = 3 * 1000 //3 Seconds
export const APP_LOADER_TIMEOUT = 15 * 60 * 1000; // 15 minutes in milliseconds

export enum LoaderSizes {
    SMALL = 'var(--loader-size-small)',
    MEDIUM = 'var(--loader-size-medium)',
    LARGE = 'var(--loader-size-large)'
}

export enum ButtonVariants {
    TypeWriter = 'TypeWriter',
    FlatFilled = 'FlatFilled',
    Flat = 'Flat',
}

export const companyInfo = {
    name: "Saraan Techworks",
    slogan: "Innovative Solutions for Your Tech Challenges",
}


export enum Categories {
    ProgrammingLanguage = 'Programming Language',
    FrontendFramework = 'Frontend Framework',
    BackendFramework = 'Backend Framework',
    Database = 'Database',
    MobileFramework = 'Mobile Framework',
    DevOpsTool = 'DevOps Tool',
    CloudService = 'Cloud Service',
    CMS = 'Content Management System',
    Library = 'Library',
    TestingFramework = 'Testing Framework',
    ThirdPartyAPI = 'Third Party API',
    PaymentProcessor = 'Payment Processor',
    Automation = 'Automation Tool',
    SecurityTool = 'Security Tool',
    Analytics = 'Analytics Tool',
    AITool = 'AI Tool',
}

export const TECHNOLOGIES = [
    {
        rating: 10,
        heading: 'Typescript',
        subHeading: Categories.ProgrammingLanguage,
        imageUrl: '/src/assets/images/typescript.png',
    },
    {
        rating: 9,
        heading: 'JavaScript',
        subHeading: Categories.ProgrammingLanguage,
        imageUrl: '/src/assets/images/javascript.png',
    },
    {
        rating: 8,
        heading: 'Vue.js',
        subHeading: Categories.FrontendFramework,
        imageUrl: '/src/assets/images/vuejs.png',
    },
    {
        rating: 7,
        heading: 'React',
        subHeading: Categories.FrontendFramework,
        imageUrl: '/src/assets/images/react.png',
    },
    {
        rating: 9,
        heading: 'Python',
        subHeading: Categories.ProgrammingLanguage,
        imageUrl: '/src/assets/images/python.png',
    },
    {
        rating: 8,
        heading: 'Node.js',
        subHeading: Categories.BackendFramework,
        imageUrl: '/src/assets/images/node.png',
    },
    {
        rating: 7,
        heading: 'Docker',
        subHeading: Categories.DevOpsTool,
        imageUrl: '/src/assets/images/docker.png',
    },
    {
        rating: 6,
        heading: 'AWS',
        subHeading: Categories.CloudService,
        imageUrl: '/src/assets/images/aws.png',
    },
    {
        rating: 7,
        heading: 'WordPress',
        subHeading: Categories.CMS,
        imageUrl: '/src/assets/images/wordPress.png',
    },
    {
        rating: 8,
        heading: 'Jest',
        subHeading: Categories.TestingFramework,
        imageUrl: '/src/assets/images/jest.png',
    },
    {
        rating: 8,
        heading: 'MongoDB',
        subHeading: Categories.Database,
        imageUrl: '/src/assets/images/mongo.png',
    },
    {
        rating: 7,
        heading: 'Express.js',
        subHeading: Categories.BackendFramework,
        imageUrl: '/src/assets/images/Express.png',
    },
    {
        rating: 6,
        heading: 'GraphQL',
        subHeading: Categories.Library,
        imageUrl: '/src/assets/images/GraphQL.png',
    },
    {
        rating: 7,
        heading: 'Redux',
        subHeading: Categories.Library,
        imageUrl: '/src/assets/images/Redux.png',
    },
    {
        rating: 8,
        heading: 'Google Maps API',
        subHeading: Categories.ThirdPartyAPI,
        imageUrl: '/src/assets/images/Google.png',
    },
    {
        rating: 9,
        heading: 'Stripe',
        subHeading: Categories.PaymentProcessor,
        imageUrl: '/src/assets/images/stripe.png',
    },
    {
        rating: 7,
        heading: 'Firebase',
        subHeading: Categories.ThirdPartyAPI,
        imageUrl: '/src/assets/images/Firebase.png',
    },
    {
        rating: 6,
        heading: 'Selenium',
        subHeading: Categories.Automation,
        imageUrl: '/src/assets/images/Selenium.png',
    },
    {
        rating: 7,
        heading: 'GitHub Actions',
        subHeading: Categories.Automation,
        imageUrl: '/src/assets/images/GitHub Actions.png',
    },
    {
        rating: 8,
        heading: 'Auth0',
        subHeading: Categories.SecurityTool,
        imageUrl: '/src/assets/images/auth0.png',
    },
    {
        rating: 7,
        heading: 'Google Analytics',
        subHeading: Categories.Analytics,
        imageUrl: '/src/assets/images/analaytics.png',
    },
    {
        rating: 8,
        heading: 'Next.js',
        subHeading: Categories.FrontendFramework,
        imageUrl: '/src/assets/images/Next.js.png',
    },
    {
        rating: 7,
        heading: 'Strapi',
        subHeading: Categories.CMS,
        imageUrl: '/src/assets/images/strapi.png',
    },
    {
        rating: 7,
        heading: 'Payload CMS',
        subHeading: Categories.CMS,
        imageUrl: '/src/assets/images/payload.png',
    },
    {
        rating: 6,
        heading: 'Netlify CMS',
        subHeading: Categories.CMS,
        imageUrl: '/src/assets/images/netlify-cms.png',
    },
    {
        rating: 9,
        heading: 'OpenAI',
        subHeading: Categories.AITool,
        imageUrl: '/src/assets/images/openai.png',
    },
    {
        rating: 8,
        heading: 'Eleven Labs',
        subHeading: Categories.AITool,
        imageUrl: '/src/assets/images/elevenlabs.png',
    },
    {
        rating: 8,
        heading: 'NestJS',
        subHeading: Categories.BackendFramework,
        imageUrl: '/src/assets/images/nestjs.png',
    },
    {
        rating: 9,
        heading: 'PostgreSQL',
        subHeading: Categories.Database,
        imageUrl: '/src/assets/images/postgresql.png',
    },
    {
        rating: 8,
        heading: 'Supabase',
        subHeading: Categories.BackendFramework,
        imageUrl: '/src/assets/images/supabase.png',
    },
    {
        rating: 7,
        heading: 'FastAPI',
        subHeading: Categories.BackendFramework,
        imageUrl: '/src/assets/images/fastapi.png',
    },
    {
        rating: 9,
        heading: 'Tailwind CSS',
        subHeading: Categories.Library,
        imageUrl: '/src/assets/images/tailwind.png',
    },
];