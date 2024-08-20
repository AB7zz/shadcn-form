import { Breadcrumbs } from '@/components/breadcrumbs';
import { CreateCompany } from '@/components/forms/form/create-company';
import PageContainer from '@/components/layout/page-container';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Form', link: '/dashboard/form' }
];
export default function page() {
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <CreateCompany categories={[]} initialData={null} />
      </div>
    </PageContainer>
  );
}
