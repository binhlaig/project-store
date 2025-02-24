"use client"

import Collections from '@/components/custom/Collections';
import ProductList from '@/components/custom/ProductList';
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation';


const Storepage = () => {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
        redirect("/login")
    },
  });

  return (
    <div>
      <Collections/>
      <ProductList/>
    </div>
  )
}

export default Storepage
