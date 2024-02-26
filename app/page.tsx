import Image from 'next/image'
import { Toaster } from 'react-hot-toast'
import CreateForm from './create-form'
import dbConnect from '@/lib/db-connect'
import ProductModel, { Product } from '@/lib/product-model'
import Rating from './rating'
import DeleteForm from './delete-form'

export default async function Home() {
  await dbConnect()
  const products = (await ProductModel.find({}).sort({
    _id: -1,
  })) as Product[]
  return (
    <div className="mx-auto max-w-2xl lg:max-w-7xl">
      <div className="flex justify-between items-center">
        <h1 className="font-bold py-10 text-2xl">Admin Products</h1>
        <Toaster />
        <CreateForm />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={5}>No product found</td>
            </tr>
          ) : (
            products.map((product: Product) => (
              <tr key={product._id}>
                <td>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={80}
                    height={80}
                    className="rounded-lg"
                  />
                </td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>
                  <Rating value={product.rating} />
                </td>
                <td>
                  <DeleteForm
                    _id={product._id.toString()}
                    name={product.name}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}