<template>
    <SectionContainer title="/ARCHIVES/PROJECTS/INFO">
        <template #buttons>
            <BaseButton :variant="ButtonVariants.TypeWriter" :isActive="true">Connect</BaseButton>
            <BaseButton :variant="ButtonVariants.TypeWriter">Upload</BaseButton>
            <BaseButton :variant="ButtonVariants.TypeWriter">Download</BaseButton>
        </template>
        <div class="w-full h-full flex lg:max-h-[500px]">
            <div class="h-full w-4 border-y-2 border-l-2 border-dimmest-text"></div>
            <div class="w-full grid grid-cols-12 gap-2 border-t-4 border-maroon-hl">
                <div class="hidden lg:block lg:col-span-3 overflow-y-auto">
                    <SelectableIconItem v-for="tech in filteredTechnologies" :key="tech.heading" :rating="tech.rating"
                        :heading="tech.heading" :subHeading="tech.subHeading" :imageUrl="tech.imageUrl"
                        :selected="selectedTechs.includes(tech.heading)" @click="selectTechnology(tech.heading)" />
                </div>
                <div class="block col-span-12 lg:hidden lg:overflow-y-auto">
                    <BaseDropdown v-model:isOpen="isDropdownOpen" :options="techDropdownOptions" :multiSelect="true"
                        :selectedValues="selectedTechValues" @select="handleTechSelect">
                        <template #trigger>
                            <span>{{ selectedTechsDisplay }}</span>
                        </template>
                    </BaseDropdown>
                </div>
                <div class="col-span-12 lg:col-span-9 overflow-y-auto">
                    <div class="w-full text-dimmest-text">
                        <!-- File explorer header -->
                        <div class="flex px-2 py-1 bg-gray-bg border-b border-dimmest-text">
                            <div class="flex-1 flex items-center">
                                <BaseButton :variant="ButtonVariants.Flat" :isActive="sortKey === 'name'"
                                    @click="sortBy('name')" class="text-left">
                                    NAME
                                </BaseButton>
                                <span v-if="sortKey === 'name'" class="ml-1">{{ sortOrder === 'asc' ? '▲' : '▼'
                                }}</span>
                            </div>
                            <div class="w-28 flex items-center">
                                <BaseButton :variant="ButtonVariants.Flat" :isActive="sortKey === 'size'"
                                    @click="sortBy('size')" class="text-left">
                                    SIZE
                                </BaseButton>
                                <span v-if="sortKey === 'size'" class="ml-1">{{ sortOrder === 'asc' ? '▲' : '▼'
                                }}</span>
                            </div>
                            <div class="w-28 flex items-center">
                                <BaseButton :variant="ButtonVariants.Flat" :isActive="sortKey === 'type'"
                                    @click="sortBy('type')" class="text-left">
                                    TYPE
                                </BaseButton>
                                <span v-if="sortKey === 'type'" class="ml-1">{{ sortOrder === 'asc' ? '▲' : '▼'
                                }}</span>
                            </div>
                        </div>

                        <!-- File explorer content -->
                        <div v-if="filteredProjects.length === 0" class="p-4 text-center">
                            No projects found with the selected technology.
                        </div>

                        <div v-for="project in filteredProjects" :key="project.id"
                            class="flex px-2 py-2 border-b border-dimmest-text hover:bg-gray-bg cursor-pointer"
                            @click="openProjectDetails(project)">
                            <div class="flex-1 flex items-center">
                                <div class="mr-2">
                                    <Icon icon="mdi:folder" class="w-5 h-5 text-dimmest-text" />
                                </div>
                                <div>{{ project.name }}</div>
                            </div>
                            <div class="w-28 text-right">{{ project.size }}</div>
                            <div class="w-28 text-right">{{ project.type }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="h-full w-4 border-y-2 border-r-2 border-dimmest-text"></div>
        </div>

        <!-- Project Details Modal -->
        <BaseModal v-model="isModalOpen" :title="selectedProject ? selectedProject.name : 'Project Details'"
            accessLevel="USER">
            <div v-if="selectedProject" class="project-details">
                <div class="details-grid">
                    <div class="detail-row">
                        <div class="detail-label">PROJECT ID:</div>
                        <div class="detail-value">#{{ selectedProject.id }}</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">TYPE:</div>
                        <div class="detail-value">{{ selectedProject.type }}</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">SIZE:</div>
                        <div class="detail-value">{{ selectedProject.size }}</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">URL:</div>
                        <div class="detail-value">
                            <a :href="selectedProject.url" target="_blank" class="link">{{ selectedProject.url }}</a>
                        </div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">GITHUB:</div>
                        <div class="detail-value">
                            <a :href="selectedProject.githubUrl" target="_blank" class="link">{{
                                selectedProject.githubUrl
                                }}</a>
                        </div>
                    </div>
                </div>

                <div class="section-divider">
                    <div class="divider-line"></div>
                    <div class="divider-label">DESCRIPTION</div>
                    <div class="divider-line"></div>
                </div>

                <div class="description">{{ selectedProject.description }}</div>

                <div class="section-divider">
                    <div class="divider-line"></div>
                    <div class="divider-label">TECHNOLOGIES</div>
                    <div class="divider-line"></div>
                </div>

                <div class="tech-tags">
                    <div v-for="tech in selectedProject.technologies" :key="tech" class="tech-tag">
                        {{ tech }}
                    </div>
                </div>
            </div>

            <template #footer-buttons>
                <button class="action-btn" @click="downloadProject" v-if="selectedProject">DOWNLOAD</button>
                <button class="action-btn" @click="isModalOpen = false">DISCONNECT</button>
            </template>
        </BaseModal>
    </SectionContainer>
</template>


<script lang="ts">
import BaseButton from '@/components/shared/BaseButton.vue';
import BaseDropdown, { type DropdownOption } from '@/components/shared/BaseDropdown.vue';
import SectionContainer from '@/components/shared/SectionContainer.vue';
import SelectableIconItem from '@/components/shared/SelectableIconItem.vue';
import BaseModal from '@/components/shared/BaseModal.vue';
import { lifecycleLoggerMixin } from '@/mixins/lifecycleLogger.mixin';
import { ButtonVariants, TECHNOLOGIES } from '@/utils/constants';
import projectsData from '@/data/projects.json';
import { Icon } from '@iconify/vue';

interface Project {
    id: number;
    name: string;
    size: string;
    type: string;
    icon: string;
    description: string;
    url: string;
    githubUrl: string;
    technologies: string[];
}

export default {
    name: 'ProjectsPage',
    components: {
        SectionContainer,
        SelectableIconItem,
        BaseButton,
        BaseDropdown,
        BaseModal,
        Icon,
    },
    data() {
        return {
            TECHNOLOGIES,
            ButtonVariants,
            projects: projectsData as Project[],
            selectedTechs: [] as string[],
            isDropdownOpen: false,
            sortKey: 'name',
            sortOrder: 'asc',
            isModalOpen: false,
            selectedProject: null as Project | null,
        };
    },
    computed: {
        techDropdownOptions(): DropdownOption[] {
            return [
                { label: 'Select All', value: 'all' },
                ...this.TECHNOLOGIES.map(tech => ({
                    label: tech.heading,
                    value: tech.heading
                }))
            ];
        },
        selectedTechValues(): string[] {
            return this.selectedTechs;
        },
        selectedTechsDisplay(): string {
            if (this.selectedTechs.length === 0) {
                return 'Select Technologies';
            } else if (this.selectedTechs.length === this.TECHNOLOGIES.length) {
                return 'All Selected';
            } else if (this.selectedTechs.length === 1) {
                return this.selectedTechs[0];
            } else {
                return `${this.selectedTechs[0]} +${this.selectedTechs.length - 1} more`;
            }
        },
        filteredTechnologies() {
            return this.TECHNOLOGIES;
        },
        filteredProjects(): Project[] {
            let filtered = [...this.projects];

            if (this.selectedTechs.length > 0) {
                filtered = filtered.filter(project =>
                    // Match if project contains ANY of the selected technologies
                    project.technologies.some(tech =>
                        this.selectedTechs.some(selectedTech =>
                            tech.toLowerCase() === selectedTech.toLowerCase()
                        )
                    )
                );
            }

            // Apply sorting
            filtered.sort((a, b) => {
                let compareA = a[this.sortKey as keyof Project];
                let compareB = b[this.sortKey as keyof Project];

                // Special handling for size (convert to bytes for comparison)
                if (this.sortKey === 'size') {
                    compareA = this.convertSizeToBytes(a.size);
                    compareB = this.convertSizeToBytes(b.size);
                }

                // Compare as strings or numbers
                if (typeof compareA === 'string' && typeof compareB === 'string') {
                    return this.sortOrder === 'asc'
                        ? compareA.localeCompare(compareB)
                        : compareB.localeCompare(compareA);
                } else {
                    return this.sortOrder === 'asc'
                        ? Number(compareA) - Number(compareB)
                        : Number(compareB) - Number(compareA);
                }
            });

            return filtered;
        }
    },
    methods: {
        selectTechnology(technology: string) {
            const index = this.selectedTechs.indexOf(technology);
            if (index === -1) {
                // Add technology if not already selected
                this.selectedTechs.push(technology);
            } else {
                // Remove technology if already selected
                this.selectedTechs.splice(index, 1);
            }
        },
        removeTechnology(technology: string) {
            const index = this.selectedTechs.indexOf(technology);
            if (index !== -1) {
                this.selectedTechs.splice(index, 1);
            }
        },
        clearSelectedTechs() {
            this.selectedTechs = [];
        },
        handleTechSelect(option: DropdownOption) {
            if (option.value === 'all') {
                // If "Select All" was clicked
                if (this.selectedTechs.length === this.TECHNOLOGIES.length) {
                    // If all technologies are already selected, deselect all
                    this.selectedTechs = [];
                } else {
                    // Otherwise, select all technologies
                    this.selectedTechs = this.TECHNOLOGIES.map(tech => tech.heading);
                }
            } else {
                // For other technologies, toggle selection
                this.selectTechnology(option.value as string);
            }
        },
        sortBy(key: string) {
            if (this.sortKey === key) {
                // Toggle sort order if the same key is clicked
                this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
            } else {
                // Set new sort key and default to ascending order
                this.sortKey = key;
                this.sortOrder = 'asc';
            }
        },
        convertSizeToBytes(sizeStr: string): number {
            const units = {
                'KB': 1024,
                'MB': 1024 * 1024,
                'GB': 1024 * 1024 * 1024
            };

            const match = sizeStr.match(/^([\d.]+)\s*([A-Z]+)$/);
            if (!match) return 0;

            const size = parseFloat(match[1]);
            const unit = match[2] as keyof typeof units;

            return size * (units[unit] || 1);
        },
        openProjectDetails(project: Project) {
            this.selectedProject = project;
            this.isModalOpen = true;
        },
        downloadProject() {
            // Simulate downloading project - can be implemented with actual functionality later
            alert(`Downloading ${this.selectedProject?.name}`);
        }
    },
    mixins: [lifecycleLoggerMixin],
};
</script>

<style scoped>
.project-details {
    font-family: monospace;
    color: #00E5FF;
}

.details-grid {
    display: grid;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
}

.detail-row {
    display: flex;
    border-bottom: 1px dashed rgba(0, 229, 255, 0.3);
    padding-bottom: 0.5rem;
}

.detail-label {
    width: 100px;
    font-weight: bold;
    color: rgba(0, 229, 255, 0.7);
    text-transform: uppercase;
}

.detail-value {
    flex: 1;
    text-overflow: ellipsis;
    overflow: hidden;
}

.section-divider {
    display: flex;
    align-items: center;
    margin: 1.5rem 0;
}

.divider-line {
    flex: 1;
    height: 1px;
    background-color: rgba(0, 229, 255, 0.4);
}

.divider-label {
    padding: 0 0.75rem;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 0.8rem;
    color: rgba(0, 229, 255, 0.9);
}

.description {
    font-family: monospace;
    line-height: 1.5;
    margin-bottom: 1.5rem;
    padding: 0.5rem;
    border: 1px solid rgba(0, 229, 255, 0.2);
    background-color: rgba(0, 229, 255, 0.05);
}

.tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.tech-tag {
    background-color: rgba(0, 229, 255, 0.1);
    border: 1px solid rgba(0, 229, 255, 0.4);
    color: #00E5FF;
    padding: 0.25rem 0.5rem;
    border-radius: 2px;
    font-size: 0.8rem;
}

.link {
    color: #00E5FF;
    text-decoration: underline;
    text-decoration-color: rgba(0, 229, 255, 0.4);
    text-underline-offset: 2px;
}

.link:hover {
    text-decoration-color: #00E5FF;
    background-color: rgba(0, 229, 255, 0.1);
}
</style>