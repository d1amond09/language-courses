import { Button, Input, Select, Flex } from '@chakra-ui/react';
import React from 'react';
import { defaultFilters } from './data';

export default function FiltersForUsers({ filter, setFilter, onSearch }) {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilter((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className='flex flex-col gap-5'>
            <Flex gap="5">
                <Input 
                    type="text" 
                    name="searchTerm"
                    placeholder="Поиск по имени пользователя" 
                    value={filter.searchTerm} 
                    onChange={handleInputChange} 
                />
            </Flex>

            <Select 
                name="orderBy" 
                value={filter.orderBy} 
                onChange={handleInputChange}
            >
                <option value="username">Имя пользователя</option>
            </Select>

            <Select 
                name="sortOrder" 
                value={filter.sortOrder} 
                onChange={handleInputChange}
            >
                <option value="asc">По возрастанию</option>
                <option value="desc">По убыванию</option>
            </Select>

            <Button onClick={onSearch}>
                Поиск
            </Button>

            <Button onClick={() => {
                setFilter(defaultFilters);
                onSearch();
            }}>
                Сбросить фильтры
            </Button>
        </div>
    );
}