// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import TopNavigation from '@cloudscape-design/components/top-navigation';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import Grid from '@cloudscape-design/components/grid';
import Box from '@cloudscape-design/components/box';
import Cards from '@cloudscape-design/components/cards';
import Button from '@cloudscape-design/components/button';
import FormField from '@cloudscape-design/components/form-field';
import Input from '@cloudscape-design/components/input';
import Select from '@cloudscape-design/components/select';
import RadioGroup from '@cloudscape-design/components/radio-group';
import Checkbox from '@cloudscape-design/components/checkbox';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Pagination from '@cloudscape-design/components/pagination';
import SegmentedControl from '@cloudscape-design/components/segmented-control';
import Link from '@cloudscape-design/components/link';
import Container from '@cloudscape-design/components/container';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Badge from '@cloudscape-design/components/badge';
import Icon from '@cloudscape-design/components/icon';

import '../../styles/base.scss';

// Mock job data
const mockJobs = [
  {
    id: '1',
    title: 'Senior Product Designer',
    company: 'Acme',
    location: 'Atlanta, GA / Remote / San Francisco, CA',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    status: 'active',
    contractType: 'full-time',
    level: 'senior',
  },
  {
    id: '2',
    title: 'Tech Lead',
    company: 'Acme',
    location: 'London, England / Remote',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    status: 'active',
    contractType: 'full-time',
    level: 'senior',
  },
  {
    id: '3',
    title: 'Product Marketing Designer / Developer',
    company: 'Acme',
    location: 'London, England / Remote',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    status: 'active',
    contractType: 'contract',
    level: 'mid',
  },
  {
    id: '4',
    title: 'Software Engineer',
    company: 'TechCorp',
    location: 'New York, NY / Remote',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    status: 'draft',
    contractType: 'full-time',
    level: 'mid',
  },
  {
    id: '5',
    title: 'UI/UX Designer',
    company: 'DesignCo',
    location: 'Seattle, WA / Remote',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    status: 'active',
    contractType: 'part-time',
    level: 'junior',
  },
];

const sortOptions = [
  { label: 'Latest', value: 'latest' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'Title A-Z', value: 'title-asc' },
  { label: 'Title Z-A', value: 'title-desc' },
];

const statusOptions = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'draft', label: 'Draft' },
  { value: 'archived', label: 'Archived' },
];

const contractTypeOptions = [
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'contract', label: 'Contract' },
  { value: 'freelance', label: 'Freelance' },
];

const levelOptions = [
  { value: 'junior', label: 'Junior' },
  { value: 'mid', label: 'Mid' },
  { value: 'senior', label: 'Senior' },
  { value: 'lead', label: 'Lead' },
  { value: 'principal', label: 'Principal' },
];

export function App() {
  const [searchTitle, setSearchTitle] = useState('Senior');
  const [location, setLocation] = useState('19904');
  const [viewMode, setViewMode] = useState('card');
  const [sortBy, setSortBy] = useState({ label: 'Latest', value: 'latest' });
  const [statusFilter, setStatusFilter] = useState('all');
  const [contractTypeFilters, setContractTypeFilters] = useState<string[]>([]);
  const [levelFilters, setLevelFilters] = useState<string[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  const itemsPerPage = 6;

  // Filter and sort jobs
  const filteredJobs = mockJobs.filter(job => {
    const matchesTitle = job.title.toLowerCase().includes(searchTitle.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    const matchesContractType = contractTypeFilters.length === 0 || contractTypeFilters.includes(job.contractType);
    const matchesLevel = levelFilters.length === 0 || levelFilters.includes(job.level);

    return matchesTitle && matchesStatus && matchesContractType && matchesLevel;
  });

  // Pagination
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const startIndex = (currentPageIndex - 1) * itemsPerPage;
  const paginatedJobs = filteredJobs.slice(startIndex, startIndex + itemsPerPage);

  const handleContractTypeChange = (value: string, checked: boolean) => {
    if (checked) {
      setContractTypeFilters([...contractTypeFilters, value]);
    } else {
      setContractTypeFilters(contractTypeFilters.filter(item => item !== value));
    }
  };

  const handleLevelChange = (value: string, checked: boolean) => {
    if (checked) {
      setLevelFilters([...levelFilters, value]);
    } else {
      setLevelFilters(levelFilters.filter(item => item !== value));
    }
  };

  const navigationComponent = (
    <TopNavigation
      identity={{
        href: '/',
        title: 'Logoipsum',
        logo: {
          src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/acb17dc4bcc88669a99edc8894b29fca20aeec18?width=240',
          alt: 'Logoipsum',
        },
      }}
      utilities={[
        {
          type: 'button',
          iconName: 'notification',
          ariaLabel: 'Notifications',
          onClick: () => {},
        },
      ]}
    />
  );

  return (
    <div style={{ height: '100vh' }}>
      {navigationComponent}
      <AppLayout
        content={
          <ContentLayout
            header={
              <SpaceBetween direction="vertical" size="l">
                <Header
                  variant="h1"
                  actions={
                    <SpaceBetween direction="horizontal" size="m">
                      <SegmentedControl
                        selectedId={viewMode}
                        onChange={({ detail }) => setViewMode(detail.selectedId)}
                        options={[
                          { id: 'card', iconName: 'view-full', text: 'Card' },
                          { id: 'list', iconName: 'list-view', text: 'List' },
                        ]}
                      />
                      <Select
                        selectedOption={sortBy}
                        onChange={({ detail }) => setSortBy(detail.selectedOption)}
                        options={sortOptions}
                        placeholder="Sort by"
                      />
                    </SpaceBetween>
                  }
                >
                  Latest Jobs
                </Header>
              </SpaceBetween>
            }
          >
            <Grid
              gridDefinition={[
                { colspan: { default: 12, xxs: 12, xs: 12, s: 4, m: 4, l: 3, xl: 3 } },
                { colspan: { default: 12, xxs: 12, xs: 12, s: 8, m: 8, l: 9, xl: 9 } },
              ]}
            >
              {/* Filters Sidebar */}
              <Container>
                <SpaceBetween direction="vertical" size="l">
                  <FormField label="Search by title">
                    <Input
                      value={searchTitle}
                      onChange={({ detail }) => setSearchTitle(detail.value)}
                      placeholder="Enter job title"
                      type="search"
                    />
                  </FormField>

                  <FormField label="Location">
                    <Input
                      value={location}
                      onChange={({ detail }) => setLocation(detail.value)}
                      placeholder="Enter location"
                    />
                  </FormField>

                  <Button variant="primary" fullWidth>
                    Search Jobs
                  </Button>

                  <FormField label="Status">
                    <RadioGroup
                      value={statusFilter}
                      onChange={({ detail }) => setStatusFilter(detail.value)}
                      items={statusOptions}
                    />
                  </FormField>

                  <FormField label="Contract type">
                    <SpaceBetween direction="vertical" size="xs">
                      {contractTypeOptions.map(option => (
                        <Checkbox
                          key={option.value}
                          checked={contractTypeFilters.includes(option.value)}
                          onChange={({ detail }) => handleContractTypeChange(option.value, detail.checked)}
                        >
                          {option.label}
                        </Checkbox>
                      ))}
                    </SpaceBetween>
                  </FormField>

                  <FormField label="Level">
                    <SpaceBetween direction="vertical" size="xs">
                      {levelOptions.map(option => (
                        <Checkbox
                          key={option.value}
                          checked={levelFilters.includes(option.value)}
                          onChange={({ detail }) => handleLevelChange(option.value, detail.checked)}
                        >
                          {option.label}
                        </Checkbox>
                      ))}
                    </SpaceBetween>
                  </FormField>

                  <Link href="#" variant="primary">
                    Clear all filters
                  </Link>
                </SpaceBetween>
              </Container>

              {/* Job Listings */}
              <SpaceBetween direction="vertical" size="l">
                {viewMode === 'card' ? (
                  <Cards
                    cardDefinition={{
                      header: item => (
                        <SpaceBetween direction="horizontal" size="m">
                          <Box>
                            <Icon name="user-profile" size="big" />
                          </Box>
                          <SpaceBetween direction="vertical" size="xs">
                            <Box fontWeight="bold" fontSize="body-m">
                              {item.title}
                            </Box>
                            <Box fontSize="body-s" color="text-body-secondary">
                              {item.company} • {item.location}
                            </Box>
                          </SpaceBetween>
                        </SpaceBetween>
                      ),
                      sections: [
                        {
                          content: item => <Box color="text-body-secondary">{item.description}</Box>,
                        },
                        {
                          content: item => (
                            <SpaceBetween direction="horizontal" size="xs">
                              <Button variant="link">Apply Now</Button>
                              <Badge color={item.status === 'active' ? 'green' : 'grey'}>
                                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                              </Badge>
                            </SpaceBetween>
                          ),
                        },
                      ],
                    }}
                    cardsPerRow={[{ cards: 1 }, { minWidth: 500, cards: 2 }]}
                    items={paginatedJobs}
                    empty={
                      <Box textAlign="center" color="inherit">
                        <Box variant="strong" textAlign="center" color="inherit">
                          No jobs found
                        </Box>
                        <Box variant="p" padding={{ bottom: 's' }} color="inherit">
                          Try adjusting your search criteria.
                        </Box>
                      </Box>
                    }
                  />
                ) : (
                  <SpaceBetween direction="vertical" size="m">
                    {paginatedJobs.map(job => (
                      <Container key={job.id}>
                        <ColumnLayout columns={4} variant="text-grid">
                          <SpaceBetween direction="vertical" size="xs">
                            <Box fontWeight="bold">{job.title}</Box>
                            <Box fontSize="body-s" color="text-body-secondary">
                              {job.company}
                            </Box>
                          </SpaceBetween>
                          <Box color="text-body-secondary">{job.location}</Box>
                          <Badge color={job.status === 'active' ? 'green' : 'grey'}>
                            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                          </Badge>
                          <Button variant="link">Apply Now</Button>
                        </ColumnLayout>
                      </Container>
                    ))}
                  </SpaceBetween>
                )}

                {totalPages > 1 && (
                  <Pagination
                    currentPageIndex={currentPageIndex}
                    pagesCount={totalPages}
                    onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                  />
                )}
              </SpaceBetween>
            </Grid>
          </ContentLayout>
        }
        navigationHide={true}
        toolsHide={true}
      />
    </div>
  );
}
