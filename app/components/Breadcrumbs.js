'use client'
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

// Utility function to convert text to Title Case
const toTitleCase = (text) => {
  return text.replace(/\b(\w)/g, s => s.toUpperCase()).replace(/-/g, ' ');
};

const NextBreadcrumb = ({ 
  homeElement = 'Home', 
  separator = '>', 
  containerClasses = "flex items-center space-x-2 text-sm text-gray-600", 
  listClasses = "", 
  activeClasses = "text-gray-900 font-semibold", 
  capitalizeLinks = true 
}) => {
  const paths = usePathname();
  const pathNames = paths.split('/').filter(path => path);

  // Conditionally render the home element only if it's the only element
  const showHomeElement = pathNames.length === 0;

  return (
    <nav aria-label="breadcrumbs" className="p-4">
      <ul className={containerClasses}>
        {showHomeElement && (
          <li className={listClasses}>
            <Link href="/" className="hover:text-blue-600">{homeElement}</Link>
          </li>
        )}
        {pathNames.map((link, index) => {
          const isLast = index === pathNames.length - 1;
          const href = `/${pathNames.slice(0, index + 1).join('/')}`;
          const itemClasses = isLast ? `${listClasses} ${activeClasses}` : listClasses;
          const itemLink = capitalizeLinks ? toTitleCase(link) : link;
          
          return (
            <React.Fragment key={link}>
              {index > 0 && <li className="text-gray-400 mx-2">{separator}</li>}
              <li className={itemClasses}>
                <Link href={href} className={`hover:text-blue-600 ${isLast ? '' : 'hover:underline'}`}>
                  {itemLink}
                </Link>
              </li>
            </React.Fragment>
          );
        })}
      </ul>
    </nav>
  );
};

export default NextBreadcrumb;
