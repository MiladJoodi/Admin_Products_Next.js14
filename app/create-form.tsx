"use client"

import { useFormState, useFormStatus } from 'react-dom'
import { createProduct } from '@/lib/actions'
import { useEffect, useRef } from 'react'
import toast from 'react-hot-toast'

export default function CreateForm() {
    const [state, formAction] = useFormState(createProduct, {
        message: '',
    })
    const { pending } = useFormStatus()
    const ref = useRef<HTMLFormElement>(null)
    useEffect(() => {
        if (state.message.indexOf('Created product') === 0) {
            document.getElementById('my_modal_3')!.close()
            ref.current?.reset()
            toast(state.message)
        } else if (state.message) {
            toast(state.message)
        }
    }, [state.message])

    return (
        <div>
            <button className='btn btn-primary' onClick={() => document.getElementById('my_modal_3')!.showModal()}
            >
                Create Product
            </button>
            <dialog id='my_modal_3' className='modal'>
                <div className='modal-box'>
                    <h2 className='text-2xl font-bold pm-4'>Create Product</h2>
                    <form ref={ref} action={formAction}>
                        {/* INPUT NAME */}
                        <div className='form-control w-full max-w-xs py-4'>
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id='name'
                                name='name'
                                className='input input-bordered w-full max-w-xs'
                                required
                            />
                        </div>
                        {/* INPUT IMAGE */}
                        <div className='form-control w-full max-w-xs py-4'>
                            <label htmlFor="image">Image</label>
                            <input
                                type="text"
                                id='image'
                                name='image'
                                className='input input-bordered w-full max-w-xs'
                                required
                                defaultValue="/images/shirt1.jpg"
                            />
                        </div>
                        {/* INPUT PRICE */}
                        <div className='form-control w-full max-w-xs py-4'>
                            <label htmlFor="price">Price</label>
                            <input
                                type="number"
                                id='price'
                                name='price'
                                className='input input-bordered w-full max-w-xs'
                                required
                                defaultValue="1"
                            />
                        </div>
                        {/* BUTTON create and back */}
                        <button className='btn btn-primary mr-3' type='submit' disabled={pending}>Create</button>
                        <button className='btn btn-ghost' type='button' onClick={()=> document.getElementById('my_modal_3')?.close()}>Back</button>
                    </form>
                </div>
            </dialog>
        </div>
    )
}
