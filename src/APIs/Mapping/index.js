import client from '../../sanityconfig'
export const getMapping = () => {
    return client.fetch(`
    *[_type == "mapping"]{
        _id,
        _updatedAt,
        code_product -> {
            _id,
            barcode{
                current
            },
            categoryProduct -> {
                _id,
                name
            },
            description,
            name,
            price,
            image{
                asset->{
                    _id,
                    url
                }
            },
            
        }
    }`,
    {}
  );
}