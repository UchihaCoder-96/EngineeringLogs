
export function formatEnums(status: string) {
    return status.replace(/([a-z])([A-Z])/g, "$1 $2");
}

export function stripEmptyFields(body: any) {
    return Object.fromEntries(
        Object.entries(body).filter(([_, value]) => value !== "")
    );
}
