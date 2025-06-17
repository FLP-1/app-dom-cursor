/**
 * Arquivo: PageHead.tsx
 * Caminho: src/components/common/PageHead.tsx
 * Criado em: 2025-06-02
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import React from 'react';
import Head from 'next/head';

interface PageHeadProps {
  title: string;
  description?: string;
}

const PageHead: React.FC<PageHeadProps> = ({ title, description }) => (
  <Head>
    <title>{title}</title>
    {description && <meta name="description" content={description} />}
  </Head>
);

export default PageHead; 
