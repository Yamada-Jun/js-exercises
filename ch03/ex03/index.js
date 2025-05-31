export function equal(a, b)
{
    const error = 1e-10;
    return (Math.abs(a - b) < error);
}