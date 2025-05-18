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
    let resumeUrl = configData.resumeUrl;

    // Handle Google Drive links
    if (resumeUrl.includes('drive.google.com')) {
        const fileId = resumeUrl.match(/\/d\/(.*?)\/view/)?.[1];
        if (fileId) {
            // Convert to direct download link
            resumeUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
        }
    } else if (resumeUrl.startsWith('@/')) {
        // Handle @ alias for assets
        resumeUrl = resumeUrl.replace('@/', '/');
    }

    // Open Google Drive links in new tab due to their authentication requirements
    if (resumeUrl.includes('drive.google.com')) {
        window.open(resumeUrl, '_blank');
        return;
    }

    // For other files, proceed with direct download
    fetch(resumeUrl)
        .then(response => response.blob())
        .then(blob => {
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;

            // Extract filename from path or use default
            const fileName = 'resume.pdf';
            link.download = fileName;

            // Trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Clean up the blob URL
            window.URL.revokeObjectURL(blobUrl);
        })
        .catch(error => {
            console.error('Error downloading resume:', error);
            // Fallback to opening in new tab if download fails
            window.open(resumeUrl, '_blank');
        });
};