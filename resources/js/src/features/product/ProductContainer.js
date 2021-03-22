import React, { useEffect, useState, useCallback } from 'react'
import { connect } from 'react-redux'
import { fetchProducts } from '../../redux'
import { TextStyle, IndexTable, Thumbnail, Card, Stack, Layout, Pagination, Spinner, Toast, useIndexResourceState } from '@shopify/polaris'
import { ImageMajor } from '@shopify/polaris-icons';
import PaginationCustom from '../../common/components/PaginationCustom'
import { chunk } from 'lodash'

function ProductContainer ({ productData, fetchProducts }) {
    useEffect(() => {
        if (!productData.products.length) {
            fetchProducts()
        }
    }, [fetchProducts])

    const resourceName = {
        singular: 'product',
        plural: 'products',
    };

    const {
        selectedResources,
        allResourcesSelected,
        handleSelectionChange
    } = useIndexResourceState(productData.products);

    const [currentPage, setCurrentPage] = useState(1)
    const [perPage] = useState(25)

    const chunkProducts = chunk(productData.products, perPage)

    const rowMarkup = () => {
        const dataTable = chunkProducts.length ? chunkProducts[currentPage - 1] : []
        return dataTable.map(
            ({ id, title, imageUrl, faqs }, index) => (
                <IndexTable.Row
                    id={id}
                    key={id}
                    selected={selectedResources.includes(id)}
                    position={index}
                >
                    <IndexTable.Cell>
                        <Card.Section>
                            <Thumbnail
                                source={imageUrl ? imageUrl : ImageMajor}
                                alt={title}
                            />
                        </Card.Section>
                    </IndexTable.Cell>
                    <IndexTable.Cell>
                        <TextStyle variation="strong">{title}</TextStyle>
                    </IndexTable.Cell>
                    <IndexTable.Cell>{faqs}</IndexTable.Cell>
                    <IndexTable.Cell>actions</IndexTable.Cell>
                </IndexTable.Row>
            ),
        );
    }

    const onChangePage = (page) => {
        setCurrentPage(page)
    }

    const [active, setActive] = useState(productData.error ? true : false);

    const toggleActive = useCallback(() => setActive((active) => !active), []);
    const toastMarkup = active ? (
        <Toast content={productData.error} onDismiss={toggleActive} />
    ) : null;

    return productData.loading ?
        (
            <Stack vertical={true} alignment="center"><Spinner accessibilityLabel="Loading Products" size="large" /></Stack>
        ) :
        productData.error ?
            (<Loading>{productData.error}</Loading>) :
            (
                <Layout>
                    <Layout.Section>
                        <IndexTable
                            resourceName={resourceName}
                            itemCount={productData.products.length}
                            selectedItemsCount={allResourcesSelected ? 'All' : selectedResources.length}
                            onSelectionChange={handleSelectionChange}
                            headings={[
                                { title: '' },
                                { title: 'Product' },
                                { title: 'Questions' },
                                { title: 'Action' },
                            ]}
                        >
                            {rowMarkup()}
                        </IndexTable>
                        {toastMarkup}
                        <Card.Section>
                            <Stack vertical={true} alignment="center">
                                <PaginationCustom
                                    perPage={perPage}
                                    totalRecord={productData.products.length}
                                    onChangePage={onChangePage}
                                />
                            </Stack>
                        </Card.Section>
                    </Layout.Section>
                </Layout >
            )
}

const mapStateToProps = state => {
    return {
        productData: state.product
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchProducts: () => dispatch(fetchProducts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductContainer)
