export default function Price(price: number) {
    if (!price)
        return "";

    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}