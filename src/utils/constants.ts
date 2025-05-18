export const APP_LOADER_DURATION = 3 * 1000 //3 Seconds
export const APP_LOADER_TIMEOUT = 15 * 60 * 1000; // 15 minutes in milliseconds
import typescriptImg from '@/assets/images/typescript.png';
import javascriptImg from '@/assets/images/javascript.png';
import vuejsImg from '@/assets/images/vuejs.png';
import reactImg from '@/assets/images/react.png';
import pythonImg from '@/assets/images/python.png';
import nodeImg from '@/assets/images/node.png';
import dockerImg from '@/assets/images/docker.png';
import awsImg from '@/assets/images/aws.png';
import wordPressImg from '@/assets/images/wordPress.png';
import jestImg from '@/assets/images/jest.png';
import mongoImg from '@/assets/images/mongo.png';
import expressImg from '@/assets/images/Express.png';
import graphqlImg from '@/assets/images/GraphQL.png';
import reduxImg from '@/assets/images/Redux.png';
import googleMapsImg from '@/assets/images/Google.png';
import stripeImg from '@/assets/images/stripe.png';
import firebaseImg from '@/assets/images/Firebase.png';
import seleniumImg from '@/assets/images/Selenium.png';
import githubActionsImg from '@/assets/images/GitHub Actions.png';
import auth0Img from '@/assets/images/auth0.png';
import analyticsImg from '@/assets/images/analaytics.png';
import nextImg from '@/assets/images/Next.js.png';
import strapiImg from '@/assets/images/strapi.png';
import payloadImg from '@/assets/images/payload.png';
import netlifyCmsImg from '@/assets/images/netlify-cms.png';
import openaiImg from '@/assets/images/openai.png';
import elevenLabsImg from '@/assets/images/elevenlabs.png';
import nestjsImg from '@/assets/images/nestjs.png';
import postgresqlImg from '@/assets/images/postgresql.png';
import supabaseImg from '@/assets/images/supabase.png';
import fastapiImg from '@/assets/images/fastapi.png';
import tailwindImg from '@/assets/images/tailwind.png';


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
        imageUrl: typescriptImg,
    },
    {
        rating: 9,
        heading: 'JavaScript',
        subHeading: Categories.ProgrammingLanguage,
        imageUrl: javascriptImg,
    },
    {
        rating: 8,
        heading: 'Vue.js',
        subHeading: Categories.FrontendFramework,
        imageUrl: vuejsImg,
    },
    {
        rating: 7,
        heading: 'React',
        subHeading: Categories.FrontendFramework,
        imageUrl: reactImg,
    },
    {
        rating: 9,
        heading: 'Python',
        subHeading: Categories.ProgrammingLanguage,
        imageUrl: pythonImg,
    },
    {
        rating: 8,
        heading: 'Node.js',
        subHeading: Categories.BackendFramework,
        imageUrl: nodeImg,
    },
    {
        rating: 7,
        heading: 'Docker',
        subHeading: Categories.DevOpsTool,
        imageUrl: dockerImg,
    },
    {
        rating: 6,
        heading: 'AWS',
        subHeading: Categories.CloudService,
        imageUrl: awsImg,
    },
    {
        rating: 7,
        heading: 'WordPress',
        subHeading: Categories.CMS,
        imageUrl: wordPressImg,
    },
    {
        rating: 8,
        heading: 'Jest',
        subHeading: Categories.TestingFramework,
        imageUrl: jestImg,
    },
    {
        rating: 8,
        heading: 'MongoDB',
        subHeading: Categories.Database,
        imageUrl: mongoImg,
    },
    {
        rating: 7,
        heading: 'Express.js',
        subHeading: Categories.BackendFramework,
        imageUrl: expressImg,
    },
    {
        rating: 6,
        heading: 'GraphQL',
        subHeading: Categories.Library,
        imageUrl: graphqlImg,
    },
    {
        rating: 7,
        heading: 'Redux',
        subHeading: Categories.Library,
        imageUrl: reduxImg,
    },
    {
        rating: 8,
        heading: 'Google Maps API',
        subHeading: Categories.ThirdPartyAPI,
        imageUrl: googleMapsImg,
    },
    {
        rating: 9,
        heading: 'Stripe',
        subHeading: Categories.PaymentProcessor,
        imageUrl: stripeImg,
    },
    {
        rating: 7,
        heading: 'Firebase',
        subHeading: Categories.ThirdPartyAPI,
        imageUrl: firebaseImg,
    },
    {
        rating: 6,
        heading: 'Selenium',
        subHeading: Categories.Automation,
        imageUrl: seleniumImg,
    },
    {
        rating: 7,
        heading: 'GitHub Actions',
        subHeading: Categories.Automation,
        imageUrl: githubActionsImg,
    },
    {
        rating: 8,
        heading: 'Auth0',
        subHeading: Categories.SecurityTool,
        imageUrl: auth0Img,
    },
    {
        rating: 7,
        heading: 'Google Analytics',
        subHeading: Categories.Analytics,
        imageUrl: analyticsImg,
    },
    {
        rating: 8,
        heading: 'Next.js',
        subHeading: Categories.FrontendFramework,
        imageUrl: nextImg,
    },
    {
        rating: 7,
        heading: 'Strapi',
        subHeading: Categories.CMS,
        imageUrl: strapiImg,
    },
    {
        rating: 7,
        heading: 'Payload CMS',
        subHeading: Categories.CMS,
        imageUrl: payloadImg,
    },
    {
        rating: 6,
        heading: 'Netlify CMS',
        subHeading: Categories.CMS,
        imageUrl: netlifyCmsImg,
    },
    {
        rating: 9,
        heading: 'OpenAI',
        subHeading: Categories.AITool,
        imageUrl: openaiImg,
    },
    {
        rating: 8,
        heading: 'Eleven Labs',
        subHeading: Categories.AITool,
        imageUrl: elevenLabsImg,
    },
    {
        rating: 8,
        heading: 'NestJS',
        subHeading: Categories.BackendFramework,
        imageUrl: nestjsImg,
    },
    {
        rating: 9,
        heading: 'PostgreSQL',
        subHeading: Categories.Database,
        imageUrl: postgresqlImg,
    },
    {
        rating: 8,
        heading: 'Supabase',
        subHeading: Categories.BackendFramework,
        imageUrl: supabaseImg,
    },
    {
        rating: 7,
        heading: 'FastAPI',
        subHeading: Categories.BackendFramework,
        imageUrl: fastapiImg,
    },
    {
        rating: 9,
        heading: 'Tailwind CSS',
        subHeading: Categories.Library,
        imageUrl: tailwindImg,
    },
];