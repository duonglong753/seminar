import client from '../../sanityconfig'
export  const getProducts = () => {
    return client.fetch(`
            *[_type=='product'] {
                _id,
                barcode,
                categoryProduct->{
                    _id,
                    name
                },
                "image": image.asset -> url,
                name,
                price,
                quantity
            }`,
            {}
    );

}