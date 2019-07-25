module.exports = {
    categorywithchildren: `
    WITH RECURSIVE  subcategories (id) as (
        SELECT id FROM  categories WHERE id = ?
        UNION ALL
        SELECT c.id FROM subbcategories, categories c
            WHERE "parentid" = subcategories.id
    )
    `

}