

export function markReport(isSus: boolean, id: string) {
    return fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    });
}