export async function resolve(promise) {
    const resolved = {
        data: null,
        error: null
    }

    try{
        resolved.data = await promise;
    }catch(error) {
        resolved.error = error;
    }

    return resolved;
}