import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "./DataTable";
import type { DataTableProps, Column } from "./DataTable";

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email" },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

const sampleData: User[] = [
  { id: 1, name: "Sudhanshu", email: "sudhanshu@example.com", age: 20 },
  { id: 2, name: "Chiku", email: "chiku@example.com", age: 19 },
  { id: 3, name: "Radhika", email: "radhika@example.com", age: 18 },
];

const meta: Meta<typeof DataTable<User>> = {
  title: "Components/DataTable",
  component: DataTable<User>,
};

export default meta;
type Story = StoryObj<typeof DataTable<User>>;

export const Default: Story = {
  render: (args: DataTableProps<User>) => <DataTable<User> {...args} />,
  args: {
    data: sampleData,
    columns,
    selectable: true,
  },
};

export const Loading: Story = {
  render: () => <DataTable<User> data={[]} columns={columns} loading={true} />,
};

export const Empty: Story = {
  render: () => <DataTable<User> data={[]} columns={columns} />,
};
