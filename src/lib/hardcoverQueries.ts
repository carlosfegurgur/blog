// Test queries: https://cloud.hasura.io/public/graphiql?endpoint=https://api.hardcover.app/v1/graphql
export const HARDCOVER_QUERY = `{
    me {
        currently_reading: user_books(
            where: {status_id: {_eq: 2}}  
        ) {
            book {
                title
                slug
                contributions {
                    author {
                        name
                    }
                }
                image {
                url
                }
            }
        }
        recently_read: user_books(
            where: {status_id: {_eq: 3}}
            order_by: {last_read_date: desc_nulls_last}
        ) {
            book {
                title
                slug
                contributions {
                    author {
                        name
                    }
                }
                image {
                    url
                }
            }
            review
            review_raw
            rating
            last_read_date
        }
    }
}`;
