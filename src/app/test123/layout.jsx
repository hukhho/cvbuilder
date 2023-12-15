import React from 'react';

export default function DashboardLayout({
  children, // will be a page or nested layout
}) {
  return (
    <section>
      <nav>cc</nav>
      {children}
    </section>
  );
}
