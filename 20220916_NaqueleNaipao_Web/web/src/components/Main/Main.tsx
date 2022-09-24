import React from 'react';

import SectionHome from '../SectionHome/SectionHome';
import SectionAbout from '../SectionAbout/SectionAbout';
import SectionPartners from '../SectionPartners/SectionPartners';

export default function Main() {
  return (
    <main className="main">
        <SectionHome />
        <SectionAbout />
        <SectionPartners />
    </main>
  )
}