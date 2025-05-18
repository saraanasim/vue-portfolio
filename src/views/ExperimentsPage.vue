<template>
    <SectionContainer title="/ARCHIVES/EXPERIMENTS/LOG">
        <template #buttons>
            <ConnectButton />
            <DownloadButton />
        </template>
        <div class="w-full h-full flex">
            <div class="h-full w-4 border-y-2 border-l-2 border-dimmest-text"></div>
            <div class="w-full grid grid-cols-12 gap-2 border-t-4 border-magenta-hl">
                <!-- Sidebar for desktop: Technology filters -->
                <div class="hidden lg:block lg:col-span-3 overflow-y-auto p-4">
                    <div class="text-cyan font-mono text-lg mb-4 flex items-center">
                        <span class="mr-2 glow-text">TAGS</span>
                        <div class="h-px bg-cyan flex-grow opacity-40"></div>
                    </div>
                    <div class="flex flex-col gap-2">
                        <BaseButton v-for="tag in uniqueTags" :key="tag" @click="toggleTagFilter(tag)"
                            :variant="ButtonVariants.Flat" :class="[selectedTags.includes(tag) ? 'bg-cyan/20' : '']"
                            class="tag-filter text-left">
                            {{ tag }}
                        </BaseButton>
                        <BaseButton v-if="selectedTags.length > 0" @click="clearTagFilters"
                            :variant="ButtonVariants.Flat" class="clear-filter mt-4">
                            CLEAR FILTERS
                        </BaseButton>
                    </div>
                </div>

                <!-- Mobile dropdown for filters -->
                <div class="block col-span-12 lg:hidden p-4">
                    <BaseDropdown v-model:isOpen="isDropdownOpen" :options="tagDropdownOptions" :multiSelect="true"
                        :selectedValues="selectedTechValues" @select="handleTagSelect">
                        <template #trigger>
                            <span>{{ selectedTagsDisplay }}</span>
                        </template>
                    </BaseDropdown>
                </div>

                <div class="col-span-12 lg:col-span-9 overflow-y-auto">
                    <!-- Status bar -->
                    <div
                        class="status-bar flex items-center justify-between p-4 font-mono text-dimmest-text border-b border-cyan/30">
                        <div class="flex items-center">
                            <span class="text-green-hl mr-1">>></span>
                            DISPLAYING EXPERIMENTS: {{ filteredExperiments.length }}
                        </div>
                        <div class="flex items-center gap-4">
                            <div class="flex items-center gap-1">
                                <div class="w-2 h-2 rounded-full bg-green-500"></div>
                                <span>COMPLETED: {{ completedCount }}</span>
                            </div>
                            <div class="flex items-center gap-1">
                                <div class="w-2 h-2 rounded-full bg-yellow-500"></div>
                                <span>IN PROGRESS: {{ inProgressCount }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Experiments Grid -->
                    <div class="experiments-grid p-4">
                        <div v-for="experiment in filteredExperiments" :key="experiment.id" class="experiment-card"
                            @click="openExperimentDetail(experiment)">
                            <div class="card-image-container">
                                <img :src="experiment.cover_image" :alt="experiment.title" class="card-image">
                                <div class="card-overlay"></div>
                                <div
                                    :class="['status-indicator', experiment.status === 'Completed' ? 'status-completed' : 'status-progress']">
                                    {{ experiment.status }}
                                </div>
                            </div>
                            <div class="card-content">
                                <h3 class="card-title">{{ experiment.title }}</h3>
                                <p class="card-description">{{ experiment.description }}</p>
                                <div class="card-meta">
                                    <div class="card-date">{{ experiment.date }}</div>
                                    <div class="card-tags">
                                        <span v-for="tag in experiment.tags.slice(0, 2)" :key="tag" class="card-tag">{{
                                            tag
                                        }}</span>
                                        <span v-if="experiment.tags.length > 2" class="card-tag-more">+{{
                                            experiment.tags.length
                                            - 2 }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Empty state -->
                    <div v-if="filteredExperiments.length === 0" class="empty-state">
                        <div class="empty-state-icon">
                            <Icon icon="mdi:flask-empty-outline" class="size-12 text-cyan opacity-50" />
                        </div>
                        <div class="empty-state-text">No experiments match the selected filters</div>
                        <BaseButton @click="clearTagFilters" :variant="ButtonVariants.FlatFilled">Show All Experiments
                        </BaseButton>
                    </div>
                </div>
            </div>
            <div class="h-full w-4 border-y-2 border-r-2 border-dimmest-text"></div>
        </div>

        <!-- Experiment Detail Modal -->
        <BaseModal v-model="isModalOpen" :title="selectedExperiment ? selectedExperiment.title : 'Experiment Details'"
            accessLevel="LAB_CLEARANCE">
            <div v-if="selectedExperiment" class="experiment-details">
                <!-- Experiment Gallery -->
                <div class="gallery-carousel">
                    <div class="carousel-container" ref="carouselRef">
                        <div class="carousel-inner" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
                            <div v-for="(image, index) in selectedExperiment.gallery" :key="index"
                                class="carousel-slide">
                                <img :src="image" :alt="`${selectedExperiment.title} slide ${index + 1}`">
                            </div>
                        </div>
                    </div>
                    <div class="carousel-controls">
                        <button @click="prevSlide" class="carousel-control prev">
                            <Icon icon="mdi:chevron-left" class="size-6" />
                        </button>
                        <div class="carousel-dots">
                            <button v-for="(_, index) in selectedExperiment.gallery" :key="index"
                                @click="goToSlide(index)"
                                :class="['carousel-dot', index === currentSlide ? 'active' : '']"></button>
                        </div>
                        <button @click="nextSlide" class="carousel-control next">
                            <Icon icon="mdi:chevron-right" class="size-6" />
                        </button>
                    </div>
                </div>

                <!-- Experiment Info -->
                <div class="experiment-info">
                    <div class="info-section">
                        <div class="info-grid">
                            <div class="info-item">
                                <div class="info-label">STATUS</div>
                                <div
                                    :class="['info-value status',
                                        selectedExperiment.status === 'Completed' ? 'status-completed' : 'status-progress']">
                                    {{ selectedExperiment.status }}
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="info-label">DATE</div>
                                <div class="info-value">{{ selectedExperiment.date }}</div>
                            </div>
                            <div class="info-item">
                                <div class="info-label">GITHUB</div>
                                <div class="info-value">
                                    <a :href="selectedExperiment.github_url" target="_blank" class="info-link">
                                        {{ selectedExperiment.github_url.split('/').slice(-2).join('/') }}
                                    </a>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="info-label">LIVE DEMO</div>
                                <div class="info-value">
                                    <a :href="selectedExperiment.live_url" target="_blank" class="info-link">
                                        {{ selectedExperiment.live_url.replace(/^https?:\/\//, '') }}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="tag-section">
                        <div class="tag-heading">TECHNOLOGIES</div>
                        <div class="tag-list">
                            <span v-for="tag in selectedExperiment.tags" :key="tag" class="detail-tag">{{ tag }}</span>
                        </div>
                    </div>

                    <div class="objective-section">
                        <div class="section-heading">OBJECTIVE</div>
                        <div class="section-content">{{ selectedExperiment.details.objective }}</div>
                    </div>

                    <div class="details-grid">
                        <div class="detail-col">
                            <div class="detail-heading">APPROACH</div>
                            <div class="detail-content">{{ selectedExperiment.details.approach }}</div>
                        </div>
                        <div class="detail-col">
                            <div class="detail-heading">OUTCOMES</div>
                            <div class="detail-content">{{ selectedExperiment.details.outcomes }}</div>
                        </div>
                    </div>

                    <div class="learnings-section">
                        <div class="section-heading">KEY LEARNINGS</div>
                        <div class="section-content">{{ selectedExperiment.details.learnings }}</div>
                    </div>
                </div>
            </div>

            <template #footer-buttons>
                <button class="action-btn view-btn" v-if="selectedExperiment"
                    @click="openExperimentUrl(selectedExperiment.live_url)">
                    VIEW EXPERIMENT
                </button>
                <button class="action-btn close-btn" @click="isModalOpen = false">
                    CLOSE
                </button>
            </template>
        </BaseModal>
    </SectionContainer>
</template>


<script lang="ts">
import SectionContainer from '@/components/shared/SectionContainer.vue';
import BaseButton from '@/components/shared/BaseButton.vue';
import BaseModal from '@/components/shared/BaseModal.vue';
import BaseDropdown, { type DropdownOption } from '@/components/shared/BaseDropdown.vue';
import ConnectButton from '@/components/shared/ConnectButton.vue';
import DownloadButton from '@/components/shared/DownloadButton.vue';
import { ButtonVariants } from '@/utils/constants';
import { Icon } from '@iconify/vue';
import experimentsData from '@/data/experiments.json';
import { ref, computed, onMounted } from 'vue';
import { downloadResume } from '@/utils/helpers';

interface ExperimentDetails {
    objective: string;
    approach: string;
    outcomes: string;
    learnings: string;
}

interface Experiment {
    id: number;
    title: string;
    description: string;
    cover_image: string;
    status: string;
    date: string;
    tags: string[];
    github_url: string;
    live_url: string;
    details: ExperimentDetails;
    gallery: string[];
}

export default {
    name: 'ExperimentsPage',
    components: {
        SectionContainer,
        BaseButton,
        BaseModal,
        BaseDropdown,
        ConnectButton,
        DownloadButton,
        Icon
    },
    setup() {
        const experiments = ref<Experiment[]>(experimentsData as Experiment[]);
        const selectedTags = ref<string[]>([]);
        const isModalOpen = ref(false);
        const selectedExperiment = ref<Experiment | null>(null);
        const currentSlide = ref(0);
        const carouselRef = ref<HTMLElement | null>(null);
        const isDropdownOpen = ref(false);

        // Compute all unique tags from experiments
        const uniqueTags = computed(() => {
            const tags = new Set<string>();
            experiments.value.forEach(exp => {
                exp.tags.forEach(tag => tags.add(tag));
            });
            return Array.from(tags);
        });

        // Dropdown options for mobile view
        const tagDropdownOptions = computed(() => {
            return [
                { label: 'Select All', value: 'all' },
                ...uniqueTags.value.map(tag => ({
                    label: tag,
                    value: tag
                }))
            ];
        });

        const selectedTechValues = computed(() => {
            return selectedTags.value;
        });

        const selectedTagsDisplay = computed(() => {
            if (selectedTags.value.length === 0) {
                return 'Select Tags';
            } else if (selectedTags.value.length === uniqueTags.value.length) {
                return 'All Selected';
            } else if (selectedTags.value.length === 1) {
                return selectedTags.value[0];
            } else {
                return `${selectedTags.value[0]} +${selectedTags.value.length - 1} more`;
            }
        });

        // Filter experiments based on selected tags
        const filteredExperiments = computed(() => {
            if (selectedTags.value.length === 0) {
                return experiments.value;
            }

            return experiments.value.filter(exp =>
                exp.tags.some(tag => selectedTags.value.includes(tag))
            );
        });

        // Count experiments by status
        const completedCount = computed(() =>
            experiments.value.filter(exp => exp.status === 'Completed').length
        );

        const inProgressCount = computed(() =>
            experiments.value.filter(exp => exp.status === 'In Progress').length
        );

        // Toggle tag selection
        const toggleTagFilter = (tag: string) => {
            const index = selectedTags.value.indexOf(tag);
            if (index === -1) {
                selectedTags.value.push(tag);
            } else {
                selectedTags.value.splice(index, 1);
            }
        };

        // Handle tag selection from dropdown
        const handleTagSelect = (option: DropdownOption) => {
            if (option.value === 'all') {
                // If "Select All" was clicked
                if (selectedTags.value.length === uniqueTags.value.length) {
                    // If all tags are already selected, deselect all
                    selectedTags.value = [];
                } else {
                    // Otherwise, select all tags
                    selectedTags.value = [...uniqueTags.value];
                }
            } else {
                // For other tags, toggle selection
                toggleTagFilter(option.value as string);
            }
        };

        // Clear all tag filters
        const clearTagFilters = () => {
            selectedTags.value = [];
        };

        // Open experiment detail modal
        const openExperimentDetail = (experiment: Experiment) => {
            selectedExperiment.value = experiment;
            currentSlide.value = 0; // Reset carousel
            isModalOpen.value = true;
        };

        // Carousel navigation
        const nextSlide = () => {
            if (!selectedExperiment.value) return;
            currentSlide.value = (currentSlide.value + 1) % selectedExperiment.value.gallery.length;
        };

        const prevSlide = () => {
            if (!selectedExperiment.value) return;
            currentSlide.value = (currentSlide.value - 1 + selectedExperiment.value.gallery.length) % selectedExperiment.value.gallery.length;
        };

        const goToSlide = (index: number) => {
            currentSlide.value = index;
        };

        // Open experiment URL in new tab
        const openExperimentUrl = (url: string) => {
            window.open(url, '_blank');
        };

        // Initialize page and set up event listeners
        onMounted(() => {
            // Auto-advance carousel
            const carouselInterval = setInterval(() => {
                if (isModalOpen.value && selectedExperiment.value) {
                    nextSlide();
                }
            }, 5000);

            // Clean up interval on unmount
            return () => clearInterval(carouselInterval);
        });

        return {
            experiments,
            selectedTags,
            uniqueTags,
            filteredExperiments,
            completedCount,
            inProgressCount,
            toggleTagFilter,
            clearTagFilters,
            isModalOpen,
            selectedExperiment,
            openExperimentDetail,
            currentSlide,
            carouselRef,
            nextSlide,
            prevSlide,
            goToSlide,
            openExperimentUrl,
            ButtonVariants,
            isDropdownOpen,
            tagDropdownOptions,
            handleTagSelect,
            selectedTechValues,
            selectedTagsDisplay
        };
    }
};
</script>

<style scoped>
.magenta-hl {
    background-color: #ff00ff;
}

.glow-text {
    text-shadow: 0 0 8px rgba(0, 229, 255, 0.6);
}

.scanner-line {
    width: 80px;
    height: 1px;
    background: linear-gradient(90deg, transparent, #00E5FF, transparent);
    position: relative;
    animation: scan 2s infinite;
}

@keyframes scan {
    0% {
        transform: translateX(-40px);
    }

    100% {
        transform: translateX(40px);
    }
}

.tag-filter {
    font-family: monospace;
    font-size: 0.8rem;
    transition: all 0.2s ease;
}

.tag-filter:hover {
    background-color: rgba(0, 229, 255, 0.3);
}

.clear-filter {
    color: #ff00ff;
    border-color: #ff00ff;
}

.clear-filter:hover {
    background-color: rgba(255, 0, 255, 0.2);
}

.experiments-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
}

.experiment-card {
    border: 1px solid rgba(0, 229, 255, 0.3);
    background-color: #021114;
    overflow: hidden;
    transition: all 0.3s ease;
    cursor: pointer;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.experiment-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 5px 15px rgba(0, 229, 255, 0.4);
    border-color: rgba(0, 229, 255, 0.8);
}

.card-image-container {
    position: relative;
    overflow: hidden;
    height: 200px;
}

.card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.experiment-card:hover .card-image {
    transform: scale(1.05);
}

.card-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(2, 17, 20, 0.1) 0%, rgba(2, 17, 20, 0.8) 100%);
    z-index: 1;
}

.status-indicator {
    position: absolute;
    top: 1rem;
    right: 1rem;
    padding: 0.25rem 0.75rem;
    font-size: 0.75rem;
    font-family: monospace;
    z-index: 2;
    border-radius: 2px;
}

.status-completed {
    background-color: rgba(0, 255, 0, 0.2);
    color: #00ff00;
    border: 1px solid rgba(0, 255, 0, 0.5);
}

.status-progress {
    background-color: rgba(255, 255, 0, 0.2);
    color: #ffff00;
    border: 1px solid rgba(255, 255, 0, 0.5);
}

.card-content {
    padding: 1.25rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}

.card-title {
    color: #00E5FF;
    font-family: monospace;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    line-height: 1.3;
    position: relative;
    padding-bottom: 0.5rem;
}

.card-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 3rem;
    height: 1px;
    background-color: rgba(0, 229, 255, 0.4);
}

.card-description {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
    margin-bottom: 1rem;
    flex-grow: 1;
}

.card-meta {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
}

.card-date {
    color: #ff00ff;
    font-family: monospace;
}

.card-tags {
    display: flex;
    gap: 0.5rem;
}

.card-tag {
    background-color: rgba(0, 229, 255, 0.1);
    border: 1px solid rgba(0, 229, 255, 0.3);
    color: rgba(0, 229, 255, 0.8);
    padding: 0.1rem 0.4rem;
    border-radius: 2px;
}

.card-tag-more {
    color: rgba(255, 255, 255, 0.6);
}

.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    text-align: center;
    background-color: rgba(0, 229, 255, 0.05);
    border: 1px dashed rgba(0, 229, 255, 0.2);
    margin-top: 2rem;
}

.empty-state-text {
    margin: 1rem 0 1.5rem;
    color: rgba(255, 255, 255, 0.6);
    font-family: monospace;
}

/* Detail modal styles */
.experiment-details {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    color: #00E5FF;
    font-family: monospace;
}

.gallery-carousel {
    position: relative;
    margin-bottom: 1.5rem;
}

.carousel-container {
    overflow: hidden;
    border: 1px solid rgba(0, 229, 255, 0.3);
    background-color: rgba(0, 21, 25, 0.8);
}

.carousel-inner {
    display: flex;
    transition: transform 0.5s ease;
}

.carousel-slide {
    min-width: 100%;
}

.carousel-slide img {
    width: 100%;
    height: 300px;
    object-fit: cover;
}

.carousel-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.5rem;
}

.carousel-control {
    background-color: transparent;
    color: #00E5FF;
    border: 1px solid rgba(0, 229, 255, 0.5);
    padding: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
}

.carousel-control:hover {
    background-color: rgba(0, 229, 255, 0.2);
}

.carousel-dots {
    display: flex;
    gap: 0.5rem;
}

.carousel-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: rgba(0, 229, 255, 0.3);
    cursor: pointer;
    transition: all 0.2s ease;
}

.carousel-dot.active {
    background-color: #00E5FF;
}

.experiment-info {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
}

.info-item {
    border-bottom: 1px dashed rgba(0, 229, 255, 0.3);
    padding-bottom: 0.5rem;
}

.info-label {
    font-size: 0.75rem;
    color: rgba(0, 229, 255, 0.6);
    margin-bottom: 0.25rem;
}

.info-value {
    font-size: 0.9rem;
}

.info-value.status {
    display: inline-block;
    padding: 0.1rem 0.5rem;
    border-radius: 2px;
    font-size: 0.8rem;
}

.info-link {
    color: #ff00ff;
    text-decoration: underline;
    text-decoration-color: rgba(255, 0, 255, 0.4);
    text-underline-offset: 2px;
}

.info-link:hover {
    text-decoration-color: #ff00ff;
}

.tag-section {
    margin-top: 0.5rem;
}

.tag-heading {
    font-size: 0.75rem;
    color: rgba(0, 229, 255, 0.6);
    margin-bottom: 0.5rem;
}

.tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.detail-tag {
    background-color: rgba(0, 229, 255, 0.1);
    border: 1px solid rgba(0, 229, 255, 0.3);
    color: rgba(0, 229, 255, 0.9);
    padding: 0.25rem 0.75rem;
    border-radius: 2px;
    font-size: 0.8rem;
}

.objective-section,
.learnings-section {
    background-color: rgba(0, 229, 255, 0.05);
    padding: 1rem;
    border-left: 3px solid rgba(0, 229, 255, 0.5);
}

.section-heading,
.detail-heading {
    font-size: 0.75rem;
    color: rgba(0, 229, 255, 0.7);
    margin-bottom: 0.5rem;
    font-weight: bold;
}

.section-content,
.detail-content {
    font-size: 0.9rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.8);
}

.details-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
}

.detail-col {
    background-color: rgba(255, 0, 255, 0.05);
    padding: 1rem;
    border-left: 3px solid rgba(255, 0, 255, 0.5);
}

.action-btn {
    font-family: monospace;
    text-transform: uppercase;
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
}

.view-btn {
    background-color: rgba(0, 229, 255, 0.1);
    color: #00E5FF;
    border: 1px solid #00E5FF;
    margin-right: 0.5rem;
}

.view-btn:hover {
    background-color: #00E5FF;
    color: #021114;
}

.close-btn {
    background-color: transparent;
    color: rgba(255, 255, 255, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.close-btn:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.5);
}

/* Responsive styles */
@media (max-width: 768px) {
    .experiments-grid {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }

    .carousel-slide img {
        height: 200px;
    }
}
</style>