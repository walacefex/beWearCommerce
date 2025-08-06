import { desc } from 'drizzle-orm'
import Image from 'next/image'

import { Header } from '@/components/common/Header'
import ProductList from '@/components/common/ProductList'
import { db } from '@/db'
import { productTable } from '@/db/schema'

const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  })

  const newlyCreatedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: {
      variants: true,
    },
  })

  return (
    <>
      <Header />
      <div className="space-y-6">
        <div className="px-5">
          <Image
            src="/banner-01.png"
            alt="Leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>

        <ProductList products={products} title="Mais vendidos" />

        <div className="px-5">
          <Image
            src="/banner-02.png"
            alt="Leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>

        <ProductList products={newlyCreatedProducts} title="Novos produtos" />
      </div>
    </>
  )
}
export default Home
