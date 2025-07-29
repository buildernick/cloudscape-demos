import { useState } from 'react';
import { 
  Table, 
  Box, 
  SpaceBetween,
  CollectionPreferences,
  Pagination,
  TextFilter
} from '@cloudscape-design/components';

// Mock data for devices table
const generateDevices = () => {
  const devices = [];
  for (let i = 1; i <= 12; i++) {
    devices.push({
      id: `device-${i}`,
      name: `Cell Value`,
      status: `Cell Value`,
      type: `Cell Value`,
      ipAddress: `Cell Value`,
      macAddress: `Cell Value`,
      lastSeen: `Cell Value`,
      bandwidth: `Cell Value`
    });
  }
  return devices;
};

const columnDefinitions = [
  {
    id: 'selection',
    header: '',
    cell: () => null,
    width: 60,
    minWidth: 60,
    isRowHeader: false
  },
  {
    id: 'name',
    header: 'Column header',
    cell: (item: any) => item.name,
    sortingField: 'name',
    isRowHeader: true,
    width: 200
  },
  {
    id: 'status',
    header: 'Column header',
    cell: (item: any) => item.status,
    sortingField: 'status',
    width: 150
  },
  {
    id: 'type',
    header: 'Column header',
    cell: (item: any) => item.type,
    sortingField: 'type',
    width: 150
  },
  {
    id: 'ipAddress',
    header: 'Column header',
    cell: (item: any) => item.ipAddress,
    sortingField: 'ipAddress',
    width: 150
  },
  {
    id: 'macAddress',
    header: 'Column header',
    cell: (item: any) => item.macAddress,
    sortingField: 'macAddress',
    width: 180
  },
  {
    id: 'lastSeen',
    header: 'Column header',
    cell: (item: any) => item.lastSeen,
    sortingField: 'lastSeen',
    width: 150
  },
  {
    id: 'bandwidth',
    header: 'Column header',
    cell: (item: any) => item.bandwidth,
    sortingField: 'bandwidth',
    width: 150
  }
];

export function DevicesTable() {
  const [devices] = useState(generateDevices());
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [filteringText, setFilteringText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  
  const filteredDevices = devices.filter(device =>
    !filteringText || device.name.toLowerCase().includes(filteringText.toLowerCase())
  );

  return (
    <Table
      columnDefinitions={columnDefinitions}
      items={filteredDevices}
      selectionType="multi"
      selectedItems={selectedItems}
      onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
      ariaLabels={{
        selectionGroupLabel: 'Items selection',
        allItemsSelectionLabel: ({ selectedItems }) =>
          `${selectedItems.length} ${
            selectedItems.length === 1 ? 'item' : 'items'
          } selected`,
        itemSelectionLabel: ({ selectedItems }, item) => {
          const isItemSelected = selectedItems.filter(
            i => i.id === item.id
          ).length;
          return `${item.name} is ${
            isItemSelected ? '' : 'not '
          }selected`;
        }
      }}
      trackBy="id"
      empty={
        <Box textAlign="center" color="inherit">
          <SpaceBetween size="m">
            <b>No devices</b>
            <Box
              variant="p"
              color="inherit"
            >
              No devices to display.
            </Box>
          </SpaceBetween>
        </Box>
      }
      filter={
        <TextFilter
          filteringPlaceholder="Find devices"
          filteringText={filteringText}
          onChange={({ detail }) => setFilteringText(detail.filteringText)}
        />
      }
      pagination={
        <Pagination
          currentPageIndex={currentPageIndex}
          onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
          pagesCount={Math.ceil(filteredDevices.length / 10)}
          ariaLabels={{
            nextPageLabel: 'Next page',
            previousPageLabel: 'Previous page',
            pageLabel: pageNumber => `Page ${pageNumber} of all pages`
          }}
        />
      }
      preferences={
        <CollectionPreferences
          title="Preferences"
          confirmLabel="Confirm"
          cancelLabel="Cancel"
          preferences={{
            pageSize: 10,
            visibleContent: ['name', 'status', 'type', 'ipAddress', 'macAddress', 'lastSeen', 'bandwidth']
          }}
          pageSizePreference={{
            title: 'Select page size',
            options: [
              { value: 10, label: '10 resources' },
              { value: 20, label: '20 resources' },
              { value: 50, label: '50 resources' }
            ]
          }}
          visibleContentPreference={{
            title: 'Select visible content',
            options: [
              {
                label: 'Main device properties',
                options: columnDefinitions.filter(def => def.id !== 'selection').map(def => ({
                  id: def.id,
                  label: def.header,
                  editable: def.id !== 'name'
                }))
              }
            ]
          }}
          onConfirm={() => {}}
        />
      }
    />
  );
}
