import React from 'react';
import SectionAbout from '../SectionAbout/SectionAbout';
import SectionHome from '../SectionHome/SectionHome';
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
