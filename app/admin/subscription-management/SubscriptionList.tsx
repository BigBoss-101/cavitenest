// File: app/admin/subscription-management/SubscriptionList.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SubscriptionActions from './SubscriptionActions';

// Define the type for the subscription items
interface Subscription {
  id: string;
  plan: string;
  period: string;
  endDate: string;
}

const SubscriptionList = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      const response = await axios.get('/api/admin/subscriptions');
      setSubscriptions(response.data);
    };

    fetchSubscriptions();
  }, []);

  return (
    <div>
      <h1>Subscriptions</h1>
      <ul>
        {subscriptions.map((sub) => (
          <li key={sub.id}>
            <p>Plan: {sub.plan}</p>
            <p>Period: {sub.period}</p>
            <p>End Date: {new Date(sub.endDate).toLocaleDateString()}</p>
            <SubscriptionActions subscriptionId={sub.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubscriptionList;
