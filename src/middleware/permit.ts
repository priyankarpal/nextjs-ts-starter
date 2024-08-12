import { Permit } from "permitio";

const permit = new Permit({
    token: 'permit_key_VdhGBhUKdaAlEz2nbTWyu9x5xdqLEU2lFYkToFHm7wHZUR461nivubbxW8KmqAyixJHWPjOGQBulgOnjrgD587',
    pdp: "http://localhost:7766",

});

export const checkPermission = async (vendorEmail: string, resourceId: string, action: string): Promise<boolean> => {
    try {
        const resource = `Folder:${resourceId}`;
        const result = await permit.check(vendorEmail, action, resource);
        return result;
    } catch (error) {
        console.error('Error checking permission:', error);
        return false;
    }
};
