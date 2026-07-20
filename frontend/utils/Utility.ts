export function formatEnums(status: string) {
    return status.replace(/([a-z])([A-Z])/g, "$1 $2");
}