<template>
    <SectionContainer title="/ARCHIVES/ARTICLES/LOG">
        <template #buttons>
            <ConnectButton />
            <DownloadButton />
        </template>
        <div class="w-full h-full flex">
            <div class="h-full w-4 border-y-2 border-l-2 border-dimmest-text"></div>
            <div class="w-full grid grid-cols-12 gap-2 border-t-4 border-blue-hl">
                <!-- Sidebar for desktop: Tag filters -->
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
                        :selectedValues="selectedTagValues" @select="handleTagSelect">
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
                            <span class="text-blue-hl mr-1">>></span>
                            DISPLAYING ARTICLES: {{ filteredArticles.length }}
                        </div>
                        <div class="flex items-center gap-4">
                            <div class="flex items-center gap-1">
                                <div class="w-2 h-2 rounded-full bg-blue-400"></div>
                                <span>EXTERNAL: {{ externalCount }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Articles Grid -->
                    <div class="articles-grid p-4">
                        <div v-for="article in filteredArticles" :key="article.id" class="article-card"
                            @click="openArticleLink(article.url)">
                            <div class="card-image-container">
                                <img :src="article.cover_image" :alt="article.title" class="card-image">
                                <div class="card-overlay"></div>
                                <div class="external-indicator">
                                    <Icon :icon="article.source_icon" class="source-icon" />
                                    <span>{{ article.source }}</span>
                                </div>
                            </div>
                            <div class="card-content">
                                <h3 class="card-title">{{ article.title }}</h3>
                                <p class="card-description">{{ article.description }}</p>
                                <div class="card-meta">
                                    <div class="card-date">{{ article.date }}</div>
                                    <div class="card-tags">
                                        <span v-for="tag in article.tags.slice(0, 2)" :key="tag" class="card-tag">{{ tag
                                        }}</span>
                                        <span v-if="article.tags.length > 2" class="card-tag-more">+{{
                                            article.tags.length - 2
                                        }}</span>
                                    </div>
                                </div>
                                <div class="external-link-indicator">
                                    <Icon icon="mdi:open-in-new" class="mr-1" />
                                    <span>External Link</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Empty state -->
                    <div v-if="filteredArticles.length === 0" class="empty-state">
                        <div class="empty-state-icon">
                            <Icon icon="mdi:file-document-outline" class="size-12 text-cyan opacity-50" />
                        </div>
                        <div class="empty-state-text">No articles match the selected filters</div>
                        <BaseButton @click="clearTagFilters" :variant="ButtonVariants.FlatFilled">Show All Articles
                        </BaseButton>
                    </div>
                </div>
            </div>
            <div class="h-full w-4 border-y-2 border-r-2 border-dimmest-text"></div>
        </div>

        <!-- Connect Modal -->
    </SectionContainer>
</template>

<script lang="ts">
import BaseButton from '@/components/shared/BaseButton.vue';
import BaseDropdown, { type DropdownOption } from '@/components/shared/BaseDropdown.vue';
import ConnectButton from '@/components/shared/ConnectButton.vue';
import DownloadButton from '@/components/shared/DownloadButton.vue';
import SectionContainer from '@/components/shared/SectionContainer.vue';
import articlesData from '@/data/articles.json';
import { ButtonVariants } from '@/utils/constants';
import { downloadResume } from '@/utils/helpers';
import { Icon } from '@iconify/vue';
import { computed, ref } from 'vue';

interface Article {
    id: number;
    title: string;
    description: string;
    cover_image: string;
    date: string;
    type: string;
    tags: string[];
    url: string;
    source: string;
    source_icon: string;
}

export default {
    name: 'ArticlesPage',
    components: {
        SectionContainer,
        BaseButton,
        BaseDropdown,
        ConnectButton,
        DownloadButton,
        Icon
    },
    setup() {
        const articles = ref<Article[]>(articlesData as Article[]);
        const selectedTags = ref<string[]>([]);
        const isDropdownOpen = ref(false);

        // Compute all unique tags from articles
        const uniqueTags = computed(() => {
            const tags = new Set<string>();
            articles.value.forEach(article => {
                article.tags.forEach(tag => tags.add(tag));
            });
            return Array.from(tags).sort();
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

        const selectedTagValues = computed(() => {
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

        // Filter articles based on selected tags
        const filteredArticles = computed(() => {
            if (selectedTags.value.length === 0) {
                return articles.value;
            }

            return articles.value.filter(article =>
                article.tags.some(tag => selectedTags.value.includes(tag))
            );
        });

        // Count articles by type
        const externalCount = computed(() =>
            articles.value.filter(article => article.type === 'external').length
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

        // Open article in new tab
        const openArticleLink = (url: string) => {
            window.open(url, '_blank', 'noopener,noreferrer');
        };

        // Download resume
        const downloadResumeFile = () => {
            downloadResume();
        };

        return {
            articles,
            selectedTags,
            uniqueTags,
            filteredArticles,
            externalCount,
            toggleTagFilter,
            clearTagFilters,
            ButtonVariants,
            isDropdownOpen,
            tagDropdownOptions,
            handleTagSelect,
            selectedTagValues,
            selectedTagsDisplay,
            openArticleLink,
            downloadResumeFile
        };
    }
};
</script>

<style scoped>
.blue-hl {
    background-color: #1e88e5;
}

.glow-text {
    text-shadow: 0 0 8px rgba(0, 229, 255, 0.6);
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
    color: #1e88e5;
    border-color: #1e88e5;
}

.clear-filter:hover {
    background-color: rgba(30, 136, 229, 0.2);
}

.articles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
}

.article-card {
    border: 1px solid rgba(0, 229, 255, 0.3);
    background-color: #021114;
    overflow: hidden;
    transition: all 0.3s ease;
    cursor: pointer;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
}

.article-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 5px 15px rgba(0, 229, 255, 0.4);
    border-color: rgba(0, 229, 255, 0.8);
}

.card-image-container {
    position: relative;
    overflow: hidden;
    height: 180px;
}

.card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.article-card:hover .card-image {
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

.external-indicator {
    position: absolute;
    top: 1rem;
    right: 1rem;
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    font-family: monospace;
    z-index: 2;
    background-color: rgba(30, 136, 229, 0.8);
    color: white;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.source-icon {
    width: 16px;
    height: 16px;
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
    font-size: 1.1rem;
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
    margin-bottom: 0.75rem;
}

.card-date {
    color: #1e88e5;
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

.external-link-indicator {
    margin-top: auto;
    padding-top: 0.75rem;
    border-top: 1px dashed rgba(0, 229, 255, 0.2);
    color: #1e88e5;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
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

/* Responsive styles */
@media (max-width: 768px) {
    .articles-grid {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
}
</style>