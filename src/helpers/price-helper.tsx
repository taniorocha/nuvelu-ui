export default function Price(price: number) {
    if (price === null || price === undefined || Number.isNaN(price))
        price = 0;

    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}