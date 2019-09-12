export function prefix(url: string): string
{
    const {NODE_ENV} = process.env;
    if (NODE_ENV !== 'production')
    {
        return `/server${url}`;
    }
    else
    {
        return `https://todo.soulike.tech/server${url}`;
    }
}