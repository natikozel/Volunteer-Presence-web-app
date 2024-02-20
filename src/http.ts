const getUserToken = async (method = 'GET', url: string, data?: any) => {
    let response: Response;
    switch (method) {
        case 'GET':
            response = await fetch(url)
            return response.json();
        case 'POST':
            response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({data}),
            })
            return response.json();
    }
}

export default getUserToken