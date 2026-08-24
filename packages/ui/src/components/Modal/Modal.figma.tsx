import React from 'react';
import { Modal } from './Modal';
import figma from '@figma/code-connect';

/**
 * Figma Code Connect Mapping for Modal Components
 * Connects Figma ComponentSet 'Modal / Dialog' in Foundation-v3
 */
figma.connect(
  Modal,
  'https://www.figma.com/design/1hgAgnMvqn2uCF8i45Do4x/Core-Primitives-v3?node-id=Modal-Node-ID-Placeholder',
  {
    props: {
      title: figma.string('Title'),
      description: figma.string('Description'),
      isOpen: figma.boolean('Is Open'),
      children: figma.boolean('Has Content') ? figma.children('Content') : undefined,
    },
    example: ({ title, description, isOpen, children }) => (
      <Modal 
        isOpen={isOpen} 
        onClose={() => {}} 
        title={title} 
        description={description}
      >
        {children}
      </Modal>
    ),
  }
);
