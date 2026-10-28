import { getServices } from '@/lib/data';
import { ServicesTable } from './services-table';

export default async function AdminServicesPage() {
  const services = await getServices();

  return <ServicesTable services={services} />;
}
