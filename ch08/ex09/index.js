export function withResource(resource, res) {
    try {
        res(resource);
    } finally {
        resource.close();
    }
}

