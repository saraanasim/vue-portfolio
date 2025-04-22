// utils/storageHelpers.ts

import { APP_LOADER_TIMEOUT } from "./constants";
import configData from '@/data/config.json';

// Utility function to get the current timestamp
const getCurrentTime = () => new Date().getTime();

// Set the timestamp when the loader was last shown
export const setShowAppLoader = (displayedAt: number) => {
    localStorage.setItem('loader', displayedAt.toString());
};

// Check if the loader should be displayed based on session time
export const shouldShowAppLoader = (): boolean => {
    const lastShownTime = localStorage.getItem('loader');
    const currentTime = getCurrentTime();

    // If there is no record of the loader being shown, display it
    if (!lastShownTime) return true;

    const elapsedTime = currentTime - parseInt(lastShownTime, 10);

    // If the elapsed time exceeds the session limit, show the loader
    if (elapsedTime >= APP_LOADER_TIMEOUT) return true;

    // Otherwise, do not show the loader
    return false;
};


type FormatOption = 'date' | 'time' | 'both';

export function getFormattedDateTime(format: FormatOption) {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const date = `${day}.${month}.${year}`;
    const time = `${hours}.${minutes}.${seconds}`;

    switch (format) {
        case 'date':
            return date;
        case 'time':
            return time;
        case 'both':
        default:
            return `${date} ${time}`;
    }
}

/**
 * Downloads the resume file specified in the config
 */
export const downloadResume = (): void => {
    const resumeUrl = configData.resumeUrl;
    const link = document.createElement('a');
    link.href = resumeUrl;

    // Extract filename from path for the download attribute
    const fileName = resumeUrl.split('/').pop() || 'resume.pdf';
    link.download = fileName;

    // Append to body, click and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};