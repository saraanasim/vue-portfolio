// utils/storageHelpers.ts

import { APP_LOADER_TIMEOUT } from "./constants";

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
