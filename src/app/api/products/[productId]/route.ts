import { checkPermission } from '@/middleware/permit';
import { NextResponse } from 'next/server';

const products = [
    { id: '1', name: 'Product A', vendorEmail: 'vendor1@example.com' },
    { id: '2', name: 'Product B', vendorEmail: 'vendor2@example.com' },
];

export async function PATCH(request: Request, { params }: { params: { productId: string; }; }) {
    const productId = params.productId;
    const vendorEmail = 'vendor1@example.com';
    const product = products.find((p) => p.id === productId);
    if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const hasPermission = await checkPermission(vendorEmail, productId, 'update');

    if (!hasPermission) {
        return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    return NextResponse.json({ message: 'Product updated successfully' }, { status: 200 });
}

