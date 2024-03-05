import React, { useState, useEffect } from 'react'
import { Box, HStack, IconButton, Button } from "native-base"
import { Icon } from '../../ui'

const Pagination = ({ onChange, current = 1, pageSize, total, ...rest }) => {
    
    const LEFT_PAGE = 'LEFT';
    const RIGHT_PAGE = 'RIGHT';    
    const [pages, setPages] = useState(0)
    const pageNeighbours = 1;
    const handleChange = (index) => {
        // setCurrent(index)
        onChange(index, pageSize)
    }

    useEffect(() => {
        setPages(Math.ceil(total / pageSize));
        // setCurrent(1)
    }, [total, pageSize])

    const range = (from, to, step = 1) => {
        let i = from;
        const range_nums = [];

        while (i <= to) {
            range_nums.push(i);
            i += step;
        }

        return range_nums;
    }

    const handleMoveLeft = (e) => {
        e.preventDefault();
        let jump = current - (pageNeighbours * 2) - 1;
        handleChange(jump < 1 ? 1 : jump);
    }

    const handleMoveRight = (e) => {
        e.preventDefault();
        handleChange(current + (pageNeighbours * 2) + 1);
    }

    const getPageNumbers = () => {
        const totalPages = pages;
        const currentPage = current;
        const totalNumbers = (pageNeighbours * 2) + 3;
        const totalBlocks = totalNumbers + 2;
        let all_pages = [];
        if (totalPages > totalBlocks) {
            const startPage = Math.max(2, currentPage - pageNeighbours);
            const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
            all_pages = range(startPage, endPage);
            const hasLeftSpill = startPage > 2;
            const hasRightSpill = (totalPages - endPage) > 1;
            const spillOffset = totalNumbers - (all_pages.length + 1);
            switch (true) {
                // handle: (1) < {5 6} [7] {8 9} (10)
                case (hasLeftSpill && !hasRightSpill): {
                    const extraPages = range(startPage - spillOffset, startPage - 1);
                    all_pages = [LEFT_PAGE, ...extraPages, ...all_pages];
                    break;
                }

                // handle: (1) {2 3} [4] {5 6} > (10)
                case (!hasLeftSpill && hasRightSpill): {
                    const extraPages = range(endPage + 1, endPage + spillOffset);
                    all_pages = [...all_pages, ...extraPages, RIGHT_PAGE];
                    break;
                }

                // handle: (1) < {4 5} [6] {7 8} > (10)
                case (hasLeftSpill && hasRightSpill):
                default: {
                    all_pages = [LEFT_PAGE, ...all_pages, RIGHT_PAGE];
                    break;
                }
            }
            all_pages = [1, ...all_pages, totalPages];
        } else {
            all_pages = range(1, totalPages);
        }


        let elements = []
        all_pages.map((page, index) => {
            if (page === LEFT_PAGE) {
                return elements.push(
                    <IconButton size="xs" boxSize="28px" key={index} onPress={handleMoveLeft} rounded="full" variant="ghost" colorScheme="gray" icon={<Icon color="currentcolor" size={4}  name="ellipsis-horizontal" />} />
                )
            }
            if (page === RIGHT_PAGE) {
                return elements.push(
                    <IconButton size="xs" boxSize="28px" key={index} onPress={handleMoveRight} rounded="full" variant="ghost" colorScheme="gray" icon={<Icon color="currentcolor" size={4}  name="ellipsis-horizontal" /> } />
                )
            }
            return elements.push(
                <Button key={index} boxSize="28px" p={0} rounded="full" onPress={() => handleChange(page)} colorScheme={current === page ? 'secondary' : 'gray'} size="sm" d="block" variant={current === page ? "solid" : "ghost"}>{page}</Button>
            )

        })
        return elements;
    }


    return (
        <Box>
            {pages > 1 &&
                <HStack space={2}>
                    {getPageNumbers()}
                </HStack>
            }
        </Box>
    )
}

export { Pagination }