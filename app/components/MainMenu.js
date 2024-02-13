//components/MainMenu.js

import React from 'react';
import { BiHomeCircle, BiTask, BiCheckShield, BiBookContent, BiBriefcaseAlt2, BiUserCircle, BiHelpCircle } from 'react-icons/bi';

const MainMenu = () => {
  return (
    <section className="w-full bg-secondary">
      <div className="rounded-lg shadow-lg p-4 mx-auto max-w-screen-xl">
        <ul className="menu menu-horizontal p-0 bg-neutral rounded-xl border border-gradient-to-r from-primary to-accent">
          <li className="tooltip tooltip-bottom" data-tip="Home">
            <a href="/" className="rounded-l-lg">
              <BiHomeCircle className="w-6 h-6" />
            </a>
          </li>
          <li className="tooltip tooltip-bottom" data-tip="Tasks">
            <a href="/tasks">
              <BiTask className="w-6 h-6" />
            </a>
          </li>
          <li className="tooltip tooltip-bottom" data-tip="Verifications">
            <a href="/verifications">
              <BiCheckShield className="w-6 h-6" />
            </a>
          </li>
          <li className="tooltip tooltip-bottom" data-tip="Issuance">
            <a href="/issuance">
              <BiBookContent className="w-6 h-6" />
            </a>
          </li>
          <li className="tooltip tooltip-bottom" data-tip="Jobs">
            <a href="/jobs">
              <BiBriefcaseAlt2 className="w-6 h-6" />
            </a>
          </li>
          <li className="tooltip tooltip-bottom" data-tip="Admin">
            <a href="/admin">
              <BiUserCircle className="w-6 h-6" />
            </a>
          </li>
          <li className="tooltip tooltip-bottom" data-tip="Help">
            <a href="/help" className="rounded-r-lg">
              <BiHelpCircle className="w-6 h-6" />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default MainMenu;
