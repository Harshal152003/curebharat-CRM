'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import CustomerForm from '@/components/customers/CustomerForm';
import { ICustomer } from '@/types';

export default function CustomerDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const isEdit = searchParams.get('edit') === 'true';
  const [customer, setCustomer] = useState<ICustomer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await fetch(`/api/customers/${params.id}`);
        const data = await res.json();
        if (data.success) setCustomer(data.data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomer();
  }, [params.id]);

  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: 'center', color: 'var(--foreground-dim)' }}>
        Loading customer...
      </div>
    );
  }

  if (!customer) {
    return (
      <div style={{ padding: 40, textAlign: 'center', color: 'var(--error)' }}>
        Customer not found
      </div>
    );
  }

  return <CustomerForm customer={customer} isEdit={isEdit || true} />;
}
