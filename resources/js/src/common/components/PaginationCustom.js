import React, { useState } from 'react'
import { Pagination } from '@shopify/polaris'

const PaginationCustom = (props) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage] = useState(props.perPage ? props.perPage : 1)
    const [totalRecord] = useState(props.totalRecord)

    const totalPages = () => {
        return Math.ceil(totalRecord / perPage);
    }

    const onPrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
            props.onChangePage(currentPage - 1)
        }
    }

    const onNext = () => {
        if (currentPage < totalPages()) {
            setCurrentPage(currentPage + 1)
            props.onChangePage(currentPage + 1)
        }
    }

    const hasPrevious = () => {
        return currentPage > 1
    }

    const hasNext = () => {
        return currentPage < totalPages()
    }

    return (
        <Pagination
            label={currentPage}
            hasPrevious={hasPrevious()}
            onPrevious={() => onPrevious()}
            hasNext={hasNext()}
            onNext={() => onNext()}
        />
    )
}

export default PaginationCustom
