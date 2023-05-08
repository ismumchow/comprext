import { FC } from 'react'

import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export const metadata: Metadata = {
    title: 'Comprext Dashboard',
    description: 'Free and open source text similarity api',
}

const page = async () => {
    const user = await getServerSession(authOptions)
  return <div>page</div>
}

export default page