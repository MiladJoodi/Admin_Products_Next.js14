"use server"
import { revalidatePath } from 'next/cache'
import ProductModel from './product-model'
import dbConnect from './db-connect'
import { z } from 'zod'
import { parse } from 'path'

export async function createProduct(prevState: any, formData: FormData) {
    const schema = z.object({
        name: z.string().min(3),
        image: z.string().min(1),
        price: z.number().min(1),
        rating: z.number().min(1).max(5)
    })
    const parse = schema.safeParse({
        name: formData.get("name"),
        image: formData.get("image"),
        price: Number(formData.get("price")),
        rating: Math.ceil(Math.random() * 5),
    })
    if (!parse.success){
        console.log(parse.error)
        return {message: 'Form data is not valid'}
    }
    const data = parse.data
    try{
        await dbConnect()
        const product = new ProductModel(data)
        await product.save()
        revalidatePath('/')
        return {message: `Created product ${data.name}`}
    }catch(e){
        return {message: 'Faild to create product'}
    }

}