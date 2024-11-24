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


export enum SubHeadingEnum {
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
}

export const TECHNOLOGIES = [
    {
        rating: 10,
        heading: 'Typescript',
        subHeading: SubHeadingEnum.ProgrammingLanguage,
        imageUrl: '/src/assets/images/typescript.png',
    },
    {
        rating: 9,
        heading: 'JavaScript',
        subHeading: SubHeadingEnum.ProgrammingLanguage,
        imageUrl: '/src/assets/images/javascript.png',
    },
    {
        rating: 8,
        heading: 'Vue.js',
        subHeading: SubHeadingEnum.FrontendFramework,
        imageUrl: '/src/assets/images/vuejs.png',
    },
    {
        rating: 7,
        heading: 'React',
        subHeading: SubHeadingEnum.FrontendFramework,
        imageUrl: '/src/assets/images/react.png',
    },
    {
        rating: 9,
        heading: 'Python',
        subHeading: SubHeadingEnum.ProgrammingLanguage,
        imageUrl: '/src/assets/images/python.png',
    },
    {
        rating: 8,
        heading: 'Node.js',
        subHeading: SubHeadingEnum.BackendFramework,
        imageUrl: '/src/assets/images/nodejs.png',
    },
    {
        rating: 7,
        heading: 'Docker',
        subHeading: SubHeadingEnum.DevOpsTool,
        imageUrl: '/src/assets/images/docker.png',
    },
    {
        rating: 6,
        heading: 'AWS',
        subHeading: SubHeadingEnum.CloudService,
        imageUrl: '/src/assets/images/aws.png',
    },
    {
        rating: 7,
        heading: 'WordPress',
        subHeading: SubHeadingEnum.CMS,
        imageUrl: '/src/assets/images/wordpress.png',
    },
    {
        rating: 8,
        heading: 'Jest',
        subHeading: SubHeadingEnum.TestingFramework,
        imageUrl: '/src/assets/images/jest.png',
    },
];