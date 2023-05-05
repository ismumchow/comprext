import { FC } from 'react'
import type { Metadata } from 'next'
import LargeHeading from '@/ui/LargeHeading'
import Paragraph from '@/ui/Paragraph'
import DocumentationTabs from '@/components/ui/DocumentationTabs'

import 'simplebar-react/dist/simplebar.min.css'

export const metadata: Metadata = {
    title: 'Similarity API | Documentation',
    description: 'Free and opensource text similarity API',
}

const page: FC = () => {
  return <div className='container max-w-7xl mx-auto mt-12'>
    <div className='flex flex-col items-center justify-center'>
        <LargeHeading> Making a Request </LargeHeading>
        <Paragraph> api/v1/similarity </Paragraph>
        <DocumentationTabs />
    </div>
  </div>
}

export default page